'use client';

import { useState, useEffect } from 'react';
import { getPlaceImages, unsplashFallbackImages } from '@/lib/wikimedia';

interface ImageCache {
  [slug: string]: {
    heroImage: string;
    gallery: string[];
    timestamp: number;
  };
}

// In-memory cache to avoid refetching
const imageCache: ImageCache = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function useWikimediaImages(slug: string, fallbackHero?: string, fallbackGallery?: string[]) {
  const [heroImage, setHeroImage] = useState<string>(fallbackHero || '');
  const [gallery, setGallery] = useState<string[]>(fallbackGallery || []);
  const [loading, setLoading] = useState(true); // Start as loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      // Check cache first
      const cached = imageCache[slug];
      const now = Date.now();
      
      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        setHeroImage(cached.heroImage);
        setGallery(cached.gallery);
        setLoading(false); // Stop loading when using cache
        return;
      }

      setLoading(true);
      setError(null);

      // Set timeout to force fallback after 5 seconds
      const timeoutId = setTimeout(() => {
        console.warn(`[Wikimedia] Timeout for ${slug}, using fallback`);
        const unsplashImages = unsplashFallbackImages[slug] || [];
        if (unsplashImages.length > 0) {
          setHeroImage(unsplashImages[0]);
          setGallery(unsplashImages.slice(0, 3));
        } else if (fallbackHero) {
          setHeroImage(fallbackHero);
          setGallery(fallbackGallery || []);
        }
        setLoading(false);
      }, 5000);

      try {
        console.log(`[Wikimedia] Fetching images for: ${slug}`);
        const images = await getPlaceImages(slug);
        
        clearTimeout(timeoutId); // Clear timeout if fetch succeeds
        
        if (images.length > 0) {
          const hero = images[0];
          const gal = images.slice(0, 3);
          
          console.log(`[Wikimedia] ✅ Found ${images.length} images for ${slug}`);
          
          // Update cache
          imageCache[slug] = {
            heroImage: hero,
            gallery: gal,
            timestamp: now
          };
          
          setHeroImage(hero);
          setGallery(gal);
        } else {
          // Use Unsplash fallback if Wikimedia search failed
          const unsplashImages = unsplashFallbackImages[slug] || [];
          
          if (unsplashImages.length > 0) {
            console.warn(`[Wikimedia] ❌ No Wikimedia images found, using Unsplash fallback for ${slug}`);
            const hero = unsplashImages[0];
            const gal = unsplashImages.slice(0, 3);
            
            imageCache[slug] = {
              heroImage: hero,
              gallery: gal,
              timestamp: now
            };
            
            setHeroImage(hero);
            setGallery(gal);
            setError(null);
          } else {
            // No fallback available either - keep initial fallback
            console.warn(`[Wikimedia] ❌ No images found for ${slug}, keeping defaults`);
            if (fallbackHero) {
              setHeroImage(fallbackHero);
              setGallery(fallbackGallery || []);
            }
            setError('No images found');
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error(`[Wikimedia] ❌ Error fetching images for ${slug}:`, errorMsg);
        
        clearTimeout(timeoutId); // Clear timeout on error
        
        // Try Unsplash fallback on error
        const unsplashImages = unsplashFallbackImages[slug] || [];
        if (unsplashImages.length > 0) {
          console.warn(`[Wikimedia] Using Unsplash fallback due to error for ${slug}`);
          const hero = unsplashImages[0];
          const gal = unsplashImages.slice(0, 3);
          
          imageCache[slug] = {
            heroImage: hero,
            gallery: gal,
            timestamp: now
          };
          
          setHeroImage(hero);
          setGallery(gal);
          setError(null);
        } else {
          // Use original fallback
          if (fallbackHero) {
            setHeroImage(fallbackHero);
            setGallery(fallbackGallery || []);
          }
          setError('Failed to load images');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [slug, fallbackHero, fallbackGallery]);

  return { heroImage, gallery, loading, error };
}
