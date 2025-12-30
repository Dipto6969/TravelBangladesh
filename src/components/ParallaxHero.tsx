'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxHeroProps {
  image: string;
  alt: string;
  height?: string;
  speed?: number;
  overlay?: boolean;
  overlayGradient?: string;
  children?: React.ReactNode;
}

export function ParallaxHero({
  image,
  alt,
  height = 'h-[80vh]',
  speed = 0.5,
  overlay = true,
  overlayGradient = 'from-[#0B1220] via-transparent to-[#0B1220]',
  children
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {overlay && (
        <motion.div 
          style={{ opacity }}
          className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`}
        />
      )}

      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Parallax Section for content areas
interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ children, className = '', speed = 0.3 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -50}px`, `${speed * 50}px`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Floating element with parallax
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function FloatingElement({ 
  children, 
  className = '', 
  amplitude = 20,
  duration = 6 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
}
