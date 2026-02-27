'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { supportedLanguages } from '@/lib/translations-base';
import { ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = supportedLanguages.find(lang => lang.code === language);

  const handleLanguageChange = async (langCode) => {
    setIsLoading(true);
    try {
      await setLanguage(langCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors disabled:opacity-50"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm text-gray-300">{currentLanguage?.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isLoading}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-700 transition-colors disabled:opacity-50 ${
                language === lang.code ? 'bg-primary text-white' : 'text-gray-300'
              } ${lang.code === supportedLanguages[0].code ? 'rounded-t-lg' : ''} ${
                lang.code === supportedLanguages[supportedLanguages.length - 1].code ? 'rounded-b-lg' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
              {isLoading && language === lang.code && (
                <span className="ml-auto text-xs">Translating...</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
