import '@logseq/libs';
import { registerSettings, getSettings, validateSettings } from './settings';
import { extractVideoId, getVideoMetadata, getTranscript, extractUrlFromBlock } from './youtube';
import { detectLanguage } from './language';
import { generateSummary } from './llm';
import { formatSummaryToBlocks } from './formatter';
import { t } from './i18n';

/**
 * Función principal que se ejecuta cuando Logseq carga el plugin
 */
async function main() {
  console.log('YouTube Summary plugin cargado');
  
  // Registrar settings UI
  registerSettings();
  
  // Registrar comando slash
  logseq.Editor.registerSlashCommand('youtube-summary', async () => {
    try {
      // 1. Obtener bloque actual
      const block = await logseq.Editor.getCurrentBlock();
      if (!block) {
        await logseq.UI.showMsg(t('messages.noBlockSelected'), 'error');
        return;
      }

      // 2. Intentar extraer URL del contenido del bloque actual
      let url = extractUrlFromBlock(block.content);

      // 3. Si no hay URL en el bloque, pedirla al usuario
      if (!url) {
        const input = await logseq.UI.showInputDialog(
          t('messages.enterVideoUrl').split('\n')[0],
          t('messages.enterVideoUrl').split('\n')[1],
          {
            placeholder: 'https://www.youtube.com/watch?v=...'
          }
        );

        if (!input || input.trim() === '') {
          await logseq.UI.showMsg(t('messages.operationCancelled'), 'warning');
          return;
        }

        url = input.trim();

        // Actualizar el bloque con la URL ingresada
        await logseq.Editor.updateBlock(block.uuid, url);
      }

      // 4. Validar settings
      const settings = getSettings();
      const validation = validateSettings(settings);
      if (!validation.valid) {
        await logseq.UI.showMsg(validation.error || t('messages.configureApiKey'), 'error');
        return;
      }

      // 5. Extraer video ID
      const videoId = extractVideoId(url);
      if (!videoId) {
        await logseq.UI.showMsg(t('messages.invalidUrl'), 'error');
        return;
      }

      // 6. Mostrar loading único
      await logseq.UI.showMsg(t('messages.generatingSummary'), 'info');

      // 7. Extraer metadatos del video
      let metadata;
      try {
        metadata = await getVideoMetadata(videoId);
      } catch (error: any) {
        console.warn('Error al obtener metadatos, continuando con valores por defecto:', error);
        metadata = {
          title: 'Video de YouTube',
          channel: 'Canal desconocido',
          url: url
        };
      }

      // 8. Extraer transcripción
      let transcript: string;
      try {
        transcript = await getTranscript(videoId);
      } catch (error: any) {
        const errorMessage = error.message || 'Error desconocido';
        if (errorMessage.includes('transcript') || errorMessage.includes('subtitles')) {
          await logseq.UI.showMsg(t('messages.noTranscriptAvailable'), 'error');
        } else {
          await logseq.UI.showMsg(`${t('messages.transcriptError')}: ${errorMessage}`, 'error');
        }
        return;
      }

      // 9. Detectar idioma (solo para logging, el resumen usa el idioma de la interfaz)
      const detectedLanguage = detectLanguage(transcript);
      console.log(`Idioma detectado en transcripción: ${detectedLanguage}`);

      // 10. Generar resumen (usa el idioma de la interfaz del usuario)
      let summaryText: string;
      try {
        summaryText = await generateSummary(transcript, settings);
      } catch (error: any) {
        const errorMessage = error.message || 'Error desconocido';

        // Mensajes de error específicos
        if (errorMessage.includes('API key')) {
          await logseq.UI.showMsg(errorMessage, 'error');
        } else if (errorMessage.includes('rate') || errorMessage.includes('429')) {
          await logseq.UI.showMsg(t('messages.rateLimitExceeded'), 'error');
        } else if (errorMessage.includes('401')) {
          await logseq.UI.showMsg(t('messages.invalidApiKey'), 'error');
        } else if (errorMessage.includes('404')) {
          await logseq.UI.showMsg(t('messages.modelNotFound'), 'error');
        } else {
          await logseq.UI.showMsg(`${t('messages.summaryError')}: ${errorMessage}`, 'error');
        }
        console.error('Error al generar resumen:', error);
        return;
      }

      // 11. Formatear a bloques
      const blocks = formatSummaryToBlocks(summaryText, metadata);

      // 12. Insertar bloques hijos con jerarquía parent/child correcta
      try {
        // Mapa para rastrear el último UUID insertado por cada nivel
        const lastBlockByLevel: Record<number, string> = {};

        for (const blockWithLevel of blocks) {
          let parentUuid: string;

          // Determinar el padre según el nivel
          if (blockWithLevel.level === 0) {
            // Nivel 0: insertar como hijo del bloque raíz (URL)
            parentUuid = block.uuid;
          } else {
            // Buscar el último bloque del nivel anterior para usarlo como padre
            const parentLevel = blockWithLevel.level - 1;
            parentUuid = lastBlockByLevel[parentLevel] || block.uuid;
          }

          // Insertar bloque bajo su padre
          const insertedBlock = await logseq.Editor.insertBlock(
            parentUuid,
            blockWithLevel.content,
            {
              sibling: false, // Insertar como hijo
              isPageBlock: false
            }
          );

          // Guardar UUID del bloque insertado para que sus hijos lo usen como padre
          if (insertedBlock) {
            lastBlockByLevel[blockWithLevel.level] = insertedBlock.uuid;
          }
        }
      } catch (error: any) {
        console.error('Error al insertar bloques:', error);
        await logseq.UI.showMsg(`${t('messages.insertionError')}: ${error.message || 'Error desconocido'}`, 'error');
      }
      
    } catch (error: any) {
      console.error('Error general en youtube-summary:', error);
      const errorMessage = error.message || 'Error desconocido';
      await logseq.UI.showMsg(`Error: ${errorMessage}`, 'error');
    }
  });
  
  console.log('Comando /youtube-summary registrado');
}

// Inicializar plugin cuando Logseq esté listo
logseq.ready(main).catch(console.error);

