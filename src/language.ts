import { franc } from 'franc-min';

/**
 * Mapeo de códigos ISO de idioma a nombres legibles
 */
const languageMap: Record<string, string> = {
  'spa': 'español',
  'eng': 'inglés',
  'fra': 'francés',
  'por': 'portugués',
  'ita': 'italiano',
  'deu': 'alemán',
  'rus': 'ruso',
  'jpn': 'japonés',
  'kor': 'coreano',
  'zho': 'chino',
  'ara': 'árabe',
  'hin': 'hindi',
  'nld': 'neerlandés',
  'swe': 'sueco',
  'nor': 'noruego',
  'dan': 'danés',
  'fin': 'finlandés',
  'pol': 'polaco',
  'tur': 'turco',
  'heb': 'hebreo',
  'tha': 'tailandés',
  'vie': 'vietnamita',
  'ces': 'checo',
  'ron': 'rumano',
  'hun': 'húngaro',
  'ell': 'griego',
  'bul': 'búlgaro',
  'hrv': 'croata',
  'srp': 'serbio',
  'slk': 'eslovaco',
  'slv': 'esloveno',
  'est': 'estonio',
  'lav': 'letón',
  'lit': 'lituano',
  'ukr': 'ucraniano',
  'cat': 'catalán',
  'eus': 'vasco',
  'glg': 'gallego',
};

/**
 * Detecta el idioma de un texto usando franc-min
 * Retorna el nombre del idioma en español para usar en el prompt del LLM
 */
export function detectLanguage(text: string): string {
  if (!text || text.trim().length === 0) {
    return 'español'; // Fallback por defecto
  }
  
  // Detectar código ISO del idioma
  const langCode = franc(text);
  
  // Si no se detecta o el código no está en el mapa, usar español como fallback
  if (!langCode || langCode === 'und' || !languageMap[langCode]) {
    return 'español';
  }
  
  return languageMap[langCode];
}

