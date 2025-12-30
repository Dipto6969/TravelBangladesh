import { NavLink } from './types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Places', href: '/places' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const siteConfig = {
  name: 'Travel Bangladesh',
  nameBangla: 'ভ্রমণ বাংলাদেশ',
  description: 'Discover the hidden gems and iconic landmarks of Bangladesh. A visual journey through culture, history, and natural beauty.',
  tagline: 'Where Every Journey Tells a Story',
  url: 'https://travel-bangladesh.vercel.app',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/travelbangladesh',
    github: 'https://github.com/travelbangladesh',
    instagram: 'https://instagram.com/travelbangladesh'
  },
  creator: 'Travel Bangladesh Team',
  keywords: [
    'Bangladesh travel',
    'Dhaka tourism',
    'Bangladesh places',
    'Bengali culture',
    'Travel guide',
    'Dhaka city guide'
  ]
};

export const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1920&q=80',
    title: 'Lalbagh Fort',
    subtitle: 'Where Mughal grandeur meets Bengali heritage',
    link: '/places/lalbagh-fort'
  },
  {
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1920&q=80',
    title: 'National Parliament',
    subtitle: 'A masterpiece of modern architecture',
    link: '/places/national-parliament'
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    title: 'Hatirjheel',
    subtitle: 'Urban beauty under the stars',
    link: '/places/hatirjheel'
  },
  {
    image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=1920&q=80',
    title: 'Ahsan Manzil',
    subtitle: 'The Pink Palace of dreams',
    link: '/places/ahsan-manzil'
  }
];

export const testimonials = [
  {
    quote: "Bangladesh is one of the most underrated travel destinations. The people are incredibly warm, and the heritage sites are breathtaking.",
    author: "Sarah Chen",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  },
  {
    quote: "Old Dhaka's food scene is unlike anything I've experienced. Every bite tells a story of centuries-old traditions.",
    author: "Michael Torres",
    role: "Food Critic",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
  },
  {
    quote: "The warmth of Bengali hospitality combined with the rich cultural tapestry makes Bangladesh a must-visit destination.",
    author: "Emma Wilson",
    role: "Cultural Photographer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
  }
];

export const stats = [
  { value: '25+', label: 'Places to Explore' },
  { value: '8', label: 'Categories' },
  { value: '∞', label: 'Memories to Make' },
  { value: '5000+', label: 'Years of History' }
];
