<div align="center">
  <img src="icon.png" alt="YouTube Summary Logo" width="120"/>

  # Guía de Verificación y Prueba
  ### YouTube Summary Plugin para Logseq
</div>

---

## Paso 1: Instalar Dependencias

Ejecuta en tu terminal:

```bash
cd /Users/rodandresv/Documents/youtube-summary
npm install
```

Si hay problemas de permisos, intenta:
```bash
sudo npm install
```

O verifica los permisos de npm:
```bash
npm config get prefix
```

## Paso 2: Compilar el Plugin

Una vez instaladas las dependencias:

```bash
npm run build
```

Esto debería crear:
- `dist/index.js` - Código JavaScript compilado
- `dist/index.html` - Archivo HTML que carga el plugin

## Paso 3: Verificar la Compilación

Verifica que los archivos se crearon:

```bash
ls -la dist/
```

Deberías ver:
- `index.html`
- `index.js`

## Paso 4: Cargar en Logseq

1. Abre Logseq
2. Ve a **Settings** → **Advanced** → Activa **Developer mode**
3. Ve a **...** (menú) → **Plugins** → **Load unpacked plugin**
4. Selecciona la carpeta: `/Users/rodandresv/Documents/youtube-summary`

## Paso 5: Configurar el Plugin

1. En Logseq: **Settings** → **Plugins** → **YouTube Summary**
2. Selecciona **Proveedor de LLM**: `openai` o `anthropic`
   - 💡 **Nota**: El modelo se actualizará automáticamente al cambiar de proveedor
3. Pega tu **API Key**
4. (Opcional) Cambia el **Modelo** si deseas uno diferente:
   - OpenAI: `gpt-4o-mini` (rápido), `gpt-4o` (recomendado), `gpt-4-turbo`
   - Anthropic: `claude-sonnet-4-20250514` (recomendado), `claude-opus-4-20250514`

## Paso 6: Probar el Plugin

### Método 1: Con diálogo interactivo (Recomendado)

1. **Crea un nuevo bloque** en Logseq
2. **Escribe `/youtube-summary`** y presiona Enter
3. **Aparecerá un diálogo** pidiendo la URL
4. **Pega la URL** del video: `https://www.youtube.com/watch?v=VIDEO_ID`
5. **Presiona OK**

### Método 2: Con URL preexistente

1. **Pega primero** una URL de YouTube en un bloque: `https://www.youtube.com/watch?v=VIDEO_ID`
2. **Escribe `/youtube-summary`** en ese mismo bloque
3. **Presiona Enter**

### Resultado esperado

El plugin debería:
- ✅ Actualizar el bloque con la URL (si usaste el diálogo)
- ✅ Extraer la transcripción del video
- ✅ Detectar el idioma automáticamente
- ✅ Generar el resumen con IA
- ✅ Insertar bloques hijos con: Tema Principal, Puntos Clave, Conclusión

## Solución de Problemas

### Error: "npm: command not found"
- Instala Node.js desde https://nodejs.org/

### Error: "Cannot find module"
- Ejecuta `npm install` de nuevo
- Verifica que `node_modules/` existe

### Error: "Plugin no se carga en Logseq"
- Verifica que Developer mode está activado
- Asegúrate de seleccionar la carpeta correcta (debe contener `package.json`)
- Revisa la consola de Logseq (F12) para ver errores

### Error: "API key inválida"
- Verifica que copiaste la key completa
- Para OpenAI: https://platform.openai.com/api-keys
- Para Anthropic: https://console.anthropic.com/settings/keys

### Error: "Video sin transcripción"
- Solo funcionan videos con subtítulos disponibles
- Prueba con otro video que tenga subtítulos

## Comandos Útiles

```bash
# Desarrollo con watch (recarga automática)
npm run dev

# Compilación para producción
npm run build

# Ver estructura del proyecto
tree -L 2
```

