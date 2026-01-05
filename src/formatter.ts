import { VideoMetadata } from './types';
import { t } from './i18n';

/**
 * Estructura de un bloque con su nivel jerárquico
 */
export interface BlockWithLevel {
  content: string;
  level: number;
}

/**
 * Formatea el resumen markdown del LLM a bloques estructurados de Logseq
 * Sin bullets (-) ya que Logseq los crea automáticamente
 * @param summary - El resumen generado por el LLM
 * @param metadata - Metadatos del video
 * @param source - Fuente de la transcripción ('youtube' | 'supadata')
 */
export function formatSummaryToBlocks(summary: string, metadata: VideoMetadata, source: 'youtube' | 'supadata' = 'youtube'): BlockWithLevel[] {
  const blocks: BlockWithLevel[] = [];

  // Bloque principal con metadata del video (nivel 0)
  blocks.push({
    content: `**Video**: ${metadata.title} - ${metadata.channel}`,
    level: 0
  });

  // Parsear el resumen en secciones
  const sections = parseSummarySections(summary);

  // Tema principal (nivel 1 - hijo de Video)
  if (sections.mainTopic) {
    blocks.push({
      content: `**Tema principal**: ${sections.mainTopic}`,
      level: 1
    });
  }

  // Puntos clave (nivel 1 - hijo de Video)
  if (sections.keyPoints.length > 0) {
    blocks.push({
      content: '**Puntos clave**:',
      level: 1
    });

    // Cada punto clave (nivel 2 - hijo de "Puntos clave")
    sections.keyPoints.forEach(point => {
      blocks.push({
        content: point,
        level: 2
      });
    });
  }

  // Conclusión (nivel 1 - hijo de Video)
  if (sections.conclusion) {
    blocks.push({
      content: `**Conclusión**: ${sections.conclusion}`,
      level: 1
    });
  }

  // Mensaje de donación si la fuente es Supadata (nivel 1 - hijo de Video)
  if (source === 'supadata') {
    blocks.push({
      content: t('messages.donationMessage'),
      level: 1
    });
  }

  return blocks;
}

/**
 * Formatea el resumen a una estructura más estructurada
 * Intenta extraer secciones específicas del texto markdown
 */
export function parseSummarySections(summary: string): {
  mainTopic?: string;
  keyPoints: string[];
  conclusion?: string;
} {
  console.log('📋 Resumen recibido del LLM:');
  console.log(summary);
  console.log('---');

  const result: {
    mainTopic?: string;
    keyPoints: string[];
    conclusion?: string;
  } = {
    keyPoints: []
  };

  // Buscar tema principal - debe estar en su propia línea
  const mainTopicRegex = /(?:Tema principal|Main topic)[:\-]\s*(.+?)(?=\n\n|\n(?:Puntos clave|Key points)|$)/is;
  const mainTopicMatch = summary.match(mainTopicRegex);
  if (mainTopicMatch) {
    result.mainTopic = mainTopicMatch[1].trim();
    console.log('✅ Tema principal:', result.mainTopic);
  }

  // Buscar sección de puntos clave completa
  const keyPointsRegex = /(?:Puntos clave|Key points)[:\-]?\s*\n([\s\S]+?)(?=\n\n(?:Conclusión|Conclusion)|\n(?:Conclusión|Conclusion)|$)/i;
  const keyPointsMatch = summary.match(keyPointsRegex);

  if (keyPointsMatch) {
    const pointsText = keyPointsMatch[1];
    console.log('📝 Texto de puntos clave encontrado:', pointsText);

    // Dividir por bullets (- al inicio de línea) y capturar contenido multi-línea
    const lines = pointsText.split('\n');
    let currentPoint = '';

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Si la línea empieza con bullet, es un nuevo punto
      if (/^[-•*]\s+/.test(trimmedLine)) {
        // Guardar el punto anterior si existe
        if (currentPoint) {
          result.keyPoints.push(currentPoint.trim());
          console.log('  ➜ Punto:', currentPoint.substring(0, 60) + '...');
        }
        // Iniciar nuevo punto (sin el bullet)
        currentPoint = trimmedLine.replace(/^[-•*]\s+/, '');
      } else if (trimmedLine && currentPoint) {
        // Continuar el punto actual con esta línea
        currentPoint += ' ' + trimmedLine;
      }
    }

    // No olvidar el último punto
    if (currentPoint) {
      result.keyPoints.push(currentPoint.trim());
      console.log('  ➜ Punto:', currentPoint.substring(0, 60) + '...');
    }
  }

  console.log(`✅ Total puntos clave: ${result.keyPoints.length}`);

  // Buscar conclusión
  const conclusionRegex = /(?:Conclusión|Conclusion)[:\-]\s*(.+?)$/is;
  const conclusionMatch = summary.match(conclusionRegex);
  if (conclusionMatch) {
    result.conclusion = conclusionMatch[1].trim();
    console.log('✅ Conclusión:', result.conclusion.substring(0, 60) + '...');
  }

  return result;
}

