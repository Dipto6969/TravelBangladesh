'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TrailLeaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

// SVG Leaf component representing Bangladesh's lush nature
function LeafIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main leaf shape */}
      <path
        d="M16 2C16 2 8 8 4 16C0 24 4 28 8 30C12 32 16 30 16 30C16 30 20 32 24 30C28 28 32 24 28 16C24 8 16 2 16 2Z"
        fill="url(#leafGradient)"
        stroke="url(#leafStroke)"
        strokeWidth="1"
      />
      {/* Leaf vein - center */}
      <path
        d="M16 6C16 6 16 28 16 30"
        stroke="url(#veinGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left veins */}
      <path d="M16 10C14 11 10 12 8 14" stroke="url(#veinGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M16 16C13 17 9 18 6 20" stroke="url(#veinGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M16 22C14 23 11 24 9 25" stroke="url(#veinGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      {/* Right veins */}
      <path d="M16 10C18 11 22 12 24 14" stroke="url(#veinGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M16 16C19 17 23 18 26 20" stroke="url(#veinGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <path d="M16 22C18 23 21 24 23 25" stroke="url(#veinGradient)" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      
      <defs>
        <linearGradient id="leafGradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="leafStroke" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="veinGradient" x1="16" y1="6" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Small floating leaf for trail
function MiniLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none">
      <path
        d="M8 1C8 1 4 4 2 8C0 12 2 14 4 15C6 16 8 15 8 15C8 15 10 16 12 15C14 14 16 12 14 8C12 4 8 1 8 1Z"
        fill="url(#miniLeafGrad)"
      />
      <path d="M8 3V14" stroke="#a7f3d0" strokeWidth="0.8" strokeLinecap="round" />
      <defs>
        <linearGradient id="miniLeafGrad" x1="8" y1="1" x2="8" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailLeaf[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // Create floating leaf trail occasionally
    if (Math.random() > 0.85) {
      setTrail(prev => {
        const newLeaf: TrailLeaf = {
          id: Date.now(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5
        };
        return [...prev.slice(-6), newLeaf];
      });
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [role="button"], .hoverable');
      setIsHovering(!!isHoverable);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, updateCursor]);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>

      {/* Floating leaf trail */}
      {trail.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ opacity: 0.8, scale: leaf.scale, y: 0 }}
          animate={{ opacity: 0, scale: 0, y: 50, rotate: leaf.rotation + 180 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9997]"
          style={{ left: leaf.x - 8, top: leaf.y - 8 }}
        >
          <MiniLeaf className="w-4 h-4" />
        </motion.div>
      ))}

      {/* Main leaf cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        {/* Glow effect behind leaf */}
        <motion.div
          animate={{ scale: isHovering ? 1.8 : isClicking ? 0.6 : 1, opacity: isVisible ? 0.4 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-400 blur-xl"
        />

        {/* Main Leaf */}
        <motion.div
          animate={{
            scale: isHovering ? 1.3 : isClicking ? 0.8 : 1,
            rotate: isHovering ? -30 : isClicking ? -60 : -45,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <LeafIcon className="w-8 h-8" />
        </motion.div>

        {/* Hover ring effect */}
        {isHovering && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-emerald-400"
          />
        )}
      </motion.div>

      {/* Extra nature glow on hover */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed pointer-events-none z-[9996] -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-2xl"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)'
          }}
        />
      )}
    </>
  );
}

// Magnetic effect for buttons
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
