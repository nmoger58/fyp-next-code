'use client';
import React from 'react';
import {
  Shield,
  BarChart3,
  FileVideo,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {t} from '@/lib/translations-base';

const LandingPage = ({ onGetStarted }) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-neutral-600">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">{t(language, 'app_name')}</span>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
        >
          {t(language, 'get_started')}
        </button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            {t(language, 'landing_title')}
            <span className="text-primary"> {t(language, 'landing_title_highlight')}</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            {t(language, 'landing_subtitle')}
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
          >
            {t(language, 'start_analyzing')} <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-neutral-600 bg-opacity-30 p-8 rounded-xl border border-neutral-600">
            <div className="w-14 h-14 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t(language, 'feature_detection_title')}</h3>
            <p className="text-neutral-300">
              {t(language, 'feature_detection_desc')}
            </p>
          </div>

          <div className="bg-neutral-600 bg-opacity-30 p-8 rounded-xl border border-neutral-600">
            <div className="w-14 h-14 bg-success bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t(language, 'feature_accuracy_title')}</h3>
            <p className="text-neutral-300">
              {t(language, 'feature_accuracy_desc')}
            </p>
          </div>

          <div className="bg-neutral-600 bg-opacity-30 p-8 rounded-xl border border-neutral-600">
            <div className="w-14 h-14 bg-accent-ai bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
              <FileVideo className="w-7 h-7 text-accent-ai" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t(language, 'feature_formats_title')}</h3>
            <p className="text-neutral-300">
              {t(language, 'feature_formats_desc')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">127</div>
            <div className="text-neutral-300">{t(language, 'stat_videos_analyzed')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-success mb-2">99.2%</div>
            <div className="text-neutral-300">{t(language, 'stat_accuracy')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">&lt;3s</div>
            <div className="text-neutral-300">{t(language, 'stat_analysis_time')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-success mb-2">24/7</div>
            <div className="text-neutral-300">{t(language, 'stat_availability')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
