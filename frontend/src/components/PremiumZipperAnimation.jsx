import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const PremiumZipperAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showBranding, setShowBranding] = useState(false);
  const [complete, setComplete] = useState(false);
  
  const progressValue = useMotionValue(0);
  
  useEffect(() => {
    // Start animation after brief delay
    const startTimer = setTimeout(() => {
      // Animate progress with custom easing (mimics fabric tension)
      animate(progressValue, 1, {
        duration: 3.5,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic-bezier
        onUpdate: (latest) => {
          setProgress(latest);
          
          // Show branding at 40%
          if (latest >= 0.4 && !showBranding) {
            setShowBranding(true);
          }
        },
        onComplete: () => {
          setTimeout(() => {
            setComplete(true);
            onComplete();
          }, 600);
        }
      });
    }, 300);
    
    return () => clearTimeout(startTimer);
  }, [progressValue, onComplete, showBranding]);
  
  if (complete) return null;
  
  // Calculate zipper pull position
  const zipperY = progress * 100;
  
  // Calculate fabric separation
  const separationLeft = progress * -50;
  const separationRight = progress * 50;
  
  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Left fabric panel */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full origin-right"
        style={{
          x: `${separationLeft}%`,
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2C2C2C 100%)',
        }}
      >
        {/* Fabric texture overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
            backgroundSize: '4px 4px',
          }}
        />
        
        {/* Fabric edge curl effect */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-full"
          style={{
            background: `linear-gradient(to left, 
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.4) 30%,
              transparent 100%)`,
            opacity: progress,
            transform: `scaleX(${1 + progress * 0.3})`
          }}
        />
        
        {/* Wrinkle effects near zipper */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`wrinkle-left-${i}`}
            className="absolute right-0 w-2 h-12"
            style={{
              top: `${i * 5}%`,
              background: 'rgba(0,0,0,0.3)',
              filter: 'blur(2px)',
              transformOrigin: 'right',
              scaleX: progress > (i * 0.05) ? 1 - (progress * 0.5) : 1,
              opacity: progress > (i * 0.05) ? 0.6 : 0,
            }}
          />
        ))}
      </motion.div>
      
      {/* Right fabric panel */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full origin-left"
        style={{
          x: `${separationRight}%`,
          background: 'linear-gradient(270deg, #1a1a1a 0%, #2C2C2C 100%)',
        }}
      >
        {/* Fabric texture overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
            backgroundSize: '4px 4px',
          }}
        />
        
        {/* Fabric edge curl effect */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-full"
          style={{
            background: `linear-gradient(to right, 
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.4) 30%,
              transparent 100%)`,
            opacity: progress,
            transform: `scaleX(${1 + progress * 0.3})`
          }}
        />
        
        {/* Wrinkle effects near zipper */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`wrinkle-right-${i}`}
            className="absolute left-0 w-2 h-12"
            style={{
              top: `${i * 5}%`,
              background: 'rgba(0,0,0,0.3)',
              filter: 'blur(2px)',
              transformOrigin: 'left',
              scaleX: progress > (i * 0.05) ? 1 - (progress * 0.5) : 1,
              opacity: progress > (i * 0.05) ? 0.6 : 0,
            }}
          />
        ))}
      </motion.div>
      
      {/* Zipper track - premium metallic */}
      <motion.div
        className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1"
        style={{
          height: `${zipperY}%`,
          background: 'linear-gradient(180deg, #C4B5A0 0%, #8B7D6B 50%, #C4B5A0 100%)',
          boxShadow: `
            0 0 10px rgba(196, 181, 160, 0.5),
            inset 0 0 5px rgba(255, 255, 255, 0.3),
            inset 0 0 10px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        {/* Zipper teeth - individual elements */}
        {[...Array(Math.floor(zipperY / 3))].map((_, i) => (
          <div
            key={`tooth-${i}`}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: `${i * 3}%`,
              width: '8px',
              height: '4px',
              background: 'linear-gradient(90deg, #C4B5A0 0%, #F5F3F0 50%, #C4B5A0 100%)',
              borderRadius: '1px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
            }}
          />
        ))}
      </motion.div>
      
      {/* Zipper pull - realistic with swing */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{
          top: `${zipperY}%`,
        }}
        animate={{
          rotate: [0, -2, 2, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Pull body */}
        <div 
          className="relative"
          style={{
            width: '20px',
            height: '40px',
            background: 'linear-gradient(135deg, #D4C4B0 0%, #C4B5A0 50%, #8B7D6B 100%)',
            borderRadius: '4px',
            boxShadow: `
              0 4px 8px rgba(0,0,0,0.6),
              inset 0 1px 2px rgba(255,255,255,0.4),
              inset 0 -1px 2px rgba(0,0,0,0.3)
            `,
            border: '1px solid rgba(196, 181, 160, 0.5)',
          }}
        >
          {/* Pull ring */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 -bottom-4"
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #F5F3F0, #C4B5A0)',
              boxShadow: `
                0 2px 4px rgba(0,0,0,0.5),
                inset 0 1px 1px rgba(255,255,255,0.6)
              `,
            }}
          />
          
          {/* Highlight reflection */}
          <div 
            className="absolute top-1 left-1 right-4 h-3 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
              filter: 'blur(1px)',
            }}
          />
        </div>
      </motion.div>
      
      {/* Branding overlay */}
      {showBranding && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: progress > 0.9 ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <motion.h1
              className="font-serif text-6xl md:text-9xl mb-6 tracking-tight"
              style={{ 
                color: '#FAF9F7',
                textShadow: `
                  0 2px 40px rgba(196, 181, 160, 0.6),
                  0 4px 80px rgba(196, 181, 160, 0.4)
                `,
                fontWeight: 300,
              }}
              animate={{
                textShadow: [
                  '0 2px 40px rgba(196, 181, 160, 0.6)',
                  '0 2px 40px rgba(196, 181, 160, 0.8)',
                  '0 2px 40px rgba(196, 181, 160, 0.6)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sandhora Tailor
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p
                className="font-sans text-2xl md:text-3xl tracking-widest uppercase mb-2"
                style={{ 
                  color: '#C4B5A0',
                  fontWeight: 300,
                  letterSpacing: '0.3em'
                }}
              >
                Bespoke Elegance
              </p>
              <motion.div
                className="w-32 h-px mx-auto mt-4"
                style={{ background: 'linear-gradient(90deg, transparent, #C4B5A0, transparent)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Fade to landing page */}
      {progress > 0.92 && (
        <motion.div
          className="absolute inset-0"
          style={{ background: '#FAF9F7' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </div>
  );
};

export default PremiumZipperAnimation;
