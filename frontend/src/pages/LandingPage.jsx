import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Scissors, Sparkles, Award, Heart } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    
    return (
      <section ref={ref} className="py-32 px-6 bg-soft-gray relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-warm-sage blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-rich-chocolate blur-3xl" />
        </div>
        
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2
            className="font-serif text-6xl mb-8 text-charcoal text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Craftsmanship Meets Elegance
          </motion.h2>
          
          <motion.p
            className="font-sans text-lg text-warm-gray max-w-3xl mx-auto text-center leading-relaxed mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Sandhora Tailor, we believe that every garment tells a story. With decades of expertise 
            and passion for perfection, we transform fabric into timeless pieces that celebrate your 
            unique style and personality.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Scissors, title: 'Bespoke Tailoring', desc: 'Each piece crafted to your exact measurements' },
              { icon: Sparkles, title: 'Premium Materials', desc: 'Finest fabrics sourced from around the world' },
              { icon: Award, title: 'Master Craftsmen', desc: 'Decades of experience in traditional techniques' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warm-sage bg-opacity-20 flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-rich-chocolate" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-charcoal">{item.title}</h3>
                <p className="font-sans text-warm-gray">{item.desc}</p>
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
        title: 'Custom Suits',
        desc: 'Impeccably tailored suits that define sophistication',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'
      },
      {
        title: 'Formal Wear',
        desc: 'Elegant attire for life\'s most important moments',
        image: 'https://images.unsplash.com/photo-1595777216528-071e0127ccf4?w=600&q=80'
      },
      {
        title: 'Traditional Wear',
        desc: 'Honoring heritage with contemporary elegance',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80'
      }
    ];
    
    return (
      <section ref={ref} className="py-32 px-6 bg-cream-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-serif text-6xl mb-6 text-charcoal text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="font-sans text-lg text-warm-gray text-center mb-20 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From bespoke suits to traditional attire, every creation is a masterpiece
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-soft-gray cursor-pointer"
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-3xl mb-3 text-charcoal">{service.title}</h3>
                  <p className="font-sans text-warm-gray">{service.desc}</p>
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
      <section ref={ref} className="py-32 px-6 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-warm-sage" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' }} />
        </div>
        
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-16 h-16 text-warm-sage mx-auto mb-8" />
          <h2 className="font-serif text-6xl mb-8 text-cream-white">
            Begin Your Journey
          </h2>
          <p className="font-sans text-xl text-soft-gray mb-12 leading-relaxed">
            Experience the art of bespoke tailoring. Every stitch, every detail, 
            crafted exclusively for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => navigate('/gallery')}
              className="bg-warm-sage hover:bg-opacity-90 text-cream-white font-sans font-medium text-base tracking-wider px-10 py-6 rounded transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              VIEW GALLERY
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              className="border-2 border-cream-white text-cream-white hover:bg-cream-white hover:text-charcoal font-sans font-medium text-base tracking-wider px-10 py-6 rounded transition-all duration-300"
            >
              CONTACT US
            </Button>
          </div>
        </motion.div>
      </section>
    );
  };
  
  return (
    <div className="bg-cream-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-soft-gray via-cream-white to-soft-taupe" />
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, var(--warm-sage) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, var(--rich-chocolate) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
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
            <h1 className="font-serif text-8xl md:text-9xl mb-6 text-charcoal tracking-tight">
              Sandhora Tailor
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <p className="font-sans text-2xl md:text-3xl text-warm-gray tracking-wide mb-4">
              Crafted Precision. Timeless Elegance.
            </p>
            <p className="font-sans text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed">
              Where traditional craftsmanship meets contemporary luxury in the heart of Bali
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
              className="bg-warm-sage hover:bg-opacity-90 text-cream-white font-sans font-medium text-lg tracking-widest px-12 py-7 rounded transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              EXPLORE OUR WORK
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-warm-gray rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-2 bg-warm-gray rounded-full"
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