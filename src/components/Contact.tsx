import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-serif text-darkBlue">{t('contact.title')}</h2>
          <p className="text-xl text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.432259547116!2d24.19513667704019!3d56.94667497349481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfda22e73079%3A0xf8675999ba6c9614!2sAugusta%20Deglava%20iela%2069-k-4%2C%20Vidzemes%20priek%C5%A1pils%C4%93ta%2C%20R%C4%ABga%2C%20LV-1082!5e0!3m2!1sen!2slv!4v1710271547974!5m2!1sen!2slv&circle=56.94667497349481,24.19513667704019,50&markers=icon:https://maps.google.com/mapfiles/ms/icons/red-dot.png%7C56.94667497349481,24.19513667704019" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-terracotta p-3 rounded-full text-white mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2">{t('contact.address')}</h3>
                  <p className="text-gray-600">Augusta Deglava iela 69-k-4, Vidzemes priekšpilsēta, Rīga, LV-1082</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-terracotta p-3 rounded-full text-white mr-4">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2">{t('contact.phone')}</h3>
                  <p className="text-gray-600">+371 25699303</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-terracotta p-3 rounded-full text-white mr-4">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2">{t('contact.email')}</h3>
                  <p className="text-gray-600">info@turkugarsas.lv</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-terracotta p-3 rounded-full text-white mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2">{t('contact.hours')}</h3>
                  <div className="text-gray-600 space-y-1">
                    <p><span className="font-medium">{t('contact.mondayFriday')}:</span> 11:30 - 03:00</p>
                    <p><span className="font-medium">{t('contact.saturday')}:</span> 11:30 - 00:00</p>
                    <p><span className="font-medium">{t('contact.sunday')}:</span> 11:30 - 00:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;