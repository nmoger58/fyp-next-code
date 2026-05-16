'use client';
import React, { useState, useEffect } from 'react';
import {
  Shield,
  Upload,
  BarChart3,
  Clock,
  FileVideo,
  CheckCircle,
  XCircle,
  LogOut,
  Loader2,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { apiService } from '@/lib/api';

const Dashboard = ({ onFileSelect, onLogout, user }) => {
  const { language, t } = useLanguage();
  const recentScansRef = React.useRef(null);

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [clearing, setClearing] = useState(false);

  // Fetch real scan history from MongoDB on mount
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const data = await apiService.getHistory();
      setHistory(data.history || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setHistoryError('Could not load history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    if (!confirm('Clear all your scan history? This cannot be undone.')) return;
    setClearing(true);
    try {
      await apiService.clearHistory();
      setHistory([]);
    } catch (err) {
      alert('Failed to clear history.');
    } finally {
      setClearing(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(/[\s.@]/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const scrollToHistory = () => {
    recentScansRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  /** Format an ISO date string into a friendly relative/absolute label */
  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  // Compute stats from real history
  const totalScans = history.length;
  const deepfakeCount = history.filter((s) => s.is_deepfake).length;
  const realCount = totalScans - deepfakeCount;

  const displayName = user?.full_name || user?.username || user?.email || 'User';
  const displayUsername = user?.username || user?.email || 'User';

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* ── Navbar ── */}
      <nav className="bg-primary-dark border-b border-neutral-600 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <div className="text-white font-bold text-lg">{t('app_name')}</div>
            <div className="text-neutral-300 text-xs">{t('tagline')}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToHistory}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition"
          >
            <BarChart3 className="w-5 h-5" />
            <span>{t('history')}</span>
          </button>

          {/* User avatar with tooltip */}
          <div
            title={displayUsername}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold cursor-default"
          >
            {getInitials(displayName)}
          </div>

          <button
            onClick={onLogout}
            title="Logout"
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-8">
        {/* ── Upload Card ── */}
        <div className="bg-neutral-600 rounded-xl p-8 mb-8">
          <h2 className="text-white text-2xl font-bold mb-2">
            {t('upload_video')}
          </h2>
          <p className="text-neutral-300 mb-6">{t('upload_subtitle')}</p>

          <label className="border-2 border-dashed border-neutral-300 rounded-xl p-16 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
            <Upload className="w-16 h-16 text-primary mb-4" />
            <p className="text-white font-semibold mb-2">{t('drop_video')}</p>
            <p className="text-neutral-300 text-sm">{t('supported_formats')}</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* ── Stats Card (real data) ── */}
        <div className="bg-neutral-600 rounded-xl p-8 mb-8">
          <h3 className="text-white text-xl font-bold mb-4">
            {t('analysis_statistics')}
          </h3>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-neutral-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{totalScans}</div>
              <div className="text-neutral-300 text-sm">{t('videos_analyzed')}</div>
            </div>
            <div className="bg-neutral-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-danger mb-1">{deepfakeCount}</div>
              <div className="text-neutral-300 text-sm">Deepfakes Detected</div>
            </div>
            <div className="bg-neutral-900 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-success mb-1">{realCount}</div>
              <div className="text-neutral-300 text-sm">Authentic Videos</div>
            </div>
          </div>

          {totalScans > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-300">Deepfake Rate</span>
                <span className="text-white font-bold">
                  {((deepfakeCount / totalScans) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-2">
                <div
                  className="bg-danger h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(deepfakeCount / totalScans) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Scan History (real data from MongoDB) ── */}
        <div ref={recentScansRef} className="bg-neutral-600 rounded-xl p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl font-bold">{t('recent_scans')}</h3>
            <div className="flex gap-2">
              <button
                onClick={fetchHistory}
                disabled={historyLoading}
                title="Refresh"
                className="text-neutral-300 hover:text-white transition p-1"
              >
                <RefreshCw className={`w-5 h-5 ${historyLoading ? 'animate-spin' : ''}`} />
              </button>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  disabled={clearing}
                  title="Clear all history"
                  className="text-neutral-300 hover:text-danger transition p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Loading state */}
          {historyLoading && (
            <div className="flex items-center justify-center py-10 gap-3 text-neutral-300">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading history…</span>
            </div>
          )}

          {/* Error state */}
          {!historyLoading && historyError && (
            <div className="text-danger text-sm text-center py-6">{historyError}</div>
          )}

          {/* Empty state */}
          {!historyLoading && !historyError && history.length === 0 && (
            <div className="text-center py-10">
              <FileVideo className="w-12 h-12 text-neutral-300 mx-auto mb-3 opacity-50" />
              <p className="text-neutral-300">No scans yet. Upload a video to get started!</p>
            </div>
          )}

          {/* History list */}
          {!historyLoading && !historyError && history.length > 0 && (
            <div className="space-y-3">
              {history.map((scan, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileVideo className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-white font-semibold truncate" title={scan.filename}>
                        {scan.filename}
                      </div>
                      <div className="text-neutral-300 text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(scan.analyzed_at)}</span>
                        <span className="text-xs opacity-60">
                          · {(scan.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        scan.is_deepfake
                          ? 'bg-danger/20 text-danger'
                          : 'bg-success/20 text-success'
                      }`}
                    >
                      {scan.label}
                    </span>
                    {scan.is_deepfake ? (
                      <XCircle className="w-6 h-6 text-danger" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
