import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Custom cloth simulation shader
const ClothMaterial = ({ side, progress }) => {
  const materialRef = useRef();
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
      materialRef.current.uniforms.uTime.value += 0.01;
    }
  });
  
  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSide: { value: side }, // 0 = left, 1 = right
      uColor: { value: new THREE.Color('#2C2C2C') },
      uLightPos: { value: new THREE.Vector3(0, 5, 5) }
    }),
    [side]
  );
  
  const vertexShader = `
    uniform float uProgress;
    uniform float uTime;
    uniform float uSide;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vDisplacement;
    
    // Fabric weave pattern
    float weavePattern(vec2 uv) {
      float weave = sin(uv.x * 120.0) * cos(uv.y * 120.0) * 0.01;
      return weave;
    }
    
    void main() {
      vUv = uv;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Distance from center (zipper line)
      float distFromCenter = abs(pos.x);
      
      // Zipper is at x=0, progress moves down from top
      float zipperY = 1.0 - uProgress * 2.0; // -1 to 1 range
      float isAboveZipper = step(zipperY, pos.y);
      
      // Fabric separation - only affects area above zipper
      if (isAboveZipper > 0.5) {
        // Smooth separation curve
        float separationAmount = smoothstep(0.0, 0.3, uProgress);
        float edgeFactor = smoothstep(0.0, 0.2, distFromCenter);
        
        // Move fabric outward
        if (uSide < 0.5) {
          pos.x -= separationAmount * edgeFactor * 1.5;
        } else {
          pos.x += separationAmount * edgeFactor * 1.5;
        }
        
        // Curl edges outward (z displacement)
        float curlAmount = separationAmount * edgeFactor;
        pos.z += curlAmount * 0.3;
        
        // Add wrinkles near zipper line
        float wrinkleIntensity = smoothstep(0.0, 0.15, distFromCenter) * (1.0 - smoothstep(0.15, 0.4, distFromCenter));
        float wrinkle = sin(pos.y * 30.0 + uTime * 2.0) * wrinkleIntensity * 0.02;
        pos.z += wrinkle;
      }
      
      // Fabric compression near active zipper position
      float zipperProximity = 1.0 - smoothstep(0.0, 0.15, abs(pos.y - zipperY));
      float compression = zipperProximity * sin(distFromCenter * 40.0) * 0.015;
      pos.z -= compression;
      
      // Fabric weight and gravity sag
      float sag = pow(distFromCenter, 2.0) * 0.08 * (1.0 - pos.y * 0.5);
      pos.z -= sag * isAboveZipper;
      
      // Add weave micro-displacement
      pos.z += weavePattern(vUv) * (1.0 - separationAmount * 0.5);
      
      vDisplacement = pos.z;
      vPosition = pos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  
  const fragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uLightPos;
    uniform float uProgress;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vDisplacement;
    
    // Fabric texture
    float fabricNoise(vec2 uv) {
      // Weave pattern
      float weaveX = sin(uv.x * 100.0) * 0.5 + 0.5;
      float weaveY = sin(uv.y * 100.0) * 0.5 + 0.5;
      float weave = weaveX * weaveY;
      
      // Add subtle variation
      float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
      
      return mix(weave, noise, 0.3) * 0.15;
    }
    
    void main() {
      // Fabric base color with texture
      vec3 fabricColor = uColor + vec3(fabricNoise(vUv * 2.0));
      
      // Lighting calculation
      vec3 lightDir = normalize(uLightPos - vPosition);
      vec3 normal = normalize(vNormal);
      
      // Diffuse lighting
      float diffuse = max(dot(normal, lightDir), 0.0);
      diffuse = diffuse * 0.7 + 0.3; // Soften shadows
      
      // Specular highlight (subtle for fabric)
      vec3 viewDir = normalize(cameraPosition - vPosition);
      vec3 halfDir = normalize(lightDir + viewDir);
      float specular = pow(max(dot(normal, halfDir), 0.0), 8.0) * 0.1;
      
      // Ambient occlusion based on displacement
      float ao = 1.0 - (vDisplacement * 2.0);
      ao = clamp(ao, 0.6, 1.0);
      
      // Edge darkening for depth
      float edgeFactor = smoothstep(0.0, 0.1, abs(vPosition.x));
      edgeFactor = 1.0 - edgeFactor * 0.3;
      
      // Combine lighting
      vec3 finalColor = fabricColor * diffuse * ao * edgeFactor + vec3(specular);
      
      // Slight vignette on opened areas
      float vignette = 1.0 - uProgress * 0.2;
      finalColor *= vignette;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
  
  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      side={THREE.DoubleSide}
    />
  );
};

// Fabric panels
const FabricPanel = ({ side, progress }) => {
  const meshRef = useRef();
  
  // Higher resolution for smooth cloth simulation
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(2, 2, 64, 64);
  }, []);
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <ClothMaterial side={side} progress={progress} />
    </mesh>
  );
};

// Realistic zipper with individual teeth
const Zipper = ({ progress }) => {
  const zipperGroupRef = useRef();
  const zipperPullRef = useRef();
  
  useFrame((state) => {
    if (zipperGroupRef.current) {
      // Slight shimmer effect on metal
      const shimmer = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      zipperGroupRef.current.children.forEach((child, i) => {
        if (child.material && child.material.metalness) {
          child.material.emissiveIntensity = 0.1 + shimmer;
        }
      });
    }
    
    // Zipper pull swing with inertia
    if (zipperPullRef.current) {
      const swing = Math.sin(state.clock.elapsedTime * 3 + progress * 2) * 0.02 * (1 - progress);
      zipperPullRef.current.rotation.z = swing;
    }
  });
  
  const teeth = useMemo(() => {
    const teethArray = [];
    const teethCount = 40;
    const teethSpacing = 2 / teethCount;
    
    for (let i = 0; i < teethCount; i++) {
      const y = 1 - (i * teethSpacing);
      const isOpen = (1 - y) / 2 < progress;
      
      teethArray.push({
        position: [isOpen ? -0.03 : -0.01, y, 0.01],
        key: `left-${i}`,
        side: 'left'
      });
      
      teethArray.push({
        position: [isOpen ? 0.03 : 0.01, y, 0.01],
        key: `right-${i}`,
        side: 'right'
      });
    }
    
    return teethArray;
  }, [progress]);
  
  // Zipper material - brushed gold
  const zipperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#C4B5A0',
      metalness: 0.9,
      roughness: 0.3,
      emissive: '#8B7D6B',
      emissiveIntensity: 0.1
    });
  }, []);
  
  // Zipper pull position
  const pullY = 1 - (progress * 2);
  
  return (
    <group ref={zipperGroupRef}>
      {/* Zipper teeth */}
      {teeth.map((tooth) => (
        <mesh key={tooth.key} position={tooth.position} material={zipperMaterial}>
          <boxGeometry args={[0.01, 0.03, 0.01]} />
        </mesh>
      ))}
      
      {/* Zipper pull */}
      <group ref={zipperPullRef} position={[0, pullY, 0.02]}>
        <mesh material={zipperMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 16]} />
        </mesh>
        <mesh position={[0, -0.06, 0]} material={zipperMaterial}>
          <sphereGeometry args={[0.025, 16, 16]} />
        </mesh>
      </group>
      
      {/* Zipper tape/track */}
      <mesh position={[0, 0, 0]} material={zipperMaterial}>
        <boxGeometry args={[0.005, 2, 0.005]} />
      </mesh>
    </group>
  );
};

// Three.js scene
const Scene = ({ progress }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 0, 2]} intensity={0.3} color="#C4B5A0" />
      <pointLight position={[3, 0, 2]} intensity={0.3} color="#C4B5A0" />
      
      {/* Fabric panels */}
      <FabricPanel side={0} progress={progress} />
      <FabricPanel side={1} progress={progress} />
      
      {/* Zipper */}
      <Zipper progress={progress} />
    </>
  );
};

// Main animation component
const PremiumZipperAnimation = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);
  const [showBranding, setShowBranding] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  
  useEffect(() => {
    // Animation timeline
    const startDelay = setTimeout(() => {
      // Zipper animation (3 seconds)
      const duration = 3000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        
        // Easing function - ease-in-out with slight drag
        const eased = newProgress < 0.5
          ? 4 * newProgress * newProgress * newProgress
          : 1 - Math.pow(-2 * newProgress + 2, 3) / 2;
        
        setProgress(eased);
        
        // Show branding at 40%
        if (eased >= 0.4 && !showBranding) {
          setShowBranding(true);
        }
        
        if (newProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Fabric parting complete
          setTimeout(() => {
            setComplete(true);
            onComplete();
          }, 800);
        }
      };
      
      animate();
    }, 500);
    
    return () => clearTimeout(startDelay);
  }, [onComplete, showBranding]);
  
  if (complete) return null;
  
  return (
    <div className="fixed inset-0 z-[100]" style={{ background: '#1a1a1a' }}>
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Scene progress={progress} />
      </Canvas>
      
      {/* Branding overlay */}
      {showBranding && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="text-center"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{
              transform: `perspective(1000px) rotateX(${progress * -2}deg)`
            }}
          >
            <motion.h1
              className="font-serif text-6xl md:text-8xl mb-4 tracking-tight"
              style={{ 
                color: '#FAF9F7',
                textShadow: '0 2px 20px rgba(196, 181, 160, 0.3)'
              }}
            >
              Sandhora Tailor
            </motion.h1>
            <motion.p
              className="font-sans text-xl md:text-2xl tracking-widest uppercase"
              style={{ color: '#C4B5A0' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Bespoke Elegance
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      
      {/* Fade to landing page */}
      {progress > 0.95 && (
        <motion.div
          className="absolute inset-0 bg-cream-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </div>
  );
};

export default PremiumZipperAnimation;
