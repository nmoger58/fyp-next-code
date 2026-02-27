# Google Translate API Setup Guide

## Overview
This project now uses Google Translate API for dynamic translation instead of hardcoded translations. This allows automatic translation to all supported languages without manual maintenance.

## Prerequisites

1. **Google Cloud Project**
   - Create a Google Cloud project at https://console.cloud.google.com
   - Enable the Google Translate API

2. **Service Account**
   - Create a Service Account with Translate API permissions
   - Download the JSON key file

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install @google-cloud/translate
```

### Step 2: Set Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
```

### Step 3: Configure Service Account Key

Place your Google Cloud service account JSON key file in a secure location and update the `GOOGLE_APPLICATION_CREDENTIALS` path accordingly.

**For production (Vercel/Cloud deployments):**
Store the key securely and set environment variables in your hosting platform's dashboard.

## How It Works

### Files Modified/Created:

1. **lib/translateService.js** (NEW)
   - Handles Google Translate API initialization and translation
   - Provides `translateText()` and `translateTexts()` functions
   - Includes fallback mechanisms for API failures

2. **lib/translations-base.js** (NEW)
   - Contains only English base translations
   - Significantly smaller than before (reduced from 892 lines to ~150 lines)
   - Exported as `baseTranslations` and `supportedLanguages`

3. **context/LanguageContext.js** (UPDATED)
   - Integrated with `translateService.js`
   - Fetches translations dynamically using Google Translate API
   - Caches translations in `localStorage` and `translationCache` for performance
   - Stores translations for offline access

4. **Components/LanguageSelector.js** (UPDATED)
   - Added loading state during translation
   - Shows "Translating..." indicator
   - Handles async language change with error handling

5. **package.json** (UPDATED)
   - Added `@google-cloud/translate` dependency

## Features

✅ **Dynamic Translation**: No need to maintain hardcoded translations for each language
✅ **Automatic Caching**: Translations are cached in localStorage and memory
✅ **Offline Support**: Cached translations work offline
✅ **Error Handling**: Graceful fallback to English if API fails
✅ **Performance**: Batch translation of all keys at once
✅ **Supported Languages**: English, Spanish, French, German, Hindi, Tamil, Chinese, Japanese

## Adding New Text

To add new translation strings:

1. Add the new key and English text to `baseTranslations` in `lib/translations-base.js`:
```javascript
export const baseTranslations = {
  // ... existing translations
  new_feature: 'New Feature',
};
```

2. Use it in your component with the language context:
```javascript
import { useLanguage } from '@/context/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  return <h1>{t('new_feature')}</h1>;
}
```

The translation will be automatically fetched and cached when users switch languages.

## Cost Considerations

Google Translate API is a paid service. Costs depend on:
- **Request volume**: You're charged per character translated
- **Caching**: The implementation uses caching to minimize API calls
- **Batch operations**: Translations are batched together to reduce requests

### Cost Optimization Tips:
1. Translations are cached locally after first translation
2. Cache persists in localStorage for 30+ days
3. Batch translation of all strings at once
4. Only translate when user explicitly changes language

## Troubleshooting

### "Error initializing translator"
- Ensure `GOOGLE_APPLICATION_CREDENTIALS` environment variable is correctly set
- Verify the service account key JSON file exists and is valid
- Check that the Translate API is enabled in Google Cloud Console

### Translations not updating
- Clear localStorage: `localStorage.clear()`
- Restart the development server
- Check browser console for errors

### High API costs
- Review the number of character translations
- Consider reducing supported languages
- Implement longer cache duration

## References

- [Google Cloud Translate Documentation](https://cloud.google.com/translate/docs)
- [Node.js Client Library](https://github.com/googleapis/nodejs-translate)
- [Pricing Information](https://cloud.google.com/translate/pricing)
