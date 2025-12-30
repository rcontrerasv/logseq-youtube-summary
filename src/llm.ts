import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { PluginSettings } from './types';
import { getTranslations } from './i18n';

/**
 * Genera el prompt estructurado para el LLM usando traducciones
 */
function createPrompt(transcript: string): string {
  const t = getTranslations();

  return `${t.llmPrompt.systemMessage}

${t.llmPrompt.instructions}

${t.llmPrompt.structure}

${t.llmPrompt.format}

Transcripción:
${transcript}`;
}

/**
 * Genera resumen usando OpenAI API
 */
async function generateWithOpenAI(
  transcript: string,
  settings: PluginSettings
): Promise<string> {
  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true // Seguro en Logseq: las API keys se almacenan localmente
  });

  try {
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        {
          role: 'user',
          content: createPrompt(transcript)
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('La respuesta de OpenAI está vacía');
    }

    return content.trim();
  } catch (error: any) {
    // Manejo específico de errores HTTP
    if (error.status === 401) {
      throw new Error('API key inválida. Verifica tu key en settings.');
    }
    if (error.status === 429) {
      throw new Error('Límite de rate excedido. Espera unos minutos antes de intentar de nuevo.');
    }
    if (error.status === 404) {
      throw new Error(`Modelo "${settings.model}" no encontrado. Verifica que el nombre del modelo sea correcto.`);
    }
    
    // Error genérico con mensaje específico
    const errorMessage = error.message || 'Error desconocido';
    throw new Error(`Error al generar resumen con OpenAI: ${errorMessage}`);
  }
}

/**
 * Genera resumen usando Anthropic API
 */
async function generateWithAnthropic(
  transcript: string,
  settings: PluginSettings
): Promise<string> {
  const anthropic = new Anthropic({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true // Seguro en Logseq: las API keys se almacenan localmente
  });

  try {
    const response = await anthropic.messages.create({
      model: settings.model,
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: createPrompt(transcript)
        }
      ]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('La respuesta de Anthropic no es texto');
    }

    return content.text.trim();
  } catch (error: any) {
    // Manejo específico de errores HTTP
    if (error.status === 401) {
      throw new Error('API key inválida. Verifica tu key en settings.');
    }
    if (error.status === 429) {
      throw new Error('Límite de rate excedido. Espera unos minutos antes de intentar de nuevo.');
    }
    if (error.status === 404) {
      throw new Error(`Modelo "${settings.model}" no encontrado. Verifica que el nombre del modelo sea correcto.`);
    }
    
    // Error genérico con mensaje específico
    const errorMessage = error.message || 'Error desconocido';
    throw new Error(`Error al generar resumen con Anthropic: ${errorMessage}`);
  }
}

/**
 * Función principal para generar resumen usando el proveedor configurado
 */
export async function generateSummary(
  transcript: string,
  settings: PluginSettings
): Promise<string> {
  // Validar que la transcripción tenga contenido
  if (!transcript || transcript.trim().length < 100) {
    throw new Error('La transcripción es demasiado corta para generar un resumen');
  }

  // Validar configuración
  if (!settings.apiKey || settings.apiKey.trim().length === 0) {
    throw new Error('API key no configurada');
  }

  if (!settings.model || settings.model.trim().length === 0) {
    throw new Error('Modelo no configurado');
  }

  // Llamar al proveedor correspondiente
  switch (settings.provider) {
    case 'openai':
      return await generateWithOpenAI(transcript, settings);
    case 'anthropic':
      return await generateWithAnthropic(transcript, settings);
    default:
      throw new Error(`Proveedor no soportado: ${settings.provider}`);
  }
}

