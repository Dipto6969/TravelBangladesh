// Types for Bangladesh Travel Guide

export type PlaceCategory = 
  | 'historic'
  | 'cultural'
  | 'nature'
  | 'modern'
  | 'food'
  | 'nightlife'
  | 'religious'
  | 'shopping';

export interface Place {
  id: string;
  slug: string;
  name: string;
  nameBangla: string;
  category: PlaceCategory;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  gallery: string[];
  location: {
    address: string;
    area: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  visitInfo: {
    openingHours: string;
    entryFee: string;
    bestTime: string;
    duration: string;
  };
  highlights: string[];
  tags: string[];
  featured: boolean;
  rating: number;
}

export interface Category {
  id: PlaceCategory;
  name: string;
  nameBangla: string;
  icon: string;
  description: string;
  color: string;
}

export interface NavLink {
  label: string;
  href: string;
}
