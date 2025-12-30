/**
 * Configuración del plugin almacenada por el usuario
 */
export interface PluginSettings {
  language: 'auto' | 'en' | 'es';
  provider: 'openai' | 'anthropic';
  apiKey: string;
  model: string;
}

/**
 * Metadatos del video de YouTube
 */
export interface VideoMetadata {
  title: string;
  channel: string;
  url: string;
}

/**
 * Segmento de transcripción con información de tiempo
 */
export interface TranscriptSegment {
  text: string;
  offset: number;
  duration: number;
}

/**
 * Resultado estructurado del resumen (opcional, para parsing avanzado)
 */
export interface SummaryResult {
  mainTopic: string;
  keyPoints: string[];
  conclusion: string;
}

