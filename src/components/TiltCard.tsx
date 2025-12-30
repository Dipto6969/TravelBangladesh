'use client';

import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  options?: {
    max?: number;
    speed?: number;
    glare?: boolean;
    'max-glare'?: number;
    scale?: number;
    perspective?: number;
  };
}

export function TiltCard({ children, className = '', options = {} }: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tiltRef.current) return;

    const defaultOptions = {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.3,
      scale: 1.02,
      perspective: 1000,
      ...options
    };

    VanillaTilt.init(tiltRef.current, defaultOptions);

    return () => {
      if (tiltRef.current) {
        const vanillaTilt = (tiltRef.current as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt;
        if (vanillaTilt) {
          vanillaTilt.destroy();
        }
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
}

// Enhanced 3D Card with depth layers
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  depth?: 'shallow' | 'medium' | 'deep';
}

export function Card3D({ 
  children, 
  className = '', 
  backgroundImage,
  depth = 'medium' 
}: Card3DProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const depthSettings = {
    shallow: { max: 8, scale: 1.01, perspective: 1500 },
    medium: { max: 15, scale: 1.03, perspective: 1000 },
    deep: { max: 25, scale: 1.05, perspective: 800 }
  };

  useEffect(() => {
    if (!tiltRef.current) return;

    VanillaTilt.init(tiltRef.current, {
      ...depthSettings[depth],
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      gyroscope: true
    });

    return () => {
      if (tiltRef.current) {
        const vanillaTilt = (tiltRef.current as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt;
        if (vanillaTilt) {
          vanillaTilt.destroy();
        }
      }
    };
  }, [depth]);

  return (
    <div 
      ref={tiltRef} 
      className={`transform-gpu relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            transform: 'translateZ(-20px) scale(1.1)'
          }}
        />
      )}
      <div 
        className="relative z-10"
        style={{ transform: 'translateZ(30px)' }}
      >
        {children}
      </div>
    </div>
  );
}

// Hover lift card without tilt
interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  liftAmount?: number;
}

export function HoverLift({ children, className = '', liftAmount = 10 }: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -liftAmount,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic hover effect
interface MagneticHoverProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticHover({ children, className = '', strength = 20 }: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Shine effect on hover
interface ShineCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ShineCard({ children, className = '' }: ShineCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      whileHover="hover"
    >
      {children}
      
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        variants={{
          hover: {
            x: '100%',
            opacity: [0, 0.3, 0],
            transition: {
              duration: 0.6,
              ease: 'easeInOut'
            }
          }
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'skewX(-20deg)'
        }}
      />
    </motion.div>
  );
}
