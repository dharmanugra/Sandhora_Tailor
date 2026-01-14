import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZipperOpeningAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('initial'); // initial, unzipping, opening, complete
  
  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => setStage('unzipping'), 500);
    const timer2 = setTimeout(() => setStage('opening'), 3000);
    const timer3 = setTimeout(() => {
      setStage('complete');
      onComplete();
    }, 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);
  
  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Black Fabric Background */}
          <div className="absolute inset-0 bg-charcoal">
            {/* Fabric texture overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />
          </div>
          
          {/* Logo Text - Fades in during unzipping */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'unzipping' ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-center">
              <motion.h1
                className="font-serif text-6xl md:text-8xl text-cream-white mb-4 tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Sandhora Tailor
              </motion.h1>
              <motion.p
                className="font-sans text-xl md:text-2xl text-warm-sage tracking-widest uppercase"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Bespoke Elegance
              </motion.p>
            </div>
          </motion.div>
          
          {/* Zipper Line - Center top */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-warm-sage via-warm-gray to-warm-sage"
            style={{
              top: 0,
              boxShadow: '0 0 20px rgba(196, 181, 160, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)'
            }}
            initial={{ height: 0 }}
            animate={{
              height: stage === 'unzipping' || stage === 'opening' ? '100%' : 0
            }}
            transition={{
              duration: 2.5,
              ease: [0.43, 0.13, 0.23, 0.96] // Custom cubic-bezier for smooth motion
            }}
          />
          
          {/* Zipper Pull - Animated downward */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-8 h-12 z-20"
            initial={{ top: '-50px' }}
            animate={{
              top: stage === 'unzipping' || stage === 'opening' ? '100%' : '-50px'
            }}
            transition={{
              duration: 2.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-warm-sage to-warm-gray rounded-full shadow-2xl border border-cream-white border-opacity-50">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-transparent opacity-40" />
            </div>
          </motion.div>
          
          {/* Left Fabric Panel - Opens left */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-charcoal overflow-hidden"
            initial={{ x: 0 }}
            animate={{
              x: stage === 'opening' ? '-100%' : 0
            }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0
            }}
          >
            {/* Fabric texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />
            {/* Inner shadow edge */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent opacity-60"
              animate={{
                scaleX: stage === 'opening' ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>
          
          {/* Right Fabric Panel - Opens right */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-charcoal overflow-hidden"
            initial={{ x: 0 }}
            animate={{
              x: stage === 'opening' ? '100%' : 0
            }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0
            }}
          >
            {/* Fabric texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />
            {/* Inner shadow edge */}
            <motion.div
              className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent opacity-60"
              animate={{
                scaleX: stage === 'opening' ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZipperOpeningAnimation;