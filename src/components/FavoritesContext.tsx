'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Place } from '@/data/types';

interface FavoritesContextType {
  favorites: string[]; // Array of place slugs
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'travel-bangladesh-favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const addFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      if (prev.includes(slug)) return prev;
      return [...prev, slug];
    });
  }, []);

  const removeFavorite = useCallback((slug: string) => {
    setFavorites(prev => prev.filter(s => s !== slug));
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      }
      return [...prev, slug];
    });
  }, []);

  const isFavorite = useCallback((slug: string) => {
    return favorites.includes(slug);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
