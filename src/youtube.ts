import { VideoMetadata, TranscriptResult } from './types';

/**
 * URL del Worker de Cloudflare para obtener transcripciones
 */
const WORKER_URL = 'https://youtube-transcript-proxy.dark-rain-ed67.workers.dev';

/**
 * Extrae el ID del video de una URL de YouTube
 */
export function extractVideoId(url: string): string | null {
  const watchPattern = /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/;
  const shortPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;

  const watchMatch = url.match(watchPattern);
  if (watchMatch) return watchMatch[1];

  const shortMatch = url.match(shortPattern);
  if (shortMatch) return shortMatch[1];

  return null;
}

/**
 * Obtiene los metadatos del video usando el proxy
 */
export async function getVideoMetadata(videoId: string): Promise<VideoMetadata> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const proxyUrl = `${WORKER_URL}/?url=${encodeURIComponent(oembedUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return {
      title: data.title || 'Video sin título',
      channel: data.author_name || 'Canal desconocido',
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
  } catch (error) {
    console.warn('Error al obtener metadatos, usando valores por defecto:', error);
    return {
      title: 'Video de YouTube',
      channel: 'Canal desconocido',
      url: `https://www.youtube.com/watch?v=${videoId}`
    };
  }
}

/**
 * Obtiene la transcripción usando el Worker con InnerTube API
 */
export async function getTranscript(videoId: string): Promise<TranscriptResult> {
  try {
    console.log('🔍 Obteniendo transcripción del video...');

    const response = await fetch(`${WORKER_URL}/?mode=transcript&videoId=${videoId}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Error al obtener transcripción');
    }

    if (!data.transcript || data.transcript.length < 100) {
      throw new Error('La transcripción está vacía o es demasiado corta');
    }

    const source = data.source === 'supadata' ? 'supadata' : 'youtube';
    console.log(`✅ Transcripción obtenida: ${data.segments} segmentos, ${data.transcript.length} caracteres (${data.language}) [fuente: ${source}]`);

    return {
      transcript: data.transcript,
      source
    };

  } catch (error: any) {
    console.error('❌ Error al obtener transcripción:', error);

    if (error.message.includes('No captions')) {
      throw new Error('No se pudo obtener la transcripción. El video puede no tener subtítulos disponibles.');
    }

    throw new Error(`Error al obtener transcripción: ${error.message || 'Error desconocido'}`);
  }
}

/**
 * Extrae URL de YouTube del contenido de un bloque
 */
export function extractUrlFromBlock(content: string): string | null {
  const urlPatterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of urlPatterns) {
    const match = content.match(pattern);
    if (match) {
      if (content.includes('youtu.be')) {
        return `https://youtu.be/${match[1]}`;
      }
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
  }

  return null;
}
