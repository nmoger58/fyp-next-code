// API route for batch translating multiple texts
// This runs on the server, not in the browser

import axios from 'axios';

export async function POST(request) {
  try {
    const { texts, targetLanguage } = await request.json();

    if (!Array.isArray(texts) || texts.length === 0 || !targetLanguage) {
      return Response.json(
        { error: 'Missing required fields: texts (array), targetLanguage' },
        { status: 400 }
      );
    }

    // Language code mapping for LibreTranslate
    const languageCodeMap = {
      en: 'en',
      es: 'es',
      fr: 'fr',
      de: 'de',
      hi: 'hi',
      ta: 'ta',
      zh: 'zh',
      ja: 'ja',
    };

    const targetLang = languageCodeMap[targetLanguage] || 'en';

    // Skip translation for English
    if (targetLang === 'en') {
      return Response.json({
        success: true,
        originals: texts,
        translated: texts,
        language: targetLanguage,
      });
    }

    // Translate all texts
    const translatedTexts = await Promise.all(
      texts.map(async (text) => {
        try {
          const response = await axios.post('https://libretranslate.com/translate', {
            q: text,
            source: 'en',
            target: targetLang,
            format: 'text',
          });
          return response.data.translatedText;
        } catch (error) {
          console.error(`Failed to translate "${text}":`, error.message);
          return text; // Return original text on error
        }
      })
    );

    return Response.json({
      success: true,
      originals: texts,
      translated: translatedTexts,
      language: targetLanguage,
    });
  } catch (error) {
    console.error('Batch translation error:', error);
    return Response.json(
      { error: error.message || 'Batch translation failed' },
      { status: 500 }
    );
  }
}
