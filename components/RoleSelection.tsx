import React from 'react';
import { UserCog, GraduationCap, Building2, BookOpen } from 'lucide-react';
import { ViewState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface RoleSelectionProps {
  onNavigate: (view: ViewState) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-80px)] relative flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop" 
            alt="College Campus" 
            className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {t('welcome')}
        </h1>
        <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          {t('welcomeSubtitle')}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        
        {/* About Card */}
        <button
          onClick={() => onNavigate('COLLEGE_DETAILS')}
          className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 group text-center border-t-4 border-amber-500"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-amber-200 transition-colors">
            <Building2 className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t('aboutBtn')}</h2>
          <p className="text-sm text-slate-600">{t('aboutDesc')}</p>
        </button>

         {/* Admissions Card */}
         <button
          onClick={() => onNavigate('ADMISSIONS')}
          className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 group text-center border-t-4 border-blue-500"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
            <BookOpen className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t('admissionsBtn')}</h2>
          <p className="text-sm text-slate-600">{t('admissionsDesc')}</p>
        </button>

        {/* Student Login */}
        <button
          onClick={() => onNavigate('LOGIN_STUDENT')}
          className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 group text-center border-t-4 border-emerald-500"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-emerald-200 transition-colors">
            <GraduationCap className="w-8 h-8 text-emerald-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t('studentLoginBtn')}</h2>
          <p className="text-sm text-slate-600">{t('studentLoginDesc')}</p>
        </button>

        {/* Staff Login */}
        <button
          onClick={() => onNavigate('LOGIN_STAFF')}
          className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 group text-center border-t-4 border-indigo-500"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-indigo-200 transition-colors">
            <UserCog className="w-8 h-8 text-indigo-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t('staffLoginBtn')}</h2>
          <p className="text-sm text-slate-600">{t('staffLoginDesc')}</p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
