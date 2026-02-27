// API route for translating text using LibreTranslate (free)
// This runs on the server, not in the browser

import axios from 'axios';

export async function POST(request) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return Response.json(
        { error: 'Missing required fields: text, targetLanguage' },
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
        original: text,
        translated: text,
        language: targetLanguage,
      });
    }

    const response = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text',
    });

    const translatedText = response.data.translatedText;

    return Response.json({
      success: true,
      original: text,
      translated: translatedText,
      language: targetLanguage,
    });
  } catch (error) {
    console.error('Translation error:', error.message);
    return Response.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    );
  }
}
