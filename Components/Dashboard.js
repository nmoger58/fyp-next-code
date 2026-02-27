'use client';
import React from 'react';
import {
  Shield,
  Upload,
  BarChart3,
  Clock,
  FileVideo,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

const Dashboard = ({ onFileSelect }) => {
  const { language } = useLanguage();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <nav className="bg-primary-dark border-b border-neutral-600 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <div className="text-white font-bold text-lg">{t(language, 'app_name')}</div>
            <div className="text-neutral-300 text-xs">{t(language, 'tagline')}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-neutral-300 hover:text-white">
            <BarChart3 className="w-5 h-5" />
            <span>{t(language, 'history')}</span>
          </button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-neutral-600 rounded-xl p-8 mb-8">
          <h2 className="text-white text-2xl font-bold mb-2">
            {t(language, 'upload_video')}
          </h2>
          <p className="text-neutral-300 mb-6">
            {t(language, 'upload_subtitle')}
          </p>

          <label className="border-2 border-dashed border-neutral-300 rounded-xl p-16 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
            <Upload className="w-16 h-16 text-primary mb-4" />
            <p className="text-white font-semibold mb-2">
              {t(language, 'drop_video')}
            </p>
            <p className="text-neutral-300 text-sm">
              {t(language, 'supported_formats')}
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="bg-neutral-600 rounded-xl p-8 mb-8">
          <h3 className="text-white text-xl font-bold mb-4">
            {t(language, 'analysis_statistics')}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-300">{t(language, 'videos_analyzed')}</span>
                <span className="text-white font-bold">127</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-300">{t(language, 'detection_accuracy')}</span>
                <span className="text-success font-bold">99.2%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full"
                  style={{ width: '99.2%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-600 rounded-xl p-8">
          <h3 className="text-white text-xl font-bold mb-4">{t(language, 'recent_scans')}</h3>
          <div className="space-y-3">
            {[
              {
                name: 'interview_2024.mp4',
                time: '2 hours ago',
                status: 'authentic',
              },
              {
                name: 'conference_talk.mp4',
                time: '5 hours ago',
                status: 'deepfake',
              },
              {
                name: 'news_segment.avi',
                time: '1 day ago',
                status: 'authentic',
              },
            ].map((scan, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileVideo className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-white font-semibold">{scan.name}</div>
                    <div className="text-neutral-300 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {scan.time}
                    </div>
                  </div>
                </div>
                {scan.status === 'authentic' ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <XCircle className="w-6 h-6 text-danger" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
