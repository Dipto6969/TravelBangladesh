'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

export function PhotoLightbox({ 
  images, 
  initialIndex = 0, 
  isOpen, 
  onClose,
  alt = 'Photo'
}: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];

  // Reset state when opening with new initial index
  const prevIsOpen = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      // Just opened
      setCurrentIndex(initialIndex);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
    prevIsOpen.current = isOpen;
  }, [isOpen, initialIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (currentIndex < images.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setZoom(1);
            setPosition({ x: 0, y: 0 });
          }
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setZoom(1);
            setPosition({ x: 0, y: 0 });
          }
          break;
        case '+':
        case '=':
          setZoom(prev => Math.min(prev + 0.5, 3));
          break;
        case '-':
          setZoom(prev => Math.max(prev - 0.5, 1));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [currentIndex, images.length]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, zoom, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `dhaka-photo-${currentIndex + 1}.jpg`;
    link.click();
  }, [currentImage, currentIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95"
          ref={containerRef}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full glass hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom === 1}
              className="p-2 rounded-full glass hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <span className="text-white/60 text-sm min-w-[4rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom === 3}
              className="p-2 rounded-full glass hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-2" />
            <button
              onClick={handleDownload}
              className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full glass hover:bg-white/20 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full glass hover:bg-white/20 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
              >
                <Image
                  src={currentImage}
                  alt={`${alt} ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
              <div className="flex gap-2 p-2 rounded-xl glass">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setZoom(1);
                      setPosition({ x: 0, y: 0 });
                    }}
                    className={cn(
                      'relative w-14 h-10 rounded-lg overflow-hidden transition-all',
                      index === currentIndex 
                        ? 'ring-2 ring-emerald-500' 
                        : 'opacity-50 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-white/50 text-sm mt-2">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
