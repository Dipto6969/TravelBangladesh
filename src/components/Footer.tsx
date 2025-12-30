'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook, Heart, ArrowUp } from 'lucide-react';
import { navLinks, siteConfig, categories } from '@/data';
import { scrollToTop } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-midnight/95 to-black text-white">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-gold-500 to-emerald-500" />

      {/* Scroll to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg hover:shadow-emerald-500/25 transition-shadow"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>

      <div className="container mx-auto px-4 md:px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">{siteConfig.name}</span>
                <p className="text-xs text-white/60 font-bangla">{siteConfig.nameBangla}</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Explore</h3>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/places?category=${category.id}`}
                    className="text-white/60 hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:hello@travelbangladesh.com"
                  className="text-white/60 text-sm hover:text-emerald-400 transition-colors"
                >
                  hello@travelbangladesh.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="text-white/60 text-sm hover:text-emerald-400 transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
