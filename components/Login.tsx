import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, RefreshCw, KeyRound, Building2 } from 'lucide-react';
import { Role } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  role: Role;
  onLogin: (id: string) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ role, onLogin, onBack }) => {
  const { t } = useLanguage();
  const [identifier, setIdentifier] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaValue) {
      setError('Invalid Captcha. Please try again.');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    
    if (!identifier.trim()) {
      setError('Please enter your credentials.');
      return;
    }

    onLogin(identifier);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
            alt="College Background" 
            className="w-full h-full object-cover opacity-10 blur-sm"
         />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative z-10 border border-slate-200">
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${role === Role.ADMIN ? 'bg-indigo-100' : 'bg-emerald-100'}`}>
            {role === Role.ADMIN ? (
              <Building2 className="w-8 h-8 text-indigo-600" />
            ) : (
              <User className="w-8 h-8 text-emerald-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {role === Role.ADMIN ? t('loginTitleStaff') : t('loginTitleStudent')}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {t('loginSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {role === Role.ADMIN ? t('loginIdLabelStaff') : t('loginIdLabelStudent')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={role === Role.ADMIN ? 'e.g. STAFF01' : 'e.g. CS2023001'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('loginCaptchaLabel')}
            </label>
            <div className="flex gap-4 items-center mb-2">
               <div className="flex-1 bg-slate-100 py-3 px-4 rounded-lg border border-slate-300 text-center font-mono text-xl tracking-widest font-bold text-slate-600 select-none">
                  {captchaValue}
               </div>
               <button 
                  type="button" 
                  onClick={generateCaptcha}
                  className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors"
                  title={t('loginCaptchaRefresh')}
                >
                  <RefreshCw className="w-5 h-5" />
               </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('loginInputPlaceholder')}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-white font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 
              ${role === Role.ADMIN 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            {t('loginBtn')}
          </button>

          <div className="text-center">
             <button type="button" onClick={onBack} className="text-sm text-slate-500 hover:text-slate-800">
                &larr; {t('backHome')}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
