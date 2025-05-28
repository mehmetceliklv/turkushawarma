import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: '/images/turkish-adana-kebab-serving-plate-with-vegetables-bulgur-lavash-bread_711700-24409.avif',
    alt: 'Turkish Adana kebab with vegetables'
  },
  {
    id: 2,
    src: '/images/fried-chicken-with-lule-kebab-sliced-onion.jpg',
    alt: 'Chicken kebab with onions'
  },
  {
    id: 3,
    src: '/images/turkish-doner-tandir-bread-inside-white-plate_114579-3006.jpg',
    alt: 'Turkish doner in bread'
  },
  {
    id: 4,
    src: '/images/mixed-grilled-foods-with-meat-vegetables_114579-3152.avif',
    alt: 'Mixed grilled meats'
  },
  {
    id: 5,
    src: '/images/chicken-shawarmin-pitwith-french-fries-ketchup-mayo-lettuce-table_140725-10901.avif',
    alt: 'Chicken shawarma with fries'
  },
  {
    id: 6,
    src: '/images/side-view-doner-pita-with-french-fries-fresh-cucumber-tomato_141793-4970.avif',
    alt: 'Doner kebab with fresh vegetables'
  }
];

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const currentImage = galleryImages.find(img => img.id === selectedImage);

  return (
    <section id="gallery" className="py-20 bg-darkBlue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-serif">{t('gallery.title')}</h2>
          <p className="text-xl text-gray-300">{t('gallery.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square"
              onClick={() => openLightbox(image.id)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-darkBlue">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl max-h-[90vh]">
            <img 
              src={currentImage.src} 
              alt={currentImage.alt} 
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;