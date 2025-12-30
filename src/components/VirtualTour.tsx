'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Place } from '@/data/types';
import { cn } from '@/lib/utils';

interface VirtualTourProps {
  places: Place[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}

export function VirtualTour({ places, isOpen, onClose, startIndex = 0 }: VirtualTourProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPlace = places[currentIndex];

  // Speech synthesis
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : 1;
    
    speechRef.current = utterance;
    
    utterance.onend = () => {
      // Auto-advance after speech ends
      if (isPlaying) {
        timerRef.current = setTimeout(() => {
          if (currentIndex < places.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            setIsPlaying(false);
          }
        }, 2000);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [isMuted, isPlaying, currentIndex, places.length]);

  // Start/stop tour
  useEffect(() => {
    if (isPlaying && currentPlace) {
      const text = `${currentPlace.name}. ${currentPlace.nameBangla}. ${currentPlace.description}`;
      speak(text);
      
      // Progress animation
      const duration = 15000; // 15 seconds per place
      const interval = 100;
      let elapsed = 0;
      
      const progressTimer = setInterval(() => {
        elapsed += interval;
        setProgress((elapsed / duration) * 100);
      }, interval);

      return () => {
        clearInterval(progressTimer);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      window.speechSynthesis?.cancel();
      setProgress(0);
    }
  }, [isPlaying, currentIndex, currentPlace, speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [isOpen, startIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowRight':
          if (currentIndex < places.length - 1) {
            setCurrentIndex(prev => prev + 1);
          }
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
          }
          break;
        case 'm':
          setIsMuted(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, places.length, onClose]);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  if (!currentPlace) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlace.slug}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentPlace.heroImage}
                  alt={currentPlace.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="p-6 flex justify-between items-start">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-sm font-medium uppercase tracking-wider"
                >
                  Virtual Tour • {currentIndex + 1} of {places.length}
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-white" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-end pb-32 px-6 md:px-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlace.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4 capitalize">
                    {currentPlace.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
                    {currentPlace.name}
                  </h1>
                  <p className="text-2xl text-white/60 font-bangla mb-6">
                    {currentPlace.nameBangla}
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {currentPlace.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Progress Bar */}
              <div className="mb-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Thumbnails */}
              <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {places.map((place, index) => (
                  <button
                    key={place.slug}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all',
                      index === currentIndex ? 'ring-2 ring-emerald-500 scale-110' : 'opacity-50 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={place.heroImage}
                      alt={place.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsMuted(prev => !prev)}
                  className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>

                <button
                  onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-full glass hover:bg-white/20 transition-colors disabled:opacity-30"
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => currentIndex < places.length - 1 && setCurrentIndex(prev => prev + 1)}
                  disabled={currentIndex === places.length - 1}
                  className="p-3 rounded-full glass hover:bg-white/20 transition-colors disabled:opacity-30"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>

                <div className="text-white/60 text-sm ml-4">
                  Press <kbd className="px-2 py-0.5 rounded bg-white/10 mx-1">Space</kbd> to play/pause
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
