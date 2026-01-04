'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Compass, Camera, Utensils } from 'lucide-react';
import { 
  HeroSlider, 
  PlaceCard, 
  CategoryGrid, 
  FadeInUp,
  ImageReveal,
  FloatingElement,
  ParallaxSection
} from '@/components';
import { getFeaturedPlaces, stats, testimonials, siteConfig } from '@/data';

export default function HomePage() {
  const featuredPlaces = getFeaturedPlaces();
  const featuredRef = useRef<HTMLElement>(null);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSlider onScrollDown={scrollToFeatured} />

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-yellow-500/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <FadeInUp>
                <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                  About Us
                </span>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-shadow-black">
                  Discover the{' '}
                  <span className="text-gradient">Heart of Bengal</span>
                </h2>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="text-lg text-shadow-black/70 mb-8 leading-relaxed">
                  {siteConfig.description} From ancient Mughal forts to modern architectural marvels, 
                  from bustling street food markets to serene lakefront promenades — Bangladesh awaits 
                  with open arms and countless stories to tell.
                </p>
              </FadeInUp>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: MapPin, text: '25+ Curated Places' },
                  { icon: Compass, text: 'Expert Travel Tips' },
                  { icon: Camera, text: 'Stunning Visuals' },
                  { icon: Utensils, text: 'Food Guides' },
                ].map((feature, index) => (
                  <FadeInUp key={index} delay={0.3 + index * 0.1}>
                    <div className="flex items-center gap-3 p-4 rounded-xl glass">
                      <feature.icon className="w-5 h-5 text-emerald-400" />
                      <span className="text-white/80">{feature.text}</span>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              <FadeInUp delay={0.6}>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-2 text-emerald-400 font-medium"
                  >
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </FadeInUp>
            </div>

            {/* Image Collage with Reveal Animations */}
            <div className="relative">
              <ParallaxSection speed={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="space-y-4"
                  >
                    <ImageReveal
                      src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80"
                      alt="Lalbagh Fort"
                      fill
                      containerClassName="relative aspect-[3/4] rounded-2xl"
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      direction="left"
                      delay={0.2}
                    />
                    <ImageReveal
                      src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80"
                      alt="Bengali Cuisine"
                      fill
                      containerClassName="relative aspect-square rounded-2xl"
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      direction="bottom"
                      delay={0.4}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: 10 }}
                    className="space-y-4 pt-8"
                  >
                    <ImageReveal
                      src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&q=80"
                      alt="Parliament Building"
                      fill
                      containerClassName="relative aspect-square rounded-2xl"
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      direction="right"
                      delay={0.3}
                    />
                    <ImageReveal
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                      alt="Hatirjheel"
                      fill
                      containerClassName="relative aspect-[3/4] rounded-2xl"
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      direction="top"
                      delay={0.5}
                    />
                  </motion.div>
                </div>
              </ParallaxSection>

              {/* Floating Stats Card */}
              <FloatingElement amplitude={15} duration={5}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-8 bottom-1/4 glass p-6 rounded-2xl shadow-2xl"
                >
                  <div className="text-3xl font-bold text-emerald-400">5000+</div>
                  <div className="text-white/60 text-sm">Years of History</div>
                </motion.div>
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-yellow-500/10" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-white/60">{stat.label}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places Section */}
      <section ref={featuredRef} className="py-24 relative" id="featured">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                Featured Destinations
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-shadow-black mb-4">
                Must-Visit Places in Dhaka
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg text-shadow-black/60 max-w-2xl mx-auto">
                Handpicked destinations that capture the essence of Dhaka&apos;s rich 
                heritage, vibrant culture, and modern charm.
              </p>
            </FadeInUp>
          </div>

          {/* Places Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredPlaces.slice(0, 6).map((place, index) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                index={index}
                variant={index === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>

          {/* View All CTA */}
          <FadeInUp className="text-center">
            <Link href="/places">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-emerald-500 text-emerald-400 font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300"
              >
                View All Places
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#0B1220]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                Explore By Interest
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-shadow-black mb-4">
                What Moves You?
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg text-shadow-black/60 max-w-2xl mx-auto">
                Whether you&apos;re a history buff, foodie, nature lover, or culture 
                enthusiast — there&apos;s something magical waiting for you.
              </p>
            </FadeInUp>
          </div>

          {/* Categories Grid */}
          <CategoryGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <FadeInUp>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                Testimonials
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-shadow-black mb-4">
                What Travelers Say
              </h2>
            </FadeInUp>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl glass border border-white/10 h-full flex flex-col"
                >
                  {/* Quote */}
                  <p className="text-white/80 italic mb-6 flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80"
            alt="Bangladesh landscape"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/80 to-[#0B1220]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInUp>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Ready to Start Your{' '}
                <span className="text-gradient">Journey?</span>
              </h2>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <p className="text-xl text-white/70 mb-10">
                Explore the wonders of Bangladesh. Every corner tells a story, 
                every street holds a surprise.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/places">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    Explore All Places
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    Get In Touch
                  </motion.button>
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  );
}
