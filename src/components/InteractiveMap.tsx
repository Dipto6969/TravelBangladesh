'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Navigation, X } from 'lucide-react';
import { Place } from '@/data/types';
import { cn } from '@/lib/utils';

// Dynamic import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface InteractiveMapProps {
  places: Place[];
  className?: string;
  selectedPlace?: Place | null;
  onPlaceSelect?: (place: Place | null) => void;
  fullscreen?: boolean;
}

export function InteractiveMap({ 
  places, 
  className = '',
  selectedPlace,
  onPlaceSelect,
  fullscreen = false
}: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);
  const [activePlace, setActivePlace] = useState<Place | null>(selectedPlace || null);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
  const [activeIcon, setActiveIcon] = useState<L.Icon | null>(null);

  // Dhaka center coordinates
  const center: [number, number] = [23.7104, 90.4074];
  const zoom = 12;

  useEffect(() => {
    setMounted(true);
    
    // Import Leaflet only on client side
    import('leaflet').then((L) => {
      // Fix default marker icon issue
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      
      // Create custom icons
      const icon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const active = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [35, 57],
        iconAnchor: [17, 57],
        popupAnchor: [1, -34],
        shadowSize: [57, 57]
      });

      setCustomIcon(icon);
      setActiveIcon(active);
    });
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      setActivePlace(selectedPlace);
    }
  }, [selectedPlace]);

  const handlePlaceClick = (place: Place) => {
    setActivePlace(place);
    onPlaceSelect?.(place);
  };

  if (!mounted || !customIcon || !activeIcon) {
    return (
      <div className={cn('bg-[#0B1220] rounded-2xl flex items-center justify-center', className)}>
        <div className="text-white/50">Loading map...</div>
      </div>
    );
  }

  return (
    <div className={cn('relative rounded-2xl overflow-hidden', className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        style={{ background: '#0B1220' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {places.map((place) => (
          <Marker
            key={place.slug}
            position={[place.location.coordinates.lat, place.location.coordinates.lng]}
            icon={activePlace?.slug === place.slug ? activeIcon : customIcon}
            eventHandlers={{
              click: () => handlePlaceClick(place)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-0 min-w-[200px]">
                <div className="relative h-24 w-full">
                  <Image
                    src={place.heroImage}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-gray-600 text-sm">{place.nameBangla}</p>
                  <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{place.location.area}</span>
                  </div>
                  <Link 
                    href={`/places/${place.slug}`}
                    className="mt-2 block text-center py-1.5 rounded bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Place Info Card */}
      {activePlace && fullscreen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 w-80 glass rounded-2xl overflow-hidden z-[1000]"
        >
          <div className="relative h-40">
            <Image
              src={activePlace.heroImage}
              alt={activePlace.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <button
              onClick={() => {
                setActivePlace(null);
                onPlaceSelect?.(null);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 text-white text-xs capitalize">
                {activePlace.category}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{activePlace.name}</h3>
            <p className="text-white/60 text-sm font-bangla">{activePlace.nameBangla}</p>
            <p className="text-white/70 text-sm mt-2 line-clamp-2">{activePlace.shortDescription}</p>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{activePlace.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-white/50 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{activePlace.location.area}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/places/${activePlace.slug}`}
                className="flex-1 py-2 rounded-lg bg-emerald-500 text-white text-sm text-center font-medium hover:bg-emerald-600 transition-colors"
              >
                View Details
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activePlace.location.coordinates.lat},${activePlace.location.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Navigation className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      {fullscreen && (
        <div className="absolute bottom-4 right-4 glass rounded-lg p-3 z-[1000]">
          <p className="text-white/80 text-sm font-medium mb-2">Places</p>
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>{places.length} locations</span>
          </div>
        </div>
      )}
    </div>
  );
}
