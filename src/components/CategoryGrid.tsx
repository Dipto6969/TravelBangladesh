'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/data';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
  className?: string;
}

export default function CategoryGrid({ className }: CategoryGridProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/places?category=${category.id}`}>
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-6 rounded-2xl glass border border-white/10 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle at center, ${category.color}, transparent)` 
                }}
              />

              {/* Icon */}
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                className="text-4xl block mb-3"
              >
                {category.icon}
              </motion.span>

              {/* Name */}
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {category.name}
              </h3>

              {/* Bangla Name */}
              <p className="text-white/50 text-sm font-bangla">
                {category.nameBangla}
              </p>

              {/* Description on hover */}
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: 'auto' }}
                className="text-white/60 text-xs mt-2 line-clamp-2"
              >
                {category.description}
              </motion.p>

              {/* Decorative Corner */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: category.color }}
              />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
