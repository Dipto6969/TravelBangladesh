'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Grid, List } from 'lucide-react';
import { PlaceCard, FadeInUp, CategoryGrid } from '@/components';
import { dhakaPlaces, categories } from '@/data';
import { cn } from '@/lib/utils';

export default function PlacesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPlaces = useMemo(() => {
    let result = dhakaPlaces;

    if (selectedCategory) {
      result = result.filter(place => place.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(place =>
        place.name.toLowerCase().includes(query) ||
        place.nameBangla.includes(searchQuery) ||
        place.shortDescription.toLowerCase().includes(query) ||
        place.location.area.toLowerCase().includes(query) ||
        place.tags.some(tag => tag.includes(query))
      );
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <FadeInUp>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                Explore Dhaka
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Discover Amazing{' '}
                <span className="text-gradient">Places</span>
              </h1>
              <p className="text-lg text-white/60 mb-8">
                From historic monuments to modern marvels, explore the best destinations 
                that Dhaka has to offer.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search places, areas, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-full glass text-white placeholder:text-white/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-white/40" />
                  </button>
                )}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  !selectedCategory
                    ? 'bg-emerald-500 text-white'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                All Places
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white'
                      : 'glass text-white/60 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>

            {/* View Toggle & Results Count */}
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm">
                {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'}
              </span>
              <div className="flex items-center gap-1 glass rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              <span className="text-white/40 text-sm">Active filters:</span>
              {selectedCategory && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="hover:text-white transition-colors"
                    aria-label="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
                  &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-white transition-colors"
                    aria-label="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-white/40 text-sm hover:text-white transition-colors underline"
              >
                Clear all
              </button>
            </motion.div>
          )}

          {/* Places Grid/List */}
          <AnimatePresence mode="wait">
            {filteredPlaces.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  viewMode === 'grid'
                    ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'flex flex-col gap-4'
                )}
              >
                {filteredPlaces.map((place, index) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    index={index}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No places found</h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Categories Section (if no filter active) */}
      {!selectedCategory && !searchQuery && (
        <section className="py-16 bg-gradient-to-b from-transparent via-[#0B1220]/50 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <FadeInUp>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Browse by Category
              </h2>
            </FadeInUp>
            <CategoryGrid />
          </div>
        </section>
      )}
    </>
  );
}
