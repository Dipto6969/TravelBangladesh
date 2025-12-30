'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

type RevealDirection = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const getClipPath = (direction: RevealDirection, isRevealed: boolean): string => {
  if (isRevealed) {
    return 'inset(0% 0% 0% 0%)';
  }
  
  switch (direction) {
    case 'left':
      return 'inset(0% 100% 0% 0%)';
    case 'right':
      return 'inset(0% 0% 0% 100%)';
    case 'top':
      return 'inset(100% 0% 0% 0%)';
    case 'bottom':
      return 'inset(0% 0% 100% 0%)';
    case 'center':
      return 'inset(50% 50% 50% 50%)';
    default:
      return 'inset(0% 100% 0% 0%)';
  }
};

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  containerClassName = '',
  direction = 'left',
  delay = 0,
  duration = 0.8,
  once = true
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.div
        initial={{ clipPath: getClipPath(direction, false) }}
        animate={{ clipPath: getClipPath(direction, isInView) }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={className}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            className="object-cover"
          />
        )}
      </motion.div>
    </div>
  );
}

// Text Reveal with clip-path
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function ClipTextReveal({ text, className = '', delay = 0, stagger = 0.03 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const words = text.split(' ');

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const word: Variants = {
    hidden: {
      clipPath: 'inset(100% 0% 0% 0%)',
      y: 20
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`flex flex-wrap gap-x-2 ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// Reveal Container for any content
interface RevealContainerProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
}

export function RevealContainer({
  children,
  className = '',
  direction = 'bottom',
  delay = 0,
  duration = 0.6
}: RevealContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: getClipPath(direction, false), opacity: 0 }}
        animate={{ 
          clipPath: getClipPath(direction, isInView),
          opacity: isInView ? 1 : 0
        }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Stagger reveal for grid items
interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({ children, className = '', staggerDelay = 0.1 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50, clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)'
          } : {}}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
