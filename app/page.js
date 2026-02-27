'use client';
import React, { useState, useEffect } from 'react';
import LandingPage from '@/Components/LandingPage';
import AuthPage from '@/Components/AuthPage';
import Dashboard from '@/Components/Dashboard';
import ReadyPage from '@/Components/ReadyPage';
import ResultPage from '@/Components/ResultPage';
import LanguageSelector from '@/Components/LanguageSelector';
import { LanguageProvider } from '@/context/LanguageContext';
import { apiService } from '@/lib/api';

const PageContent = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        await apiService.checkHealth();
      } catch (err) {
        console.warn('Backend health check failed:', err);
      }
    };
    checkBackendHealth();
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setError(null);
    setCurrentPage('ready');
  };

  const handleStartAnalysis = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await apiService.predictVideo(uploadedFile);
      setAnalysisResult(result);
      setCurrentPage('result');
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setCurrentPage('ready');
      alert('Error: ' + (err.message || 'Analysis failed'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCancel = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setError(null);
    setCurrentPage('dashboard');
  };

  const handleNewAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setError(null);
    setCurrentPage('dashboard');
  };

  const handleDownloadReport = () => {
    // Create a simple text report
    const report = `
DEEPFAKE DETECTION REPORT
=========================
File: ${uploadedFile?.name}
Size: ${uploadedFile ? (uploadedFile.size / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A'}
Timestamp: ${new Date().toLocaleString()}

ANALYSIS RESULTS
================
${
  analysisResult?.error
    ? `Error: ${analysisResult.error}`
    : `Status: ${analysisResult?.status}
Label: ${analysisResult?.prediction?.label}
Confidence: ${(analysisResult?.prediction?.confidence * 100).toFixed(2)}%
Is Deepfake: ${analysisResult?.prediction?.is_deepfake ? 'Yes' : 'No'}
Raw Score: ${(analysisResult?.prediction?.raw_score * 100).toFixed(2)}%`
}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      '--primary': '#4CADE4',
      '--primary-dark': '#063356',
      '--neutral-100': '#EEF3F6',
      '--neutral-300': '#C2C8CE',
      '--neutral-600': '#303235',
      '--neutral-900': '#1A1D1F',
      '--accent-ai': '#7A5CFF',
      '--success': '#12C99B',
      '--danger': '#FF4C4C',
      '--warning': '#F4AA2A'
    }}>
      <style>{`
        .bg-primary { background-color: var(--primary); }
        .bg-primary-dark { background-color: var(--primary-dark); }
        .bg-neutral-100 { background-color: var(--neutral-100); }
        .bg-neutral-300 { background-color: var(--neutral-300); }
        .bg-neutral-600 { background-color: var(--neutral-600); }
        .bg-neutral-900 { background-color: var(--neutral-900); }
        .bg-accent-ai { background-color: var(--accent-ai); }
        .bg-success { background-color: var(--success); }
        .bg-danger { background-color: var(--danger); }
        .bg-warning { background-color: var(--warning); }
        
        .text-primary { color: var(--primary); }
        .text-success { color: var(--success); }
        .text-danger { color: var(--danger); }
        .text-accent-ai { color: var(--accent-ai); }
        .text-neutral-300 { color: var(--neutral-300); }
        
        .border-primary { border-color: var(--primary); }
        .border-success { border-color: var(--success); }
        .border-danger { border-color: var(--danger); }
        .border-neutral-600 { border-color: var(--neutral-600); }
        .border-neutral-300 { border-color: var(--neutral-300); }
      `}</style>
      
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
        <LanguageSelector />
      </div>
      
      {currentPage === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {currentPage === 'auth' && <AuthPage onLogin={handleLogin} onSignupSuccess={() => {}} />}
      {currentPage === 'dashboard' && <Dashboard onFileSelect={handleFileSelect} />}
      {currentPage === 'ready' && (
        <ReadyPage
          file={uploadedFile}
          onStartAnalysis={handleStartAnalysis}
          onCancel={handleCancel}
          isLoading={isAnalyzing}
        />
      )}
      {currentPage === 'result' && (
        <ResultPage
          file={uploadedFile}
          analysisResult={analysisResult}
          onNewAnalysis={handleNewAnalysis}
          onDownload={handleDownloadReport}
        />
      )}
    </div>
  );
};

// Wrap with LanguageProvider
export default function page() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}