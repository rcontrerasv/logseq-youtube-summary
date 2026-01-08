import '@logseq/libs';
import { PluginSettings, LLMProvider } from './types';
import { t } from './i18n';

/**
 * Modelos disponibles en el dropdown (agrupados por proveedor)
 * Ordenados aproximadamente por costo dentro de cada proveedor
 */
const AVAILABLE_MODELS = [
  // OpenAI
  'gpt-4o-mini',
  'gpt-4o',
  'o1-mini',
  // Anthropic
  'claude-sonnet-4-20250514',
  'claude-opus-4-20250514',
  // DeepSeek (muy económico)
  'deepseek-chat',
  'deepseek-reasoner',
  // Google Gemini
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  // xAI Grok
  'grok-3',
  'grok-4',
  // Qwen (Alibaba)
  'qwen-turbo',
  'qwen-plus',
  'qwen-max',
  // Moonshot (Kimi)
  'moonshot-v1-8k',
  'moonshot-v1-32k'
];

/**
 * Configuración de proveedores con sus baseURLs
 * Todos usan OpenAI SDK excepto Anthropic (que tiene su propio SDK)
 */
const PROVIDER_CONFIG: Record<LLMProvider, { baseURL: string }> = {
  openai: { baseURL: 'https://api.openai.com/v1' },
  anthropic: { baseURL: 'https://api.anthropic.com' },
  deepseek: { baseURL: 'https://api.deepseek.com' },
  grok: { baseURL: 'https://api.x.ai/v1' },
  gemini: { baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/' },
  qwen: { baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
  moonshot: { baseURL: 'https://api.moonshot.cn/v1' }
};

/**
 * Registra el schema de configuración del plugin en Logseq
 */
export function registerSettings() {
  logseq.useSettingsSchema([
    {
      key: 'language',
      type: 'enum',
      title: t('settings.language'),
      description: t('settings.languageDescription'),
      default: 'auto',
      enumChoices: ['auto', 'en', 'es'],
      enumPicker: 'select'
    },
    {
      key: 'model',
      type: 'enum',
      title: t('settings.model'),
      description: t('settings.modelDescription'),
      default: 'gpt-4o-mini',
      enumChoices: AVAILABLE_MODELS,
      enumPicker: 'select'
    },
    {
      key: 'apiKey',
      type: 'string',
      title: t('settings.apiKey'),
      description: t('settings.apiKeyDescription'),
      default: '',
      inputAs: 'password'
    }
  ]);
}

/**
 * Detecta el proveedor basado en el nombre del modelo
 */
function detectProvider(model: string): LLMProvider {
  const modelLower = model.toLowerCase();

  if (modelLower.startsWith('claude-')) {
    return 'anthropic';
  }
  if (modelLower.startsWith('deepseek-')) {
    return 'deepseek';
  }
  if (modelLower.startsWith('grok-')) {
    return 'grok';
  }
  if (modelLower.startsWith('gemini-')) {
    return 'gemini';
  }
  if (modelLower.startsWith('qwen-')) {
    return 'qwen';
  }
  if (modelLower.startsWith('moonshot-') || modelLower.startsWith('kimi-')) {
    return 'moonshot';
  }
  // Default: OpenAI (gpt-*, o1-*, text-*, etc.)
  return 'openai';
}

/**
 * Obtiene la configuración del proveedor (baseURL, etc.)
 */
export function getProviderConfig(provider: LLMProvider) {
  return PROVIDER_CONFIG[provider];
}

/**
 * Obtiene la configuración actual del plugin
 * El proveedor se detecta automáticamente según el modelo
 */
export function getSettings(): PluginSettings {
  const settings = logseq.settings as Partial<PluginSettings>;

  const defaultModel = 'gpt-4o-mini';
  const model = settings.model || defaultModel;

  // Detectar el proveedor basado en el modelo
  const provider = detectProvider(model);

  return {
    language: settings.language || 'auto',
    provider,
    apiKey: settings.apiKey || '',
    model
  };
}

/**
 * Valida que la configuración esté completa
 */
export function validateSettings(settings: PluginSettings): { valid: boolean; error?: string } {
  if (!settings.apiKey || settings.apiKey.trim().length === 0) {
    return {
      valid: false,
      error: 'API key no configurada. Configura tu API key en Settings → Plugin Settings → YouTube Summary'
    };
  }
  
  if (!settings.model || settings.model.trim().length === 0) {
    return {
      valid: false,
      error: 'Modelo no configurado. Selecciona un modelo en Settings → Plugin Settings → YouTube Summary'
    };
  }
  
  return { valid: true };
}

