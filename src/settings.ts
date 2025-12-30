import '@logseq/libs';
import { PluginSettings } from './types';
import { t } from './i18n';

/**
 * Modelos disponibles por proveedor
 */
const OPENAI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'];
const ANTHROPIC_MODELS = ['claude-sonnet-4-20250514', 'claude-opus-4-20250514'];

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
      key: 'provider',
      type: 'enum',
      title: t('settings.provider'),
      description: t('settings.providerDescription'),
      default: 'openai',
      enumChoices: ['openai', 'anthropic'],
      enumPicker: 'select'
    },
    {
      key: 'apiKey',
      type: 'string',
      title: t('settings.apiKey'),
      description: t('settings.apiKeyDescription'),
      default: '',
      inputAs: 'password'
    },
    {
      key: 'model',
      type: 'string',
      title: t('settings.model'),
      description: t('settings.modelDescription'),
      default: 'gpt-4o-mini',
      inputAs: 'textarea'
    }
  ]);

  // Actualizar opciones de modelo cuando cambia el proveedor
  logseq.onSettingsChanged((settings: Partial<PluginSettings>) => {
    if (settings.provider) {
      updateModelOptions(settings.provider);
    }
  });

  // Inicializar opciones de modelo según el proveedor actual
  const currentSettings = logseq.settings as Partial<PluginSettings>;
  if (currentSettings?.provider) {
    updateModelOptions(currentSettings.provider);
  }
}

/**
 * Actualiza el modelo por defecto según el proveedor seleccionado
 * Nota: Logseq no soporta cambiar el schema dinámicamente,
 * pero sí podemos cambiar el valor del modelo automáticamente
 */
function updateModelOptions(provider: 'openai' | 'anthropic') {
  const currentSettings = logseq.settings as PluginSettings;

  // Determinar el modelo por defecto según el proveedor
  const defaultModel = provider === 'openai' ? 'gpt-4o-mini' : 'claude-sonnet-4-20250514';

  // Solo actualizar si el modelo actual no es válido para el nuevo proveedor
  const validModels = provider === 'openai' ? OPENAI_MODELS : ANTHROPIC_MODELS;
  if (!validModels.includes(currentSettings.model)) {
    logseq.updateSettings({ model: defaultModel });
    console.log(`🔄 Modelo actualizado automáticamente a: ${defaultModel}`);
  }
}

/**
 * Obtiene la configuración actual del plugin
 */
export function getSettings(): PluginSettings {
  const settings = logseq.settings as Partial<PluginSettings>;
  
  return {
    provider: settings.provider || 'openai',
    apiKey: settings.apiKey || '',
    model: settings.model || (settings.provider === 'anthropic' ? 'claude-sonnet-4-20250514' : 'gpt-4o-mini')
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

