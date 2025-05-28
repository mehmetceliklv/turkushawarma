import React, { useState, useEffect } from 'react';
import { MenuIcon, X, ShoppingCart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src="/images/Turkish_Shawarma_Logo_with_Warm_Accents-removebg-preview.png" 
            alt="TurkuGaršas Logo" 
            className="h-24 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className={`nav-link ${isScrolled ? 'text-darkBlue' : 'text-white'}`}>
            {t('nav.home')}
          </a>
          <a href="#menu" className={`nav-link ${isScrolled ? 'text-darkBlue' : 'text-white'}`}>
            {t('nav.menu')}
          </a>
          <a href="#about" className={`nav-link ${isScrolled ? 'text-darkBlue' : 'text-white'}`}>
            {t('nav.about')}
          </a>
          <a href="#gallery" className={`nav-link ${isScrolled ? 'text-darkBlue' : 'text-white'}`}>
            {t('nav.gallery')}
          </a>
          <a href="#contact" className={`nav-link ${isScrolled ? 'text-darkBlue' : 'text-white'}`}>
            {t('nav.contact')}
          </a>
          <LanguageSwitcher isScrolled={isScrolled} />
          <button 
            onClick={onCartClick}
            className={`relative p-2 rounded-full ${
              isScrolled ? 'text-darkBlue hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher isScrolled={isScrolled} />
          <button 
            onClick={onCartClick}
            className={`relative p-2 mx-2 rounded-full ${
              isScrolled ? 'text-darkBlue hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={toggleMobileMenu} className="ml-4">
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-darkBlue' : 'text-white'} size={24} />
            ) : (
              <MenuIcon className={isScrolled ? 'text-darkBlue' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="nav-link text-darkBlue" onClick={toggleMobileMenu}>
                {t('nav.home')}
              </a>
              <a href="#menu" className="nav-link text-darkBlue" onClick={toggleMobileMenu}>
                {t('nav.menu')}
              </a>
              <a href="#about" className="nav-link text-darkBlue" onClick={toggleMobileMenu}>
                {t('nav.about')}
              </a>
              <a href="#gallery" className="nav-link text-darkBlue" onClick={toggleMobileMenu}>
                {t('nav.gallery')}
              </a>
              <a href="#contact" className="nav-link text-darkBlue" onClick={toggleMobileMenu}>
                {t('nav.contact')}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;