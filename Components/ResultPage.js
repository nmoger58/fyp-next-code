'use client';
import React from 'react';
import {
  FileVideo,
  CheckCircle,
  XCircle,
  Download,
  Upload,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const ResultPage = ({ file, analysisResult, onNewAnalysis, onDownload }) => {
  const { language } = useLanguage();

  if (!analysisResult) {
    return null;
  }

  const isDeepfake = analysisResult.prediction?.is_deepfake;
  const confidence = analysisResult.prediction?.confidence
    ? (analysisResult.prediction.confidence * 100).toFixed(1)
    : 0;

  const getIndicators = () => {
    if (analysisResult.error) {
      return [analysisResult.error];
    }

    if (isDeepfake) {
      return [
        t(language, 'indicator_frame_inconsistencies'),
        t(language, 'indicator_eye_movements'),
        t(language, 'indicator_audio_mismatch'),
        t(language, 'indicator_facial_manipulation'),
      ];
    } else {
      return [
        t(language, 'indicator_natural_movements'),
        t(language, 'indicator_consistent_lighting'),
        t(language, 'indicator_no_artifacts'),
        t(language, 'indicator_audio_sync'),
      ];
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-white text-3xl font-bold">{t(language, 'analysis_complete')}</h2>
          <button
            onClick={onNewAnalysis}
            className="text-danger hover:text-red-400"
          >
            <XCircle className="w-7 h-7" />
          </button>
        </div>

        <div className="bg-neutral-900 rounded-lg p-6 mb-6 flex items-center gap-4 border border-neutral-600">
          <div className="w-16 h-16 bg-primary-dark rounded-lg flex items-center justify-center">
            <FileVideo className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">{file.name}</div>
            <div className="text-neutral-300 text-sm">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl p-8 mb-6 border-2 ${
            isDeepfake
              ? 'bg-black bg-opacity-10 border-danger'
              : 'bg-black bg-opacity-10 border-success'
          }`}
        >
          {analysisResult.error ? (
            <div className="flex items-center gap-4 mb-4">
              <XCircle className="w-12 h-12 text-warning" />
              <div>
                <h3 className="text-white text-2xl font-bold">
                  {t(language, 'analysis_failed')}
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 mb-6">
              {isDeepfake ? (
                <XCircle className="w-12 h-12 text-danger" />
              ) : (
                <CheckCircle className="w-12 h-12 text-success" />
              )}
              <div>
                <h3 className="text-white text-2xl font-bold">
                  {isDeepfake ? t(language, 'deepfake_detected') : t(language, 'authentic_video')}
                </h3>
                <p className="text-neutral-300">
                  {t(language, 'confidence')}: {confidence}%
                </p>
              </div>
            </div>
          )}

          {!analysisResult.error && (
            <div className="w-full bg-neutral-900 rounded-full h-3 mb-6">
              <div
                className={`h-3 rounded-full ${
                  isDeepfake ? 'bg-danger' : 'bg-success'
                }`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
          )}

          <div>
            <h4 className="text-white font-bold mb-3">
              {analysisResult.error ? t(language, 'error_details') : t(language, 'key_indicators')}
            </h4>
            <ul className="space-y-2">
              {getIndicators().map((indicator, idx) => (
                <li key={idx} className="text-neutral-300 flex items-start gap-2">
                  <span
                    className={
                      analysisResult.error
                        ? 'text-warning'
                        : isDeepfake
                          ? 'text-danger'
                          : 'text-success'
                    }
                  >
                    •
                  </span>
                  {indicator}
                </li>
              ))}
            </ul>
          </div>

          {analysisResult.prediction && (
            <div className="mt-6 pt-6 border-t border-neutral-600">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-neutral-300">{t(language, 'label')}</div>
                  <div className="text-white font-bold">
                    {analysisResult.prediction.label}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-300">{t(language, 'raw_score')}</div>
                  <div className="text-white font-bold">
                    {(analysisResult.prediction.raw_score * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onDownload}
            className="bg-neutral-600 text-white py-4 rounded-lg font-semibold hover:bg-opacity-80 transition flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {t(language, 'download_report')}
          </button>
          <button
            onClick={onNewAnalysis}
            className="bg-primary text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {t(language, 'new_analysis')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
