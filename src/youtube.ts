import { YoutubeTranscript } from '@danielxceron/youtube-transcript';
import { VideoMetadata } from './types';

/**
 * Extrae el ID del video de una URL de YouTube
 * Soporta formatos: youtube.com/watch?v=, youtu.be/, www.youtube.com/watch?v=
 */
export function extractVideoId(url: string): string | null {
  // Patrón para youtube.com/watch?v=VIDEO_ID
  const watchPattern = /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/;
  // Patrón para youtu.be/VIDEO_ID
  const shortPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
  
  const watchMatch = url.match(watchPattern);
  if (watchMatch) {
    return watchMatch[1];
  }
  
  const shortMatch = url.match(shortPattern);
  if (shortMatch) {
    return shortMatch[1];
  }
  
  return null;
}

/**
 * Obtiene los metadatos del video (título y canal) usando oembed API
 */
export async function getVideoMetadata(videoId: string): Promise<VideoMetadata> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      throw new Error(`Error al obtener metadatos: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      title: data.title || 'Video sin título',
      channel: data.author_name || 'Canal desconocido',
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
  } catch (error) {
    console.error('Error al obtener metadatos del video:', error);
    // Retornar valores por defecto en lugar de fallar completamente
    return {
      title: 'Video de YouTube',
      channel: 'Canal desconocido',
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
  }
}

/**
 * Obtiene la transcripción completa del video como texto
 * Usa @danielxceron/youtube-transcript que tiene sistema de fallback mejorado
 * Soporta subtítulos auto-generados y manuales
 */
export async function getTranscript(videoId: string): Promise<string> {
  try {
    console.log('🔍 Obteniendo transcripción del video...');

    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcriptItems || transcriptItems.length === 0) {
      throw new Error('La transcripción está vacía');
    }

    const fullText = transcriptItems
      .map((item: { text: string }) => item.text)
      .join(' ')
      .trim();

    // Validar que la transcripción tenga al menos 100 caracteres
    if (fullText.length < 100) {
      throw new Error('La transcripción es demasiado corta (menos de 100 caracteres)');
    }

    console.log(`✅ Transcripción obtenida: ${transcriptItems.length} segmentos, ${fullText.length} caracteres`);
    return fullText;

  } catch (error: any) {
    console.error('❌ Error al obtener transcripción:', error);

    // Mensajes de error específicos
    if (error.message && (error.message.includes('transcript') || error.message.includes('subtitles'))) {
      throw new Error('No se pudo obtener la transcripción. El video puede no tener subtítulos disponibles o pueden estar deshabilitados.');
    }

    throw new Error(`Error al obtener transcripción: ${error.message || 'Error desconocido'}`);
  }
}

/**
 * Extrae URL de YouTube del contenido de un bloque
 * Busca URLs en el texto del bloque
 */
export function extractUrlFromBlock(content: string): string | null {
  // Patrones para detectar URLs de YouTube
  const urlPatterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of urlPatterns) {
    const match = content.match(pattern);
    if (match) {
      // Reconstruir URL completa
      if (content.includes('youtu.be')) {
        return `https://youtu.be/${match[1]}`;
      }
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
  }
  
  return null;
}

