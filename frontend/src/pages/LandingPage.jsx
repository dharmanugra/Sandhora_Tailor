import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Scissors, Sparkles, Award, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    
    return (
      <section ref={ref} className="py-32 px-6 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-black blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gray-800 blur-3xl" />
        </div>
        
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2
            className="font-serif text-6xl mb-8 text-black text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('about.title')}
          </motion.h2>
          
          <motion.p
            className="font-sans text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('about.description')}
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Scissors, key: 'tailoring' },
              { icon: Sparkles, key: 'materials' },
              { icon: Award, key: 'craftsmen' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black bg-opacity-10 flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-black" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-black">{t(`about.features.${item.key}.title`)}</h3>
                <p className="font-sans text-gray-600">{t(`about.features.${item.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  };
  
  const ServicesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    
    const services = [
      {
        key: 'suits',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'
      },
      {
        key: 'formal',
        image: 'https://images.unsplash.com/photo-1595777216528-071e0127ccf4?w=600&q=80'
      },
      {
        key: 'traditional',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80'
      }
    ];
    
    return (
      <section ref={ref} className="py-32 px-6 bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-serif text-6xl mb-6 text-black text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            className="font-sans text-lg text-gray-600 text-center mb-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('services.subtitle')}
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(`services.items.${service.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-3xl mb-3 text-black">{t(`services.items.${service.key}.title`)}</h3>
                  <p className="font-sans text-gray-600">{t(`services.items.${service.key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  };
  
  const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' }} />
        </div>
        
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-16 h-16 text-white mx-auto mb-8" />
          <h2 className="font-serif text-6xl mb-8 text-white">
            {t('cta.title')}
          </h2>
          <p className="font-sans text-xl text-gray-300 mb-12 leading-relaxed">
            {t('cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => navigate('/gallery')}
              className="bg-white hover:bg-gray-200 text-black font-sans font-medium text-base tracking-wider px-10 py-6 rounded transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              {t('cta.viewGallery')}
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-sans font-medium text-base tracking-wider px-10 py-6 rounded transition-all duration-300"
            >
              {t('cta.contactUs')}
            </Button>
          </div>
        </motion.div>
      </section>
    );
  };
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50" />
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #000 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #1a1a1a 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="font-serif text-8xl md:text-9xl mb-6 text-black tracking-tight">
              {t('hero.title')}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <p className="font-sans text-2xl md:text-3xl text-gray-600 tracking-wide mb-4">
              {t('hero.tagline')}
            </p>
            <p className="font-sans text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <Button
              onClick={() => navigate('/gallery')}
              className="bg-black hover:bg-gray-800 text-white font-sans font-medium text-lg tracking-widest px-12 py-7 rounded transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              {t('hero.cta')}
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.section>
      
      <AboutSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;