// Translation service using Google Translate API via Next.js API routes
// This is a client-side service that calls the backend API

/**
 * Translate text using LibreTranslate API
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language code
 * @returns {Promise<string>} - Translated text
 */
export const translateText = async (text, targetLanguage) => {
  try {
    if (targetLanguage === 'en') {
      return text; // No translation needed for English
    }

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        targetLanguage,
      }),
    });

    if (!response.ok) {
      console.error(`Translation API error: ${response.status} ${response.statusText}`);
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.translated;
    } else {
      throw new Error(data.error || 'Translation failed');
    }
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
};

/**
 * Translate multiple texts in batch
 * @param {string[]} texts - Array of texts to translate
 * @param {string} targetLanguage - Target language code
 * @returns {Promise<string[]>} - Array of translated texts
 */
export const translateTexts = async (texts, targetLanguage) => {
  try {
    if (targetLanguage === 'en' || !Array.isArray(texts) || texts.length === 0) {
      return texts;
    }

    const response = await fetch('/api/translate-batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts,
        targetLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Batch translation API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.translated;
    } else {
      throw new Error(data.error || 'Batch translation failed');
    }
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts; // Fallback to original texts
  }
};

// Supported languages with metadata
export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

