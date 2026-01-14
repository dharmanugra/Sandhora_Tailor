import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const MonochromeZipperAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('initial'); // initial, fabricDrop, zipper, complete
  const [progress, setProgress] = useState(0);
  
  const progressValue = useMotionValue(0);
  
  useEffect(() => {
    // Stage 1: Initial load with text
    const stage1Timer = setTimeout(() => {
      setStage('fabricDrop');
    }, 1500);
    
    // Stage 2: Fabric slices drop
    const stage2Timer = setTimeout(() => {
      setStage('zipper');
      
      // Start zipper animation
      animate(progressValue, 1, {
        duration: 3.2,
        ease: [0.43, 0.13, 0.23, 0.96],
        onUpdate: (latest) => {
          setProgress(latest);
        },
        onComplete: () => {
          setTimeout(() => {
            setStage('complete');
            onComplete();
          }, 600);
        }
      });
    }, 3500);
    
    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
    };
  }, [progressValue, onComplete]);
  
  if (stage === 'complete') return null;
  
  // Calculate zipper position
  const zipperY = progress * 100;
  const separationLeft = progress * -55;
  const separationRight = progress * 55;
  
  // Fabric slices for drop animation
  const fabricSlices = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {/* Initial fabric with text */}
      {stage === 'initial' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          }}
        >
          {/* Fabric texture */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px),
                repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)
              `,
              backgroundSize: '3px 3px',
            }}
          />
          
          {/* Brand text on fabric */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-center relative z-10"
          >
            <h1 
              className="font-serif text-7xl md:text-9xl tracking-tight"
              style={{
                color: '#f5f5f5',
                textShadow: '0 2px 30px rgba(255,255,255,0.15)',
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              SANDHORA TAILOR
            </h1>
          </motion.div>
        </motion.div>
      )}
      
      {/* Fabric slices dropping */}
      {stage === 'fabricDrop' && (
        <div className="absolute inset-0">
          {fabricSlices.map((slice) => (
            <motion.div
              key={slice}
              className="absolute top-0"
              style={{
                left: `${slice * 12.5}%`,
                width: '12.5%',
                height: '100%',
                background: slice % 2 === 0 
                  ? 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)'
                  : 'linear-gradient(180deg, #242424 0%, #1a1a1a 100%)',
                boxShadow: '2px 0 10px rgba(0,0,0,0.5), -2px 0 10px rgba(0,0,0,0.5)',
              }}
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{
                duration: 1.2,
                delay: slice * 0.12,
                ease: [0.6, 0.05, 0.2, 0.95],
              }}
            >
              {/* Fabric texture on each slice */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px),
                    repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)
                  `,
                  backgroundSize: '3px 3px',
                }}
              />
              
              {/* Weighted bottom shadow */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Zipper stage with fabric panels */}
      {stage === 'zipper' && (
        <>
          {/* Left fabric panel */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full origin-right"
            style={{
              x: `${separationLeft}%`,
              background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
            }}
          >
            {/* Fine fabric texture */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px),
                  repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px)
                `,
                backgroundSize: '2px 2px',
              }}
            />
            
            {/* Grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />
            
            {/* Edge curl shadow */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-full"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
                opacity: progress,
              }}
            />
            
            {/* Wrinkle lines near zipper */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`wrinkle-left-${i}`}
                className="absolute right-0"
                style={{
                  top: `${i * 4}%`,
                  width: '3px',
                  height: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  filter: 'blur(1px)',
                  transformOrigin: 'right',
                  scaleX: progress > (i * 0.04) ? 1 - (progress * 0.6) : 1,
                  opacity: progress > (i * 0.04) ? 0.7 : 0,
                }}
              />
            ))}
          </motion.div>
          
          {/* Right fabric panel */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full origin-left"
            style={{
              x: `${separationRight}%`,
              background: 'linear-gradient(270deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
            }}
          >
            {/* Fine fabric texture */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px),
                  repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px)
                `,
                backgroundSize: '2px 2px',
              }}
            />
            
            {/* Grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />
            
            {/* Edge curl shadow */}
            <motion.div
              className="absolute top-0 left-0 w-40 h-full"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
                opacity: progress,
              }}
            />
            
            {/* Wrinkle lines near zipper */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`wrinkle-right-${i}`}
                className="absolute left-0"
                style={{
                  top: `${i * 4}%`,
                  width: '3px',
                  height: '8px',
                  background: 'rgba(0,0,0,0.4)',
                  filter: 'blur(1px)',
                  transformOrigin: 'left',
                  scaleX: progress > (i * 0.04) ? 1 - (progress * 0.6) : 1,
                  opacity: progress > (i * 0.04) ? 0.7 : 0,
                }}
              />
            ))}
          </motion.div>
          
          {/* Monochrome metal zipper track */}
          <motion.div
            className="absolute left-1/2 top-0 transform -translate-x-1/2"
            style={{
              height: `${zipperY}%`,
              width: '2px',
              background: 'linear-gradient(180deg, #a0a0a0 0%, #6a6a6a 30%, #505050 50%, #6a6a6a 70%, #a0a0a0 100%)',
              boxShadow: `
                0 0 8px rgba(200,200,200,0.3),
                inset 0 0 3px rgba(255,255,255,0.4),
                inset 0 0 8px rgba(0,0,0,0.4)
              `,
            }}
          >
            {/* Individual zipper teeth */}
            {[...Array(Math.floor(zipperY / 2.5))].map((_, i) => (
              <React.Fragment key={`tooth-${i}`}>
                {/* Left tooth */}
                <div
                  className="absolute"
                  style={{
                    top: `${i * 2.5}%`,
                    left: '-4px',
                    width: '4px',
                    height: '3px',
                    background: 'linear-gradient(135deg, #d0d0d0 0%, #909090 50%, #707070 100%)',
                    borderRadius: '1px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.5), inset 0 0.5px 1px rgba(255,255,255,0.3)',
                  }}
                />
                {/* Right tooth */}
                <div
                  className="absolute"
                  style={{
                    top: `${i * 2.5}%`,
                    right: '-4px',
                    width: '4px',
                    height: '3px',
                    background: 'linear-gradient(135deg, #d0d0d0 0%, #909090 50%, #707070 100%)',
                    borderRadius: '1px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.5), inset 0 0.5px 1px rgba(255,255,255,0.3)',
                  }}
                />
              </React.Fragment>
            ))}
          </motion.div>
          
          {/* Monochrome zipper pull */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: `${zipperY}%`,
            }}
            animate={{
              rotate: [0, -1.5, 1.5, -1.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className="relative"
              style={{
                width: '22px',
                height: '45px',
                background: 'linear-gradient(135deg, #c0c0c0 0%, #909090 30%, #707070 60%, #505050 100%)',
                borderRadius: '3px',
                boxShadow: `
                  0 4px 10px rgba(0,0,0,0.7),
                  inset 0 1px 2px rgba(255,255,255,0.5),
                  inset 0 -1px 2px rgba(0,0,0,0.4)
                `,
                border: '0.5px solid rgba(160,160,160,0.4)',
              }}
            >
              {/* Zipper pull ring */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-5"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #e0e0e0, #909090)',
                  boxShadow: `
                    0 3px 6px rgba(0,0,0,0.6),
                    inset 0 1px 2px rgba(255,255,255,0.6),
                    inset 0 -1px 2px rgba(0,0,0,0.3)
                  `,
                }}
              />
              
              {/* Metallic highlight */}
              <div 
                className="absolute top-1 left-1 right-3 h-4 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
                  filter: 'blur(1.5px)',
                }}
              />
            </div>
          </motion.div>
          
          {/* Brand text overlay during zipper */}
          {progress >= 0.3 && progress < 0.85 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <h1 
                  className="font-serif text-6xl md:text-8xl tracking-tight mb-4"
                  style={{
                    color: '#f5f5f5',
                    textShadow: '0 2px 40px rgba(255,255,255,0.2)',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                >
                  SANDHORA TAILOR
                </h1>
                <motion.p
                  className="font-sans text-lg md:text-xl tracking-widest uppercase"
                  style={{
                    color: '#b0b0b0',
                    fontWeight: 300,
                    letterSpacing: '0.25em',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  BESPOKE CRAFTSMANSHIP
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
      
      {/* Fade to landing page */}
      {progress > 0.88 && stage === 'zipper' && (
        <motion.div
          className="absolute inset-0"
          style={{ background: '#FAF9F7' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
      )}
    </div>
  );
};

export default MonochromeZipperAnimation;
