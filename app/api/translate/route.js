// API route for translating text using Google Cloud Translation API (official)
// Runs on the server only — API key is never exposed to the browser

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

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_TRANSLATE_API_KEY is not set');
      return Response.json(
        { error: 'Translation service not configured. Please add GOOGLE_TRANSLATE_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: 'en',
        format: 'text',
      }),
    });

    if (!googleResponse.ok) {
      const errData = await googleResponse.json();
      const errMsg = errData?.error?.message || 'Google Translate API error';
      console.error('Google Translate API error:', errMsg);
      return Response.json({ error: errMsg }, { status: googleResponse.status });
    }

    const data = await googleResponse.json();
    const translatedText = data?.data?.translations?.[0]?.translatedText || text;

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