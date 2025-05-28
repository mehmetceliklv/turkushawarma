import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-serif text-darkBlue">{t('about.title')}</h2>
          <p className="text-xl text-gray-600">{t('about.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-terracotta">{t('about.heritage')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('about.heritageText')}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-terracotta">{t('about.craft')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('about.craftText')}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-terracotta">{t('about.promise')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('about.promiseText')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/shot-scenic-city-view-taken-from-top-tower-istanbul-city.jpg" 
                alt="Istanbul city view" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg mt-8">
              <img 
                src="/images/pide-lahmajun-served-with-salad-greens-lemon-lentil-soup-ayran-min.jpg" 
                alt="Traditional Turkish food" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/red-flag-turkey-foreground-flying-seagulls-local-architectural-buildings.jpg" 
                alt="Turkish flag and architecture" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg mt-8">
              <img 
                src="/images/beyoglu-district-historic-architecture-galata-tower-medieval-landmark-istanbul-turkey.jpg" 
                alt="Galata Tower in Istanbul" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;