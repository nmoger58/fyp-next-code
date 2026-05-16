'use client';
import React, { useState } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { apiService } from '@/lib/api';

const AuthPage = ({
  onLogin,
  onSignupSuccess,
}) => {
  const { language, t } = useLanguage();
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.login(loginData.email, loginData.password);
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        // Store basic user info so Dashboard can show it immediately
        localStorage.setItem('user_info', JSON.stringify({
          username: data.username,
          full_name: data.full_name || '',
          role: data.role,
        }));
        onLogin();
      }
    } catch (err) {
      setError(err.message || t('invalid_credentials'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (signupData.password !== signupData.confirmPassword) {
      setError(t('passwords_mismatch'));
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiService.signup({
        username: signupData.email,
        password: signupData.password,
        full_name: signupData.fullName,
      });
      // Auto-login after successful signup
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_info', JSON.stringify({
          username: data.username,
          full_name: data.full_name || signupData.fullName || '',
          role: data.role,
        }));
        onLogin();
      } else {
        // Fallback: go to login page
        setAuthMode('login');
        alert(t('account_created'));
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">{t('app_name')}</h1>
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${authMode === 'login'
                ? 'bg-primary text-white'
                : 'bg-neutral-600 text-neutral-300'
              }`}
          >
            {t('login')}
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${authMode === 'signup'
                ? 'bg-primary text-white'
                : 'bg-neutral-600 text-neutral-300'
              }`}
          >
            {t('signup')}
          </button>
        </div>

        {authMode === 'login' ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{t('welcome_back')}</h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t('email_address')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="text"
                    placeholder={t('email_placeholder')}
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full bg-neutral-600 text-white pl-12 pr-4 py-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t('password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password_placeholder')}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full bg-neutral-600 text-white pl-12 pr-12 py-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : t('sign_in')} <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-neutral-300 text-sm mt-4">
                {t('no_account')}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-primary hover:underline"
                >
                  {t('signup')}
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{t('create_account')}</h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t('full_name')}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="text"
                    placeholder={t('full_name_placeholder')}
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full bg-neutral-600 text-white pl-12 pr-4 py-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t('email_address')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="email"
                    placeholder={t('email_placeholder')}
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    className="w-full bg-neutral-600 text-white pl-12 pr-4 py-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t('password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password_placeholder')}
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    className="w-full bg-neutral-600 text-white pl-12 pr-12 py-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t('confirm_password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="password"
                    placeholder={t('password_placeholder')}
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-neutral-600 text-white pl-12 pr-4 py-3 rounded-lg border border-transparent focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : t('create_account_btn')} <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-neutral-300 text-sm mt-4">
                {t('have_account')}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-primary hover:underline"
                >
                  {t('login')}
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
