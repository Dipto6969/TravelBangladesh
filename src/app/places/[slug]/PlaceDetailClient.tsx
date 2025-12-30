'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Ticket, 
  Calendar, 
  Timer, 
  Star, 
  ArrowLeft, 
  Share2,
  Heart,
  Navigation,
  Tag
} from 'lucide-react';
import { 
  GallerySlider, 
  SpeechButton, 
  PlaceCard,
  FadeInUp,
  SlideInLeft,
  SlideInRight 
} from '@/components';
import { Place, getPlacesByCategory, getCategoryById } from '@/data';

interface PlaceDetailClientProps {
  place: Place;
}

export default function PlaceDetailClient({ place }: PlaceDetailClientProps) {
  const category = getCategoryById(place.category);
  const relatedPlaces = getPlacesByCategory(place.category)
    .filter(p => p.id !== place.id)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: place.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.location.coordinates.lat},${place.location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={place.heroImage}
          alt={place.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-24 left-4 md:left-8 z-10"
        >
          <Link href="/places">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Places</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-24 right-4 md:right-8 z-10 flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-3 rounded-full glass text-white hover:bg-white/20 transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full glass text-white hover:bg-white/20 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                  style={{ 
                    backgroundColor: `${category?.color}20`,
                    color: category?.color 
                  }}
                >
                  {category?.icon} {category?.name}
                </span>
                <div className="flex items-center gap-1 glass px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{place.rating}</span>
                </div>
                {place.featured && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
                {place.name}
              </h1>

              {/* Bangla Name */}
              <p className="text-xl text-white/70 font-bangla mb-4">
                {place.nameBangla}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-white/60">
                <MapPin className="w-5 h-5" />
                <span>{place.location.address}, {place.location.area}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Gallery */}
              <SlideInLeft>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    📸 Gallery
                  </h2>
                  <GallerySlider images={place.gallery} title={place.name} />
                </div>
              </SlideInLeft>

              {/* Description */}
              <FadeInUp>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      📖 About This Place
                    </h2>
                    <SpeechButton 
                      text={place.fullDescription} 
                      variant="inline"
                    />
                  </div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed text-lg">
                      {place.fullDescription}
                    </p>
                  </div>
                </div>
              </FadeInUp>

              {/* Highlights */}
              <FadeInUp delay={0.1}>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    ✨ Highlights
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {place.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-xl glass"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-white/80">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Tags */}
              <FadeInUp delay={0.2}>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Tag className="w-6 h-6" /> Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {place.tags.map((tag, index) => (
                      <Link 
                        key={index}
                        href={`/places?search=${tag}`}
                        className="px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:bg-white/20 transition-colors text-sm"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Map */}
              <FadeInUp delay={0.3}>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    🗺️ Location
                  </h2>
                  <div className="relative aspect-video rounded-2xl overflow-hidden glass">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${place.location.coordinates.lng}!3d${place.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sbd!4v1234567890`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openInMaps}
                      className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white font-medium shadow-lg"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </motion.button>
                  </div>
                </div>
              </FadeInUp>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <SlideInRight>
                <div className="sticky top-28 space-y-6">
                  {/* Visit Info Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl glass border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-6">
                      Visit Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <Clock className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white/50 text-sm">Opening Hours</p>
                          <p className="text-white">{place.visitInfo.openingHours}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-yellow-500/20">
                          <Ticket className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white/50 text-sm">Entry Fee</p>
                          <p className="text-white">{place.visitInfo.entryFee}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white/50 text-sm">Best Time to Visit</p>
                          <p className="text-white">{place.visitInfo.bestTime}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <Timer className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white/50 text-sm">Duration</p>
                          <p className="text-white">{place.visitInfo.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openInMaps}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-5 h-5" />
                        Get Directions
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Read Aloud Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl glass border border-white/10"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">
                      🎧 Listen to Description
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      Let us read the description aloud while you relax.
                    </p>
                    <SpeechButton 
                      text={place.fullDescription}
                      className="w-full justify-center"
                    />
                  </motion.div>

                  {/* Quick Facts */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl glass border border-white/10"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">
                      📍 Quick Facts
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between">
                        <span className="text-white/50">Area</span>
                        <span className="text-white">{place.location.area}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-white/50">City</span>
                        <span className="text-white">{place.location.city}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-white/50">Category</span>
                        <span className="text-white capitalize">{place.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-white/50">Rating</span>
                        <span className="text-white flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          {place.rating}
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </SlideInRight>
            </div>
          </div>
        </div>
      </section>

      {/* Related Places */}
      {relatedPlaces.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-transparent via-[#0B1220]/50 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <FadeInUp>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  More {category?.name} Places
                </h2>
                <p className="text-white/60">
                  Explore similar destinations you might love
                </p>
              </div>
            </FadeInUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPlaces.map((relatedPlace, index) => (
                <PlaceCard
                  key={relatedPlace.id}
                  place={relatedPlace}
                  index={index}
                />
              ))}
            </div>

            <FadeInUp className="text-center mt-12">
              <Link href="/places">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full border-2 border-emerald-500 text-emerald-400 font-medium hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  View All Places
                </motion.button>
              </Link>
            </FadeInUp>
          </div>
        </section>
      )}
    </>
  );
}
