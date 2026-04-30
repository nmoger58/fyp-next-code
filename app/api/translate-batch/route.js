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

    // Skip translation for English
    if (targetLanguage === 'en') {
      return Response.json({
        success: true,
        originals: texts,
        translated: texts,
        language: targetLanguage,
      });
    }

    let translatedTexts = [];
    
    try {
      // Free Google Translate API endpoint (undocumented)
      // We process translations in parallel but not combined, to avoid delimiter issues
      translatedTexts = await Promise.all(
        texts.map(async (text) => {
          if (!text) return '';
          
          const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + 
            targetLanguage + '&dt=t&q=' + encodeURIComponent(text);
            
          const response = await axios.get(url);
          
          // The response format is deeply nested arrays: [[[ "translated", "original", ... ]]]
          if (response.data && response.data[0]) {
            // Concatenate all parts if the text was split into sentences
            return response.data[0].map(part => part[0]).join('');
          }
          return text;
        })
      );
    } catch (error) {
      console.error('Google Translate API error:', error.message);
      // Fallback to original texts on error
      translatedTexts = texts;
    }

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