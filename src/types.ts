/**
 * Proveedores de LLM soportados
 */
export type LLMProvider = 'openai' | 'anthropic' | 'deepseek' | 'grok' | 'gemini' | 'qwen' | 'moonshot';

/**
 * Configuración del plugin
 * Nota: provider se detecta automáticamente basado en el modelo seleccionado
 */
export interface PluginSettings {
  language: 'auto' | 'en' | 'es';
  provider: LLMProvider; // Detectado automáticamente según el modelo
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

/**
 * Resultado de la transcripción con información de fuente
 */
export interface TranscriptResult {
  transcript: string;
  source: 'youtube' | 'supadata';
}

