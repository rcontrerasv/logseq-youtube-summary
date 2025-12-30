/**
 * Internationalization (i18n) for YouTube Summary Plugin
 * Supports English and Spanish
 */

export type Language = 'en' | 'es';

export interface Translations {
  // Settings
  settings: {
    language: string;
    languageDescription: string;
    provider: string;
    providerDescription: string;
    apiKey: string;
    apiKeyDescription: string;
    model: string;
    modelDescription: string;
  };

  // Messages
  messages: {
    noBlockSelected: string;
    pasteUrlFirst: string;
    invalidUrl: string;
    configureApiKey: string;
    extractingTranscript: string;
    noTranscriptAvailable: string;
    transcriptError: string;
    generatingSummary: string;
    summaryReceived: string;
    processingContent: string;
    invalidApiKey: string;
    rateLimitExceeded: string;
    modelNotFound: string;
    summaryError: string;
    insertingBlocks: string;
    successfullyInserted: string;
    insertionError: string;
  };

  // LLM Prompt
  llmPrompt: {
    systemMessage: string;
    instructions: string;
    structure: string;
    format: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    settings: {
      language: 'Language',
      languageDescription: 'Choose interface language. "Auto" detects from Logseq settings.',
      provider: 'LLM Provider',
      providerDescription: 'Select the LLM provider to use',
      apiKey: 'API Key',
      apiKeyDescription: 'Enter your API key. Get your key at: OpenAI (https://platform.openai.com/api-keys) or Anthropic (https://console.anthropic.com/settings/keys)',
      model: 'Model',
      modelDescription: 'OpenAI: gpt-4o-mini (fast), gpt-4o (recommended), gpt-4-turbo | Anthropic: claude-sonnet-4-20250514 (recommended), claude-opus-4-20250514. Enter exact model name.',
    },
    messages: {
      noBlockSelected: 'No block selected. Please place cursor in a block.',
      pasteUrlFirst: 'Please paste a YouTube URL in this block first, then run /youtube-summary again',
      invalidUrl: 'Invalid YouTube URL. Must be format: youtube.com/watch?v=xxxxx or youtu.be/xxxxx',
      configureApiKey: 'Configure your API key in Settings → Plugin Settings → YouTube Summary',
      extractingTranscript: '⏳ Extracting video transcript...',
      noTranscriptAvailable: 'This video has no transcript available. Only videos with subtitles work.',
      transcriptError: 'Error extracting transcript',
      generatingSummary: '🤖 Generating AI summary... (this may take 10-30 seconds)',
      summaryReceived: '✨ Summary received! Processing content...',
      processingContent: '⚙️ Formatting summary into blocks...',
      invalidApiKey: 'Invalid API key. Check your key in settings.',
      rateLimitExceeded: 'Rate limit exceeded. Wait a few minutes before trying again.',
      modelNotFound: 'Model not found. Verify the model name is correct.',
      summaryError: 'Error generating summary',
      insertingBlocks: '📝 Inserting summary into Logseq',
      successfullyInserted: '✅ Summary inserted successfully',
      insertionError: 'Error inserting blocks',
    },
    llmPrompt: {
      systemMessage: 'You are an expert assistant at creating structured video summaries. Analyze the following YouTube video transcript and create an executive summary.',
      instructions: 'IMPORTANT: Respond ONLY in English. Do not use any other language in your response.',
      structure: `Required structure with EACH section on a NEW LINE:

Main topic: [One sentence capturing the central idea]

Key points:
- [First key point with clear title and description]
- [Second key point with clear title and description]
- [Third key point with clear title and description]
- [Add more points as needed, 3-5 total]

Conclusion: [Main takeaway or message from the video]`,
      format: 'CRITICAL FORMAT RULES:\n1. Each section MUST start on a new line\n2. Use clear line breaks between sections\n3. Each key point on its own line starting with "-"\n4. Be concise but complete'
    }
  },
  es: {
    settings: {
      language: 'Idioma',
      languageDescription: 'Elige el idioma de la interfaz. "Auto" detecta desde la configuración de Logseq.',
      provider: 'Proveedor de LLM',
      providerDescription: 'Selecciona el proveedor de LLM que deseas utilizar',
      apiKey: 'API Key',
      apiKeyDescription: 'Ingresa tu clave de API. Obtén tu key en: OpenAI (https://platform.openai.com/api-keys) o Anthropic (https://console.anthropic.com/settings/keys)',
      model: 'Modelo',
      modelDescription: 'OpenAI: gpt-4o-mini (rápido), gpt-4o (recomendado), gpt-4-turbo | Anthropic: claude-sonnet-4-20250514 (recomendado), claude-opus-4-20250514. Escribe el nombre exacto.',
    },
    messages: {
      noBlockSelected: 'No hay un bloque seleccionado. Por favor, coloca el cursor en un bloque.',
      pasteUrlFirst: 'Por favor, pega primero una URL de YouTube en este bloque, luego ejecuta /youtube-summary nuevamente',
      invalidUrl: 'URL de YouTube inválida. Debe ser formato: youtube.com/watch?v=xxxxx o youtu.be/xxxxx',
      configureApiKey: 'Configura tu API key en Settings → Plugin Settings → YouTube Summary',
      extractingTranscript: '⏳ Extrayendo transcripción del video...',
      noTranscriptAvailable: 'Este video no tiene transcripción disponible. Solo funcionan videos con subtítulos.',
      transcriptError: 'Error al obtener transcripción',
      generatingSummary: '🤖 Generando resumen con IA... (esto puede tomar 10-30 segundos)',
      summaryReceived: '✨ ¡Resumen recibido! Procesando contenido...',
      processingContent: '⚙️ Formateando resumen en bloques...',
      invalidApiKey: 'API key inválida. Verifica tu key en settings.',
      rateLimitExceeded: 'Límite de rate excedido. Espera unos minutos antes de intentar de nuevo.',
      modelNotFound: 'Modelo no encontrado. Verifica que el nombre del modelo sea correcto.',
      summaryError: 'Error al generar resumen',
      insertingBlocks: '📝 Insertando resumen en Logseq',
      successfullyInserted: '✅ Resumen insertado exitosamente',
      insertionError: 'Error al insertar bloques',
    },
    llmPrompt: {
      systemMessage: 'Eres un asistente experto en crear resúmenes estructurados de videos. Analiza la siguiente transcripción de un video de YouTube y crea un resumen ejecutivo.',
      instructions: 'IMPORTANTE: Responde ÚNICAMENTE en español. No uses ningún otro idioma en tu respuesta.',
      structure: `Estructura requerida con CADA sección en una NUEVA LÍNEA:

Tema principal: [Una frase que capture la idea central]

Puntos clave:
- [Primer punto clave con título claro y descripción]
- [Segundo punto clave con título claro y descripción]
- [Tercer punto clave con título claro y descripción]
- [Agrega más puntos según sea necesario, 3-5 en total]

Conclusión: [El takeaway o mensaje principal del video]`,
      format: 'REGLAS CRÍTICAS DE FORMATO:\n1. Cada sección DEBE comenzar en una nueva línea\n2. Usa saltos de línea claros entre secciones\n3. Cada punto clave en su propia línea comenzando con "-"\n4. Sé conciso pero completo'
    }
  }
};

/**
 * Get current language based on user settings or auto-detect from Logseq
 */
export function getCurrentLanguage(): Language {
  try {
    const settings = logseq.settings as any;

    // Check if user has manually set a language
    if (settings?.language && settings.language !== 'auto') {
      return settings.language as Language;
    }

    // Auto-detect from Logseq's preferred language
    const logseqLang = logseq.App?.getUserConfigs()?.preferredLanguage;

    if (logseqLang && logseqLang.startsWith('es')) {
      return 'es';
    }

    // Default to English
    return 'en';
  } catch (error) {
    console.warn('Error detecting language, defaulting to English:', error);
    return 'en';
  }
}

/**
 * Get translations for current language
 */
export function getTranslations(): Translations {
  const lang = getCurrentLanguage();
  return translations[lang];
}

/**
 * Get a specific translated message
 */
export function t(key: string): string {
  const trans = getTranslations();
  const keys = key.split('.');

  let value: any = trans;
  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
