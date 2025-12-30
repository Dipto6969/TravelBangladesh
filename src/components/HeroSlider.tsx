'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroSlides } from '@/data';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface HeroSliderProps {
  onScrollDown?: () => void;
}

export default function HeroSlider({ onScrollDown }: HeroSliderProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-12 !h-1 !rounded-full"></span>`;
          },
        }}
        className="h-full w-full hero-swiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 hero-overlay" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl mx-auto text-center"
                  >
                    {/* Pre-title */}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
                    >
                      Discover Bangladesh
                    </motion.span>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
                      {slide.subtitle}
                    </p>

                    {/* CTA Button */}
                    <Link href={slide.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                      >
                        Explore Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={onScrollDown}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-sm tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Side Decorations */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        <div className="w-0.5 h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <span className="text-white/40 text-xs tracking-widest transform -rotate-90 origin-center whitespace-nowrap">
          TRAVEL BANGLADESH
        </span>
        <div className="w-0.5 h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}
