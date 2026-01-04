'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Place } from '@/data/types';
import { cn } from '@/lib/utils';
import { TiltCard } from './TiltCard';
import { FavoriteButton } from './FavoriteButton';
import { useWikimediaImages } from '@/hooks/useWikimediaImages';

interface PlaceCardProps {
  place: Place;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export default function PlaceCard({ place, index = 0, variant = 'default' }: PlaceCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  
  // Dynamically fetch Wikimedia images
  const { heroImage, loading } = useWikimediaImages(place.slug, place.heroImage);
  
  // Ensure we always have a valid image URL
  const displayImage = heroImage && heroImage.trim() !== '' ? heroImage : place.heroImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/places/${place.slug}`}>
        <TiltCard 
          className="block"
          options={{ 
            max: 12, 
            speed: 400, 
            glare: true, 
            'max-glare': 0.2,
            scale: 1.02 
          }}
        >
          <motion.article
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'group relative rounded-2xl overflow-hidden cursor-pointer',
              'bg-gradient-to-b from-midnight/50 to-midnight/80',
              'border border-white/10 hover:border-emerald-500/50',
              'transition-all duration-500',
              isFeatured ? 'aspect-[4/5]' : isCompact ? 'aspect-[3/2]' : 'aspect-[3/4]'
            )}
          >
          {/* Background Image */}
          <div className="absolute inset-0 img-zoom">
            {loading && (
              <div className="absolute inset-0 bg-midnight/80 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={displayImage}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
          </div>

          {/* Featured Badge */}
          {place.featured && !isCompact && (
            <div className="absolute top-4 left-4 z-10">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium"
              >
                Featured
              </motion.span>
            </div>
          )}

          {/* Rating */}
          {!isCompact && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <FavoriteButton slug={place.slug} size="sm" />
              <div className="flex items-center gap-1 glass px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-emerald-400 fill-current" />
                <span className="text-white text-xs font-medium">{place.rating}</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            {/* Category */}
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/20 mb-2 capitalize">
              {place.category}
            </span>

            {/* Title */}
            <h3 className={cn(
              'font-display font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors',
              isFeatured ? 'text-2xl' : isCompact ? 'text-lg' : 'text-xl'
            )}>
              {place.name}
            </h3>

            {/* Bangla Name */}
            <p className="text-white/60 text-sm font-bangla mb-2">{place.nameBangla}</p>

            {/* Location */}
            <div className="flex items-center gap-1 text-white/50 text-sm mb-3">
              <MapPin className="w-3 h-3" />
              <span>{place.location.area}, {place.location.city}</span>
            </div>

            {/* Description - Only on featured/default */}
            {!isCompact && (
              <p className="text-white/70 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {place.shortDescription}
              </p>
            )}

            {/* CTA */}
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
          </div>
        </motion.article>
        </TiltCard>
      </Link>
    </motion.div>
  );
}
