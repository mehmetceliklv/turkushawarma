import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = [
    "/images/pide-lahmajun-served-with-salad-greens-lemon-lentil-soup-ayran-min.jpg",
    "/images/wide-selection-eastern-oriental-foods-rustic-plates-table-min.jpg",
    "/images/top-view-lahmajun-with-meat-parsley-tomatoes-lemon-tray-min.jpg"
  ];

  // Preload all images before showing any content
  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error('Error preloading images:', err));
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Match this with the CSS transition duration
    }, 9000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <section className="relative h-screen bg-darkBlue">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </section>
    );
  }

  const nextImageIndex = (currentImageIndex + 1) % images.length;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Current Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          backgroundImage: `url("${images[currentImageIndex]}")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Next Image (preloaded and ready) */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          backgroundImage: `url("${images[nextImageIndex]}")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl text-white space-y-6 mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 animate-fade-in-delay">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-delay-2">
            <a
              href="#menu"
              className="px-8 py-3 bg-terracotta text-white rounded-full text-lg font-medium hover:bg-terracotta-dark transition-colors shadow-lg"
            >
              {t('hero.viewMenu')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;