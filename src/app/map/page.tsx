'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, List, Filter, Search, Play, Calendar } from 'lucide-react';
import { dhakaPlaces } from '@/data/dhaka-places';
import { InteractiveMap } from '@/components/InteractiveMap';
import { VirtualTour } from '@/components/VirtualTour';
import { TripPlanner } from '@/components/TripPlanner';
import { Place } from '@/data/types';
import { cn } from '@/lib/utils';

// Category filters
const categories = ['all', 'historical', 'religious', 'nature', 'modern', 'culture', 'food'];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [showList, setShowList] = useState(false);

  // Filter places
  const filteredPlaces = dhakaPlaces.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.nameBangla.includes(searchQuery) ||
                          place.location.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#0B1220]">
      {/* Full Screen Map */}
      <InteractiveMap
        places={filteredPlaces}
        selectedPlace={selectedPlace}
        onPlaceSelect={setSelectedPlace}
        fullscreen={true}
        className="absolute inset-0"
      />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[1000] p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass text-white placeholder:text-white/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all',
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white'
                      : 'glass text-white/70 hover:text-white'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Place List */}
      <motion.div
        initial={{ x: 320 }}
        animate={{ x: showList ? 0 : 320 }}
        className="fixed top-20 right-0 bottom-0 w-80 z-[1000] glass border-l border-white/10 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {filteredPlaces.length} Places
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredPlaces.map((place, index) => (
              <motion.button
                key={place.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPlace(place)}
                className={cn(
                  'w-full p-3 rounded-xl text-left transition-all',
                  selectedPlace?.slug === place.slug
                    ? 'bg-emerald-500/20 border border-emerald-500/50'
                    : 'hover:bg-white/10 border border-transparent'
                )}
              >
                <h4 className="text-white font-medium truncate">{place.name}</h4>
                <p className="text-white/50 text-sm truncate">{place.location.area}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Toggle List Button */}
      <button
        onClick={() => setShowList(!showList)}
        className="fixed top-24 right-4 z-[1001] p-3 rounded-xl glass hover:bg-white/10 transition-colors"
      >
        <List className="w-5 h-5 text-white" />
      </button>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex gap-3">
        <button
          onClick={() => setShowVirtualTour(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
        >
          <Play className="w-5 h-5" />
          Virtual Tour
        </button>
        <button
          onClick={() => setShowTripPlanner(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          Plan Trip
        </button>
        <Link
          href="/places"
          className="flex items-center gap-2 px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
        >
          <List className="w-5 h-5" />
          View All
        </Link>
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTour
        places={filteredPlaces}
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
        startIndex={selectedPlace ? filteredPlaces.findIndex(p => p.slug === selectedPlace.slug) : 0}
      />

      {/* Trip Planner Modal */}
      <TripPlanner
        allPlaces={dhakaPlaces}
        isOpen={showTripPlanner}
        onClose={() => setShowTripPlanner(false)}
      />
    </div>
  );
}
