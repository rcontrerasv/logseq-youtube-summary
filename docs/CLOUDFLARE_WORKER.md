# Cloudflare Worker - YouTube Transcript Proxy

Este documento describe el Worker de Cloudflare que usa el plugin para obtener transcripciones de YouTube.

## Por qué se necesita un Worker

Los plugins de Logseq se ejecutan en el contexto `lsp://logseq.io`, lo cual tiene restricciones CORS que impiden hacer fetch directo a YouTube. Además, YouTube requiere un **POT (Proof of Origin Token)** para el cliente web que complica el scraping tradicional.

**Solución:** Usar la **InnerTube API** de YouTube (su API interna) desde un Cloudflare Worker.

## Arquitectura

```
Plugin Logseq → Cloudflare Worker → YouTube InnerTube API
                                  → YouTube Timedtext API
```

## Código del Worker

```javascript
export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId');
    const mode = url.searchParams.get('mode') || 'proxy';

    if (mode === 'proxy') {
      const fullUrl = request.url;
      const urlParamIndex = fullUrl.indexOf('?url=');
      if (urlParamIndex === -1) {
        return new Response('Missing url parameter', { status: 400 });
      }
      const targetUrl = decodeURIComponent(fullUrl.substring(urlParamIndex + 5));
      try {
        const response = await fetch(targetUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const body = await response.text();
        return new Response(body, {
          headers: { ...corsHeaders, 'Content-Type': response.headers.get('Content-Type') || 'text/plain' }
        });
      } catch (error) {
        return new Response(`Proxy error: ${error.message}`, { status: 500 });
      }
    }

    if (mode === 'transcript' && videoId) {
      try {
        // 1. Get captions via InnerTube API
        const playerResponse = await fetch(
          'https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              videoId: videoId,
              context: {
                client: {
                  clientName: 'WEB',
                  clientVersion: '2.20240101.00.00'
                }
              }
            })
          }
        );

        const playerData = await playerResponse.json();
        const tracks = playerData.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        if (!tracks || tracks.length === 0) {
          return new Response(JSON.stringify({ error: 'No captions available' }), {
            status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Select best track (prefer en/es manual, then any manual, then first)
        let track = tracks.find(t => !t.kind && (t.languageCode === 'en' || t.languageCode === 'es'))
                 || tracks.find(t => !t.kind)
                 || tracks[0];

        // 2. Get transcript XML
        const xmlResponse = await fetch(track.baseUrl);
        const xml = await xmlResponse.text();

        if (!xml || xml.length === 0) {
          return new Response(JSON.stringify({ error: 'Empty transcript' }), {
            status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 3. Parse XML
        const textSegments = [];
        const regex = /<text[^>]*>([^<]*)<\/text>/g;
        let m;
        while ((m = regex.exec(xml)) !== null) {
          let text = m[1]
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/\n/g, ' ')
            .trim();
          if (text) textSegments.push(text);
        }

        return new Response(JSON.stringify({
          success: true,
          transcript: textSegments.join(' '),
          segments: textSegments.length,
          language: track.languageCode
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Use ?mode=transcript&videoId=VIDEO_ID', { status: 400 });
  }
};
```

## Endpoints

### Modo Transcript (principal)
```
GET /?mode=transcript&videoId=VIDEO_ID
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "transcript": "texto completo...",
  "segments": 61,
  "language": "en"
}
```

**Respuesta de error:**
```json
{
  "error": "No captions available"
}
```

### Modo Proxy (auxiliar)
```
GET /?url=https://example.com/...
```

Usado para obtener metadatos del video (oembed).

## Cómo funciona InnerTube API

1. **POST** a `/youtubei/v1/player` con el `videoId` y contexto de cliente
2. La respuesta incluye `captions.playerCaptionsTracklistRenderer.captionTracks`
3. Cada track tiene `baseUrl` con la URL del XML de subtítulos
4. **GET** a `baseUrl` devuelve el XML con los subtítulos
5. Parsear XML y extraer texto de cada `<text>` element

## Ventajas de InnerTube API

- No requiere POT (Proof of Origin Token)
- No requiere cookies
- Más estable que scraping de HTML
- Funciona desde Cloudflare Workers

## Despliegue

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Workers & Pages → Create Worker
3. Pega el código
4. Save and Deploy
5. Copia la URL del Worker

## Monitoreo

En el dashboard de Cloudflare puedes ver:
- Requests totales
- Errores
- Latencia

## Límites (Plan gratuito)

- 100,000 requests/día
- 10ms CPU time por request
- Suficiente para uso normal del plugin

## Troubleshooting

### "No captions available"
El video no tiene subtítulos habilitados.

### Error 500
Verificar logs en Cloudflare dashboard.

### API key expirada
El API key de InnerTube (`AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`) es público y estable, pero si deja de funcionar, se puede extraer uno nuevo del HTML de YouTube.
