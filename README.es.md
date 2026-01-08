<div align="center">
  <img src="icon.png" alt="YouTube Summary Logo" width="200"/>

  # YouTube Summary
  ### Plugin para Logseq

  Resúmenes inteligentes de videos de YouTube con IA

  [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/rodandresv)
</div>

---

## 📝 Descripción

Plugin para Logseq que resume videos de YouTube usando tu propia API key de LLM. Soporta 7 proveedores: OpenAI, Anthropic, DeepSeek, Google Gemini, xAI Grok, Alibaba Qwen y Moonshot. Extrae automáticamente la transcripción del video, detecta el idioma y genera un resumen estructurado que se inserta como bloques hijos en tu página de Logseq.

## ✨ Características

- 🌍 **Interfaz Multilingüe**: Auto-detecta el idioma desde la configuración de Logseq o configuración manual (Inglés/Español)
- 🎬 **Diálogo Interactivo**: Pide la URL automáticamente cuando ejecutas el comando
- ⚡ **Comando Slash Rápido**: Solo escribe `/youtube-summary` y listo
- 📝 **Extracción Automática**: Obtiene transcripciones de YouTube sin esfuerzo
- 🤖 **Soporte Multi-LLM**: 7 proveedores con 18 modelos - OpenAI, Anthropic, DeepSeek, Gemini, Grok, Qwen, Moonshot
- 📊 **Resúmenes Estructurados**: Organizados con tema principal, puntos clave y conclusión
- 🎯 **Jerarquía Inteligente**: Crea relaciones padre-hijo correctas entre bloques en Logseq
- 🔄 **Auto-Detección**: Proveedor y endpoint de API detectados automáticamente según el modelo seleccionado
- ⚙️ **Configuración Fácil**: Solo selecciona un modelo e ingresa tu API key
- 🎥 **Subtítulos Auto-generados**: Funciona con subtítulos auto-generados de YouTube

## 🎬 Demo

![YouTube Summary Demo](assets/demo.gif)

*Mira el plugin en acción: pega una URL de YouTube, ejecuta `/youtube-summary`, ¡y obtén un resumen estructurado generado por IA al instante!*

## 📦 Instalación

1. **Abre Logseq**
2. Ve a `...` (menú) → `Plugins` → `Marketplace`
3. Busca **"YouTube Summary"**
4. Haz clic en `Install`
5. ¡El plugin estará listo para usar inmediatamente!

## Configuración

### Obtener API Keys

Antes de usar el plugin, necesitas una API key del proveedor que elijas:

| Proveedor | Obtener API Key |
|-----------|-----------------|
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| **Anthropic** | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) |
| **Google Gemini** | [aistudio.google.com](https://aistudio.google.com) |
| **xAI Grok** | [console.x.ai](https://console.x.ai) |
| **Alibaba Qwen** | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com) |
| **Moonshot** | [platform.moonshot.cn](https://platform.moonshot.cn) |

### Configurar el Plugin

1. En Logseq, ve a `Settings` → `Plugins` → `YouTube Summary`
2. **Idioma**: Elige el idioma de la interfaz o "Auto" para detectar desde la configuración de Logseq
3. **Modelo**: Selecciona entre 18 modelos disponibles (el proveedor se auto-detecta):
   - **OpenAI**: `gpt-4o-mini`, `gpt-4o`, `o1-mini`
   - **Anthropic**: `claude-sonnet-4-20250514`, `claude-opus-4-20250514`
   - **DeepSeek**: `deepseek-chat`, `deepseek-reasoner`
   - **Gemini**: `gemini-2.5-flash`, `gemini-2.5-pro`
   - **Grok**: `grok-3`, `grok-4`
   - **Qwen**: `qwen-turbo`, `qwen-plus`, `qwen-max`
   - **Moonshot**: `moonshot-v1-8k`, `moonshot-v1-32k`
4. **API Key**: Pega tu API key del proveedor del modelo seleccionado

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
- ⚠️ **Requiere API key**: Necesitas una API key válida de uno de los proveedores soportados.
- ⚠️ **Costos de API**: El uso de las APIs de LLM puede generar costos según tu plan. Revisa los precios en la página oficial de cada proveedor.
- ⚠️ **Rate limits**: Las APIs tienen límites de uso. Si excedes el límite, deberás esperar antes de intentar de nuevo.

## Manejo de Errores

El plugin muestra mensajes claros para diferentes tipos de errores:

- **URL inválida**: Verifica que la URL sea de YouTube y esté en un formato válido
- **Sin transcripción**: El video no tiene subtítulos disponibles
- **API key no configurada**: Ve a Settings para configurar tu API key
- **API key inválida**: Verifica que hayas copiado correctamente tu API key
- **Rate limit excedido**: Espera unos minutos antes de intentar de nuevo
- **Modelo no encontrado**: Verifica que el nombre del modelo sea correcto

## 💬 Comentarios y Comunidad

¡Nos encantaría saber de ti! Aquí están las formas de conectarte:

### 🐛 Reportar Bugs
¿Encontraste un bug? [Crea un reporte de bug](https://github.com/rcontrerasv/logseq-youtube-summary/issues/new/choose) con pasos detallados para reproducirlo.

### 💡 Solicitar Funcionalidades
¿Tienes una idea? [Inicia una discusión](https://github.com/rcontrerasv/logseq-youtube-summary/discussions/new?category=ideas) o [envía una solicitud de funcionalidad](https://github.com/rcontrerasv/logseq-youtube-summary/issues/new/choose).

### ❓ Obtener Ayuda
- [Discusiones Q&A](https://github.com/rcontrerasv/logseq-youtube-summary/discussions/categories/q-a) - Haz preguntas
- [Discord de Logseq](https://discord.gg/KpN4eHY) - Únete a la comunidad

### 🎉 Muestra y Comparte
¡Comparte cómo estás usando el plugin en nuestra sección [Show and Tell](https://github.com/rcontrerasv/logseq-youtube-summary/discussions/categories/show-and-tell)!

### ⭐ ¿Te gusta?
Si encuentras útil este plugin, ¡dale una estrella en GitHub!

## Apoya el Proyecto

Si este plugin te resulta útil, considera apoyar su desarrollo:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/rodandresv)

## Licencia

MIT

## Agradecimientos

- Logseq por la excelente plataforma y API de plugins
- Los desarrolladores de las librerías utilizadas

---

**[🇬🇧 English Version](README.md)**
