import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkBlue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-script font-bold text-terracotta">TurkuShawarma</h3>
            <p className="text-gray-300 mb-4">
              Autentiska turku virtuve Rīgas sirdī. Mēs piedāvājam tradicionālus ēdienus, kas gatavoti pēc senām receptēm.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-terracotta transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-terracotta transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-terracotta transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#menu" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.menu')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact.hours')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-medium">{t('contact.mondayFriday')}:</span> 11:30 - 03:00
              </li>
              <li>
                <span className="font-medium">{t('contact.saturday')}:</span> 11:30 - 00:00
              </li>
              <li>
                <span className="font-medium">{t('contact.sunday')}:</span> 11:30 - 00:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} TurkuShawarma. {t('footer.rights')}.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;