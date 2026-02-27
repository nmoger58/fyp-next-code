'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translateTexts } from '@/lib/translateService';
import { baseTranslations } from '@/lib/translations-base';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);
  const [translations, setTranslations] = useState(baseTranslations);
  const [translationCache, setTranslationCache] = useState({});

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('verisynth-language') || 'en';
    setLanguageState(savedLanguage);
    setIsLoaded(true);
    
    // Load cached translations if available
    if (savedLanguage !== 'en') {
      const cachedTranslations = localStorage.getItem(`verisynth-translations-${savedLanguage}`);
      if (cachedTranslations) {
        try {
          const parsed = JSON.parse(cachedTranslations);
          setTranslations(parsed);
          setTranslationCache(prev => ({
            ...prev,
            [savedLanguage]: parsed
          }));
        } catch (error) {
          console.error('Failed to load cached translations:', error);
        }
      }
    }
  }, []);

  // Fetch and cache translations when language changes
  const changeLanguage = async (newLanguage) => {
    setLanguageState(newLanguage);
    localStorage.setItem('verisynth-language', newLanguage);

    // Check if translations are already cached
    if (translationCache[newLanguage]) {
      setTranslations(translationCache[newLanguage]);
      return;
    }

    // If English, use base translations
    if (newLanguage === 'en') {
      setTranslations(baseTranslations);
      return;
    }

    // Translate all keys for the new language
    try {
      const translationKeys = Object.keys(baseTranslations);
      const textsToTranslate = translationKeys.map(key => baseTranslations[key]);
      
      // Batch translate all texts
      const translatedTexts = await translateTexts(textsToTranslate, newLanguage);

      // Create translation object
      const translatedObject = {};
      translationKeys.forEach((key, index) => {
        translatedObject[key] = translatedTexts[index] || baseTranslations[key];
      });

      setTranslations(translatedObject);
      
      // Cache the translations
      setTranslationCache(prev => ({
        ...prev,
        [newLanguage]: translatedObject
      }));
      
      // Store in localStorage for offline availability
      localStorage.setItem(
        `verisynth-translations-${newLanguage}`,
        JSON.stringify(translatedObject)
      );
    } catch (error) {
      console.error('Translation fetch failed:', error);
      // Fallback to base translations
      setTranslations(baseTranslations);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: changeLanguage, 
        isLoaded,
        translations,
        t: (key) => translations[key] || key
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
