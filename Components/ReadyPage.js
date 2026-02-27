'use client';
import React from 'react';
import { FileVideo, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const ReadyPage = ({ file, onStartAnalysis, onCancel, isLoading }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-neutral-600 rounded-xl p-8">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-white text-2xl font-bold">{t(language, 'ready_to_analyze')}</h2>
          <button
            onClick={onCancel}
            className="text-danger hover:text-red-400"
            disabled={isLoading}
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-neutral-900 rounded-lg p-6 mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-dark rounded-lg flex items-center justify-center">
            <FileVideo className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">{file.name}</div>
            <div className="text-neutral-300 text-sm">
              {t(language, 'file_size')}: {(file.size / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
        </div>

        <button
          onClick={onStartAnalysis}
          disabled={isLoading}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t(language, 'analyzing_video')}
            </>
          ) : (
            <>
              <FileVideo className="w-6 h-6" />
              {t(language, 'start_analysis')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReadyPage;
