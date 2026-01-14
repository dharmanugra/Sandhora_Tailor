import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { contactInfo } from '../mock';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="!font-serif !text-7xl !mt-[24px] !mb-[24px] text-white">{t('contactPage.title')}</h1>
          <p className="font-sans text-xl text-gray-400">
            {t('contactPage.subtitle')}
          </p>
        </motion.div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Profile Photo - Circle */}
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://customer-assets.emergentagent.com/job_bespoke-couture/artifacts/lygobk59_3f2ddc1962982c146524170517f5effe.png"
              alt="Sandhora Tailor Team"
              className="w-64 h-64 object-cover rounded-full border-4 border-black shadow-2xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl mb-8 text-black text-center">{t('contactPage.visitTitle')}</h2>
            <p className="font-sans text-lg text-gray-600 mb-12 leading-relaxed text-center">
              {t('contactPage.visitDesc')}
            </p>
            
            <div className="space-y-8 mb-12">
              {/* WhatsApp Button */}
              <motion.a
                href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 p-6 bg-gray-100 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-300 group"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-black group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-black group-hover:text-white mb-2 transition-colors duration-300">
                    {t('contactPage.phone')} / WhatsApp
                  </h3>
                  <p className="font-sans text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                    {contactInfo.phone}
                  </p>
                  <p className="font-sans text-sm text-gray-500 group-hover:text-gray-400 mt-1 transition-colors duration-300">
                    Click to chat on WhatsApp
                  </p>
                </div>
              </motion.a>
              
              {/* Email Button */}
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="flex items-start gap-5 p-6 bg-gray-100 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-300 group"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-black group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-black group-hover:text-white mb-2 transition-colors duration-300">
                    {t('contactPage.email')}
                  </h3>
                  <p className="font-sans text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                    {contactInfo.email}
                  </p>
                  <p className="font-sans text-sm text-gray-500 group-hover:text-gray-400 mt-1 transition-colors duration-300">
                    Click to send email
                  </p>
                </div>
              </motion.a>
              
              {/* Location */}
              <motion.div
                className="flex items-start gap-5 p-6 bg-gray-100 rounded-lg border-2 border-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-black mb-2">{t('contactPage.location')}</h3>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Google Maps */}
            <motion.div
              className="rounded-lg overflow-hidden border-2 border-black shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.7969124424398!2d115.14927256359427!3d-8.634162499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2392c9b749041%3A0xd35cea3a8e3f4030!2sSandhora%20Tailor!5e0!3m2!1sen!2sid!4v1705234567890!5m2!1sen!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sandhora Tailor Location"
              ></iframe>
            </motion.div>
            
            {/* Opening Hours */}
            <motion.div
              className="mt-8 p-8 bg-gray-100 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="font-serif text-2xl mb-4 text-black text-center">{t('contactPage.hours')}</h3>
              <div className="space-y-2 font-sans text-gray-600 text-center">
                <p>{t('contactPage.hoursWeekday')}</p>
                <p>{t('contactPage.hoursWeekend')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
