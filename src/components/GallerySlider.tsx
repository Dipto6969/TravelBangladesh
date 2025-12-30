'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Thumbs, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { X, ChevronLeft, ChevronRight, Expand, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

interface GallerySliderProps {
  images: string[];
  title: string;
  className?: string;
}

export default function GallerySlider({ images, title, className }: GallerySliderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const openFullscreen = useCallback((index: number) => {
    setActiveIndex(index);
    setIsFullscreen(true);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Main Gallery */}
      <div className={cn('relative', className)}>
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{
            prevEl: '.gallery-prev',
            nextEl: '.gallery-next',
          }}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-2xl overflow-hidden"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div 
                className="relative aspect-[16/9] cursor-pointer group"
                onClick={() => openFullscreen(index)}
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 p-4 rounded-full glass"
                  >
                    <Expand className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <button 
          className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 z-10 glass px-3 py-1 rounded-full text-white text-sm">
          {activeIndex + 1} / {images.length}
        </div>

        {/* View All Button */}
        {images.length > 1 && (
          <button
            onClick={() => openFullscreen(0)}
            className="absolute bottom-4 right-4 z-10 glass px-3 py-1 rounded-full text-white text-sm flex items-center gap-2 hover:bg-white/20 transition-colors"
          >
            <Grid className="w-4 h-4" />
            View All
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-4">
          <Swiper
            modules={[Thumbs]}
            spaceBetween={8}
            slidesPerView={5}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
            }}
            className="thumbnail-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <button
                  onClick={() => openFullscreen(index)}
                  className={cn(
                    'relative aspect-video rounded-lg overflow-hidden transition-all duration-300',
                    activeIndex === index 
                      ? 'ring-2 ring-emerald-500' 
                      : 'opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Fullscreen Swiper */}
            <div 
              className="w-full max-w-6xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                modules={[Navigation, Pagination, Keyboard, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                initialSlide={activeIndex}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="fullscreen-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[80vh] flex items-center justify-center">
                      <Image
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority={index === activeIndex}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Info Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full text-white">
              {title} • {activeIndex + 1} of {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
