// API route for batch translating multiple texts
// Uses the official Google Cloud Translation REST API — runs on server only

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

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_TRANSLATE_API_KEY is not set');
      return Response.json(
        { error: 'Translation service not configured. Please add GOOGLE_TRANSLATE_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    // Build URL with multiple 'q' params — Google accepts arrays this way
    const params = new URLSearchParams();
    params.append('key', apiKey);
    params.append('target', targetLanguage);
    params.append('source', 'en');
    params.append('format', 'text');
    texts.forEach((text) => params.append('q', text || ''));

    const url = `https://translation.googleapis.com/language/translate/v2?${params.toString()}`;

    const googleResponse = await fetch(url, { method: 'GET' });

    if (!googleResponse.ok) {
      const errData = await googleResponse.json();
      const errMsg = errData?.error?.message || 'Google Translate API error';
      console.error('Google Translate batch API error:', errMsg);
      return Response.json({ error: errMsg }, { status: googleResponse.status });
    }

    const data = await googleResponse.json();
    const translations = data?.data?.translations || [];

    // Map results back — preserve order, fall back to original on missing entry
    const translatedTexts = texts.map(
      (original, i) => translations[i]?.translatedText || original
    );

    return Response.json({
      success: true,
      originals: texts,
      translated: translatedTexts,
      language: targetLanguage,
    });
  } catch (error) {
    console.error('Batch translation error:', error.message);
    return Response.json(
      { error: error.message || 'Batch translation failed' },
      { status: 500 }
    );
  }
}