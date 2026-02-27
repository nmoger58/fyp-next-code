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
import { t } from '@/lib/translations';

const AuthPage = ({
  onLogin,
  onSignupSuccess,
}) => {
  const { language } = useLanguage();
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.email === 'nmoger58' &&
      loginData.password === 'Nagu@123'
    ) {
      onLogin();
    } else {
      alert(t(language, 'invalid_credentials'));
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.password === signupData.confirmPassword) {
      setAuthMode('login');
      alert(t(language, 'account_created'));
    } else {
      alert(t(language, 'passwords_mismatch'));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">{t(language, 'app_name')}</h1>
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              authMode === 'login'
                ? 'bg-primary text-white'
                : 'bg-neutral-600 text-neutral-300'
            }`}
          >
            {t(language, 'login')}
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              authMode === 'signup'
                ? 'bg-primary text-white'
                : 'bg-neutral-600 text-neutral-300'
            }`}
          >
            {t(language, 'signup')}
          </button>
        </div>

        {authMode === 'login' ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{t(language, 'welcome_back')}</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t(language, 'email_address')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="text"
                    placeholder={t(language, 'email_placeholder')}
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
                  {t(language, 'password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t(language, 'password_placeholder')}
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

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{t(language, 'remember_me')}</span>
                </label>
                <button type="button" className="text-sm text-primary hover:underline">
                  {t(language, 'forgot_password')}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                {t(language, 'sign_in')} <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-neutral-300 text-sm mt-4">
                {t(language, 'no_account')}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-primary hover:underline"
                >
                  {t(language, 'signup')}
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{t(language, 'create_account')}</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="text-neutral-300 text-sm mb-2 block">
                  {t(language, 'full_name')}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="text"
                    placeholder={t(language, 'full_name_placeholder')}
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
                  {t(language, 'email_address')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="email"
                    placeholder={t(language, 'email_placeholder')}
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
                  {t(language, 'password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t(language, 'password_placeholder')}
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
                  {t(language, 'confirm_password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                  <input
                    type="password"
                    placeholder={t(language, 'password_placeholder')}
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
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                {t(language, 'create_account_btn')} <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-neutral-300 text-sm mt-4">
                {t(language, 'have_account')}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-primary hover:underline"
                >
                  {t(language, 'login')}
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
