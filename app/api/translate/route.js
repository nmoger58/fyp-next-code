// API route for translating text using free Google Translate API
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

    // Skip translation for English
    if (targetLanguage === 'en') {
      return Response.json({
        success: true,
        original: text,
        translated: text,
        language: targetLanguage,
      });
    }

    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + 
      targetLanguage + '&dt=t&q=' + encodeURIComponent(text);

    const response = await axios.get(url);

    let translatedText = text;
    if (response.data && response.data[0]) {
      translatedText = response.data[0].map(part => part[0]).join('');
    }

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