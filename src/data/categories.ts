import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'historic',
    name: 'Historic',
    nameBangla: 'ঐতিহাসিক',
    icon: '🏛️',
    description: 'Step back in time through centuries of Mughal and British heritage',
    color: '#8B4513'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    nameBangla: 'সাংস্কৃতিক',
    icon: '🎭',
    description: 'Experience the rich cultural tapestry of Bangladesh',
    color: '#9B2335'
  },
  {
    id: 'nature',
    name: 'Nature & Parks',
    nameBangla: 'প্রকৃতি',
    icon: '🌳',
    description: 'Find peace in urban oases and natural retreats',
    color: '#0ea47a'
  },
  {
    id: 'modern',
    name: 'Modern',
    nameBangla: 'আধুনিক',
    icon: '🏙️',
    description: 'Discover the contemporary face of Dhaka',
    color: '#4A90D9'
  },
  {
    id: 'food',
    name: 'Food & Dining',
    nameBangla: 'খাবার',
    icon: '🍛',
    description: 'Savor the legendary flavors of Bengali cuisine',
    color: '#E3B23C'
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    nameBangla: 'রাতের দৃশ্য',
    icon: '🌃',
    description: 'Experience Dhaka after dark',
    color: '#6B5B95'
  },
  {
    id: 'religious',
    name: 'Religious',
    nameBangla: 'ধর্মীয়',
    icon: '🕌',
    description: 'Visit sacred sites and spiritual landmarks',
    color: '#45B8AC'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    nameBangla: 'কেনাকাটা',
    icon: '🛍️',
    description: 'Shop at bustling markets and modern malls',
    color: '#DD4132'
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};
