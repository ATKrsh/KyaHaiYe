import React from 'react';
import { TargetLanguage } from '../types/prescription';
import { Stethoscope, Languages } from 'lucide-react';

interface TitleBarProps {
  language: TargetLanguage;
  onLanguageChange: (lang: TargetLanguage) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  language,
  onLanguageChange
}) => {
  return (
    <header className="win-titlebar">
      <div className="titlebar-brand">
        <div className="brand-logo">
          <Stethoscope size={22} />
        </div>
        <div className="brand-text-container">
          <span className="brand-name">KyaHaiYe</span>
          <span className="brand-badge">
            {language === 'hi' ? 'डॉक्टर पर्चा डिकोडर' : 'Doctor Prescription Reader'}
          </span>
        </div>
      </div>

      <div className="titlebar-actions">
        {/* Simple 1-Click Language Selector */}
        <div className="lang-switcher-simple">
          <Languages size={18} className="text-accent" />
          <button
            className={`lang-btn-large ${language === 'hi' ? 'active' : ''}`}
            onClick={() => onLanguageChange('hi')}
          >
            हिन्दी
          </button>
          <button
            className={`lang-btn-large ${language === 'en' ? 'active' : ''}`}
            onClick={() => onLanguageChange('en')}
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
};
