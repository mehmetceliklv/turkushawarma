import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang: 'lv' | 'ru' | 'en' | 'tr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { 
      code: 'lv', 
      name: 'Latviešu', 
      flag: 'https://flagcdn.com/w40/lv.png'
    },
    { 
      code: 'ru', 
      name: 'Русский', 
      flag: 'https://flagcdn.com/w40/ru.png'
    },
    { 
      code: 'en', 
      name: 'English', 
      flag: 'https://flagcdn.com/w40/gb.png'
    },
    { 
      code: 'tr', 
      name: 'Türkçe', 
      flag: 'https://flagcdn.com/w40/tr.png'
    },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 p-2 rounded-full ${
          isScrolled ? 'text-darkBlue hover:bg-gray-100' : 'text-white hover:bg-white/10'
        }`}
      >
        <Globe size={20} />
        <img 
          src={currentLanguage?.flag} 
          alt={`${currentLanguage?.name} flag`}
          className="w-6 h-4 object-cover rounded"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code as 'lv' | 'ru' | 'en' | 'tr')}
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 ${
                language === lang.code ? 'bg-gray-100' : ''
              }`}
            >
              <img 
                src={lang.flag} 
                alt={`${lang.name} flag`}
                className="w-6 h-4 object-cover rounded"
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;