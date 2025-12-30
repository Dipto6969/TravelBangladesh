'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star, Trash2, Play, Calendar, Map } from 'lucide-react';
import { dhakaPlaces } from '@/data/dhaka-places';
import { useFavorites } from '@/components/FavoritesContext';
import { FavoriteButton } from '@/components/FavoriteButton';
import { VirtualTour } from '@/components/VirtualTour';
import { TripPlanner } from '@/components/TripPlanner';
import { useState } from 'react';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showTripPlanner, setShowTripPlanner] = useState(false);

  // Get full place data for favorites
  const favoritePlaces = dhakaPlaces.filter(place => favorites.includes(place.slug));

  return (
    <main className="min-h-screen bg-[#0B1220] pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 flex items-center gap-4">
            <Heart className="w-10 h-10 text-rose-500 fill-current" />
            Your Favorites
          </h1>
          <p className="text-white/60 text-lg">
            {favorites.length === 0 
              ? 'Start exploring and save places you\'d love to visit!'
              : `You have ${favorites.length} place${favorites.length > 1 ? 's' : ''} saved`
            }
          </p>
        </motion.div>

        {/* Action Buttons */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            <button
              onClick={() => setShowVirtualTour(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              Virtual Tour
            </button>
            <button
              onClick={() => setShowTripPlanner(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Plan Trip
            </button>
            <Link
              href="/map"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Map className="w-4 h-4" />
              View on Map
            </Link>
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-rose-400 font-medium hover:bg-rose-500/10 transition-colors ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Heart className="w-12 h-12 text-white/20" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              No favorites yet
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Explore the beautiful places of Dhaka and tap the heart icon to save your favorites.
            </p>
            <Link
              href="/places"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Explore Places
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {favoritePlaces.map((place, index) => (
                <motion.div
                  key={place.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Link href={`/places/${place.slug}`} className="block group">
                    <div className="relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={place.heroImage}
                          alt={place.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Favorite Button */}
                        <div className="absolute top-3 right-3">
                          <FavoriteButton slug={place.slug} size="sm" />
                        </div>

                        {/* Category */}
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500/80 text-white text-xs font-medium capitalize">
                          {place.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {place.name}
                        </h3>
                        <p className="text-white/50 text-sm font-bangla">{place.nameBangla}</p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm">{place.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/40 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{place.location.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTour
        places={favoritePlaces}
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
      />

      {/* Trip Planner Modal */}
      <TripPlanner
        allPlaces={dhakaPlaces}
        isOpen={showTripPlanner}
        onClose={() => setShowTripPlanner(false)}
      />
    </main>
  );
}
