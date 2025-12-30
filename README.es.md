<div align="center">
  <img src="icon.png" alt="YouTube Summary Logo" width="200"/>

  # YouTube Summary
  ### Plugin para Logseq

  Resúmenes inteligentes de videos de YouTube con IA
</div>

---

## 📝 Descripción

Plugin para Logseq que resume videos de YouTube usando tu propia API key de LLM (OpenAI o Anthropic). Extrae automáticamente la transcripción del video, detecta el idioma y genera un resumen estructurado que se inserta como bloques hijos en tu página de Logseq.

## ✨ Características

- 🌍 **Interfaz Multilingüe**: Auto-detecta el idioma desde la configuración de Logseq o configuración manual (Inglés/Español)
- 🎬 **Diálogo Interactivo**: Pide la URL automáticamente cuando ejecutas el comando
- ⚡ **Comando Slash Rápido**: Solo escribe `/youtube-summary` y listo
- 📝 **Extracción Automática**: Obtiene transcripciones de YouTube sin esfuerzo
- 🤖 **Soporte Multi-LLM**: Funciona con OpenAI (GPT-4o, GPT-4o-mini, GPT-4-turbo) y Anthropic (Claude Sonnet 4, Claude Opus 4)
- 📊 **Resúmenes Estructurados**: Organizados con tema principal, puntos clave y conclusión
- 🎯 **Jerarquía Inteligente**: Crea relaciones padre-hijo correctas entre bloques en Logseq
- 🔄 **Cambio Automático de Modelo**: El modelo se actualiza automáticamente al cambiar de proveedor
- ⚙️ **Configuración Fácil**: Interfaz de configuración integrada en Logseq
- 🎥 **Subtítulos Auto-generados**: Funciona con subtítulos auto-generados de YouTube

## Instalación

### Modo Desarrollo

1. **Clonar o descargar este repositorio**

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Compilar el plugin:**
   ```bash
   npm run build
   ```

   O para modo desarrollo con watch (recarga automática):
   ```bash
   npm run dev
   ```

   Esto generará los archivos necesarios en la carpeta `dist/`:
   - `dist/index.html` - Archivo HTML que carga el plugin
   - `dist/index.js` - Código JavaScript del plugin

4. **Cargar el plugin en Logseq:**
   - Abre Logseq
   - Ve a `Settings` → `Advanced` → Activa `Developer mode` (ON)
   - Ve a `...` (menú) → `Plugins` → `Load unpacked plugin`
   - Selecciona la carpeta del proyecto (`youtube-summary`)

## Configuración

### Obtener API Keys

Antes de usar el plugin, necesitas configurar una API key:

#### OpenAI
1. Ve a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Inicia sesión o crea una cuenta
3. Haz clic en "Create new secret key"
4. Copia la key (solo se muestra una vez)

#### Anthropic
1. Ve a [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Inicia sesión o crea una cuenta
3. Haz clic en "Create Key"
4. Copia la key

### Configurar el Plugin

1. En Logseq, ve a `Settings` → `Plugins` → `YouTube Summary`
2. **Idioma**: Elige el idioma de la interfaz o "Auto" para detectar desde la configuración de Logseq
3. **Proveedor de LLM**: Selecciona tu proveedor (OpenAI o Anthropic)
   - 💡 El modelo se actualizará automáticamente al cambiar de proveedor
4. **API Key**: Pega tu API key en el campo correspondiente
5. **Modelo** (Opcional): Cambia el modelo si deseas usar uno diferente:
   - **OpenAI**: `gpt-4o-mini` (rápido), `gpt-4o` (recomendado), `gpt-4-turbo`
   - **Anthropic**: `claude-sonnet-4-20250514` (recomendado), `claude-opus-4-20250514`

## 🚀 Uso

### Opción 1: Con Diálogo (Recomendado)

1. **Crea un bloque nuevo** en Logseq
2. **Escribe `/youtube-summary`** y presiona Enter
3. **Pega la URL** en el diálogo que aparece:
   ```
   https://www.youtube.com/watch?v=xxxxx
   ```
4. **Espera el resumen** - El plugin automáticamente:
   - Actualizará el bloque con la URL
   - Extraerá la transcripción
   - Generará el resumen con IA
   - Insertará bloques hijos con el resumen

### Opción 2: URL Preexistente

1. **Pega primero la URL** de YouTube en un bloque
2. **Escribe `/youtube-summary`** en el mismo bloque
3. **El resumen se genera** automáticamente

### Formato de Salida

El resumen se inserta con la siguiente estructura:

```
- https://youtube.com/watch?v=xxxxx (bloque padre)
  - **Video**: Título del video - Nombre del Canal
  - **Tema principal**: [descripción concisa]
  - **Puntos clave**:
    - Punto 1
    - Punto 2
    - Punto 3
  - **Conclusión**: [takeaway principal]
```

## Formatos de URL Soportados

El plugin soporta los siguientes formatos de URL de YouTube:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `youtube.com/watch?v=VIDEO_ID` (sin https)
- `youtu.be/VIDEO_ID` (sin https)

## Limitaciones

- ⚠️ **Solo videos con transcripción**: El plugin solo funciona con videos que tengan subtítulos disponibles (incluyendo auto-generados). Si un video no tiene transcripción, verás un mensaje de error.
- ⚠️ **Requiere API key**: Necesitas una API key válida de OpenAI o Anthropic para usar el plugin.
- ⚠️ **Costos de API**: El uso de las APIs de LLM puede generar costos según tu plan. Revisa los precios en las páginas oficiales de OpenAI y Anthropic.
- ⚠️ **Rate limits**: Las APIs tienen límites de uso. Si excedes el límite, deberás esperar antes de intentar de nuevo.

## Manejo de Errores

El plugin muestra mensajes claros para diferentes tipos de errores:

- **URL inválida**: Verifica que la URL sea de YouTube y esté en un formato válido
- **Sin transcripción**: El video no tiene subtítulos disponibles
- **API key no configurada**: Ve a Settings para configurar tu API key
- **API key inválida**: Verifica que hayas copiado correctamente tu API key
- **Rate limit excedido**: Espera unos minutos antes de intentar de nuevo
- **Modelo no encontrado**: Verifica que el nombre del modelo sea correcto

## Desarrollo

### Estructura del Proyecto

```
youtube-summary/
├── package.json
├── tsconfig.json
├── README.md
├── README.es.md
├── CHANGELOG.md
├── .gitignore
└── src/
    ├── index.ts          # Punto de entrada, registra comando
    ├── settings.ts       # Settings UI y gestión de configuración
    ├── youtube.ts        # Extracción de título, canal y transcripción
    ├── llm.ts           # Llamadas a OpenAI y Anthropic APIs
    ├── language.ts      # Detección de idioma
    ├── formatter.ts     # Formateo del resumen a estructura Logseq
    ├── i18n.ts          # Internacionalización (Inglés/Español)
    └── types.ts         # TypeScript types/interfaces
```

### Scripts Disponibles

- `npm run dev`: Compila en modo desarrollo con watch (recarga automática)
- `npm run build`: Compila para producción (minificado)

### Tecnologías Utilizadas

- **TypeScript**: Lenguaje de programación
- **@logseq/libs**: API oficial de Logseq para plugins
- **@danielxceron/youtube-transcript**: Fork mejorado con sistema de fallback para extraer transcripciones de YouTube (incluyendo subtítulos auto-generados)
- **franc-min**: Detección de idioma
- **openai**: SDK oficial de OpenAI
- **@anthropic-ai/sdk**: SDK oficial de Anthropic
- **esbuild**: Bundler rápido para compilación

> **Nota**: Usamos el fork `@danielxceron/youtube-transcript` en lugar de la librería original porque tiene un sistema de fallback que funciona con las últimas actualizaciones de YouTube (2025) y soporta subtítulos auto-generados de manera más confiable.

## Contribuir

Las contribuciones son bienvenidas. Si encuentras un bug o tienes una sugerencia, por favor abre un issue en el repositorio.

## Licencia

MIT

## Agradecimientos

- Logseq por la excelente plataforma y API de plugins
- Los desarrolladores de las librerías utilizadas

---

**[🇬🇧 English Version](README.md)**
