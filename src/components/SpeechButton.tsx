'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpeechButtonProps {
  text: string;
  lang?: string;
  className?: string;
  variant?: 'default' | 'floating' | 'inline';
}

export default function SpeechButton({ 
  text, 
  lang = 'en-US', 
  className,
  variant = 'default' 
}: SpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [text, lang, isSpeaking, isPaused]);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const restart = useCallback(() => {
    stop();
    setTimeout(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 100);
  }, [text, lang, stop]);

  if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
    return null;
  }

  const isFloating = variant === 'floating';
  const isInline = variant === 'inline';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={speak}
        className={cn(
          'flex items-center gap-2 font-medium transition-all duration-300',
          isFloating && 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full glass shadow-lg hover:shadow-emerald-500/25',
          isInline && 'px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm',
          !isFloating && !isInline && 'px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/25'
        )}
        aria-label={isSpeaking ? (isPaused ? 'Resume reading' : 'Pause reading') : 'Read aloud'}
      >
        <AnimatePresence mode="wait">
          {isSpeaking ? (
            isPaused ? (
              <motion.div
                key="play"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Play className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Pause className="w-5 h-5" />
              </motion.div>
            )
          ) : (
            <motion.div
              key="volume"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isFloating && (
          <span>
            {isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Read Aloud'}
          </span>
        )}
        
        {/* Speaking indicator */}
        {isSpeaking && !isPaused && (
          <motion.div
            className="flex gap-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1 h-3 bg-current rounded-full"
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.button>

      {/* Additional controls when speaking */}
      <AnimatePresence>
        {isSpeaking && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className={cn(
                'p-2 rounded-full transition-colors',
                isFloating ? 'glass' : 'bg-white/10 hover:bg-white/20'
              )}
              aria-label="Restart"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stop}
              className={cn(
                'p-2 rounded-full transition-colors',
                isFloating ? 'glass' : 'bg-white/10 hover:bg-white/20'
              )}
              aria-label="Stop"
            >
              <VolumeX className="w-4 h-4 text-white" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
