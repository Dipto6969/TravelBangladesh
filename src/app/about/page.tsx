'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Target, Eye, Users, ArrowRight, MapPin, Camera, Globe } from 'lucide-react';
import { FadeInUp, ScaleIn, SlideInLeft, SlideInRight } from '@/components';
import { siteConfig, stats } from '@/data';

const team = [
  {
    name: 'The Vision',
    role: 'Why We Built This',
    description: 'To showcase the beauty of Bangladesh to the world and inspire travelers to explore its hidden gems.',
    icon: Eye,
    color: 'emerald'
  },
  {
    name: 'The Mission',
    role: 'What We Do',
    description: 'We curate the most stunning places, share authentic stories, and make travel planning effortless and inspiring.',
    icon: Target,
    color: 'yellow'
  },
  {
    name: 'The Community',
    role: 'Who We Serve',
    description: 'Travelers, photographers, culture enthusiasts, and anyone with a curious heart and wanderlust spirit.',
    icon: Users,
    color: 'blue'
  }
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Travel',
    description: 'We believe every journey has the power to transform perspectives and create lasting memories.'
  },
  {
    icon: Camera,
    title: 'Visual Storytelling',
    description: 'Through stunning imagery and immersive design, we bring destinations to life before you even visit.'
  },
  {
    icon: Globe,
    title: 'Cultural Appreciation',
    description: 'We celebrate the rich heritage, traditions, and diversity that make Bangladesh unique.'
  },
  {
    icon: MapPin,
    title: 'Local Insights',
    description: 'Our guides are crafted with local knowledge to help you experience authentic Bangladesh.'
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Bangladesh landscape"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/90 to-[#0B1220]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                About Us
              </span>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                We&apos;re Building a{' '}
                <span className="text-gradient">Love Letter</span>{' '}
                to Bangladesh
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-xl text-white/70 leading-relaxed">
                {siteConfig.description} Our mission is to inspire wanderlust and help 
                travelers discover the magic that awaits in every corner of this beautiful country.
              </p>
            </FadeInUp>
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

      {/* Vision, Mission, Community */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-shadow-black mb-4">
              Our Purpose
            </h2>
            <p className="text-shadow-black/60 max-w-2xl mx-auto">
              We&apos;re more than just a travel guide — we&apos;re storytellers, 
              culture enthusiasts, and passionate advocates for Bangladesh.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((item, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-2xl glass border border-white/10 text-center h-full"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-${item.color}-500/20 mb-6`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-emerald-400 text-sm mb-4">{item.role}</p>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#0B1220]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInLeft>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80"
                    alt="Lalbagh Fort"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#0B1220]"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&q=80"
                    alt="Parliament"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                From a Dream to a Digital Journey
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Travel Bangladesh was born from a simple yet powerful idea: to showcase 
                  the incredible beauty, rich history, and warm hospitality that Bangladesh 
                  has to offer the world.
                </p>
                <p>
                  Too often, Bangladesh remains an undiscovered gem on the global travel map. 
                  We wanted to change that narrative through stunning visuals, compelling stories, 
                  and an immersive digital experience.
                </p>
                <p>
                  Every place featured on this platform has been carefully selected, researched, 
                  and presented with love. Our goal is simple: to make you fall in love with 
                  Bangladesh before you even set foot here.
                </p>
              </div>
              <Link href="/places" className="inline-block mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium"
                >
                  Start Exploring
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-shadow-black mb-4">
              What We Believe In
            </h2>
            <p className="text-shadow-black/60 max-w-2xl mx-auto">
              Our values guide everything we do, from the places we feature 
              to the stories we tell.
            </p>
          </FadeInUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl glass border border-white/10 h-full"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/20 w-fit mb-4">
                    <value.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.description}</p>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScaleIn>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-shadow-black mb-6">
                Join Us on This Journey
              </h2>
            </ScaleIn>

            <FadeInUp delay={0.1}>
              <p className="text-xl text-shadow-black/70 mb-10">
                Whether you&apos;re planning your first trip or you&apos;re a seasoned 
                explorer, there&apos;s always something new to discover.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/places">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg"
                  >
                    Explore Places
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/20 transition-all"
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
