'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  slug: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function FavoriteButton({ 
  slug, 
  className = '', 
  size = 'md',
  showLabel = false 
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isActive = isFavorite(slug);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'flex items-center gap-2 rounded-full transition-all',
        showLabel ? 'px-4 py-2 glass' : sizes[size],
        'justify-center',
        isActive ? 'text-rose-500' : 'text-white/70 hover:text-rose-400',
        className
      )}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isActive ? 'filled' : 'outline'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Heart 
            className={cn(iconSizes[size], isActive && 'fill-current')} 
          />
        </motion.div>
      </AnimatePresence>
      
      {showLabel && (
        <span className="text-sm font-medium">
          {isActive ? 'Saved' : 'Save'}
        </span>
      )}

      {/* Burst animation on favorite */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-full border-2 border-rose-500"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
