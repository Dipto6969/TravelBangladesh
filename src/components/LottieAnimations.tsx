'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import to avoid SSR issues
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export function LoadingSpinner({ size = 120, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_usmfx6bp.json"
        style={{ height: size, width: size }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Page Loading Animation
export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0B1220] flex items-center justify-center"
    >
      <div className="text-center">
        <Player
          autoplay
          loop
          src="https://assets5.lottiefiles.com/packages/lf20_bniew9j6.json"
          style={{ height: 200, width: 200 }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-display text-white mt-4"
        >
          Discovering Dhaka...
        </motion.h2>
      </div>
    </motion.div>
  );
}

// Success Animation (for form submissions, etc.)
interface SuccessAnimationProps {
  show: boolean;
  size?: number;
  onComplete?: () => void;
}

export function SuccessAnimation({ show, size = 150, onComplete }: SuccessAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="flex items-center justify-center"
        >
          <Player
            autoplay
            keepLastFrame
            src="https://assets4.lottiefiles.com/packages/lf20_ya4ycrti.json"
            style={{ height: size, width: size }}
            onEvent={(event) => {
              if (event === 'complete' && onComplete) {
                onComplete();
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Heart/Like Animation
interface HeartAnimationProps {
  isActive: boolean;
  size?: number;
}

export function HeartAnimation({ isActive, size = 50 }: HeartAnimationProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0"
          >
            <Player
              autoplay
              keepLastFrame
              src="https://assets3.lottiefiles.com/packages/lf20_ohzsmwtk.json"
              style={{ height: size, width: size }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Location Pin Animation
interface LocationPinProps {
  size?: number;
}

export function LocationPinAnimation({ size = 60 }: LocationPinProps) {
  return (
    <Player
      autoplay
      loop
      src="https://assets9.lottiefiles.com/packages/lf20_UJNc2t.json"
      style={{ height: size, width: size }}
    />
  );
}

// Scroll Down Indicator
export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="flex flex-col items-center gap-2"
    >
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_kxsd2ytq.json"
        style={{ height: 60, width: 60 }}
      />
      <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
    </motion.div>
  );
}

// Plane/Travel Animation for loading
export function TravelLoader() {
  return (
    <div className="flex items-center justify-center">
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_hy4txm7l.json"
        style={{ height: 180, width: 180 }}
      />
    </div>
  );
}

// Camera Click Animation
export function CameraAnimation({ size = 80 }: { size?: number }) {
  return (
    <Player
      autoplay
      loop
      src="https://assets3.lottiefiles.com/packages/lf20_rio4qpdv.json"
      style={{ height: size, width: size }}
    />
  );
}
