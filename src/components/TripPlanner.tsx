'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GripVertical, 
  X, 
  MapPin, 
  Clock, 
  Plus,
  Trash2,
  Download,
  Share2,
  Calendar
} from 'lucide-react';
import { Place } from '@/data/types';
import { cn } from '@/lib/utils';

interface TripPlannerProps {
  allPlaces: Place[];
  isOpen: boolean;
  onClose: () => void;
}

interface ItineraryItem {
  id: string;
  place: Place;
  notes: string;
  duration: number; // in minutes
}

export function TripPlanner({ allPlaces, isOpen, onClose }: TripPlannerProps) {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPanel, setShowAddPanel] = useState(false);

  const filteredPlaces = allPlaces.filter(place => 
    !itinerary.some(item => item.place.slug === place.slug) &&
    (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     place.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToItinerary = useCallback((place: Place) => {
    const newItem: ItineraryItem = {
      id: `${place.slug}-${Date.now()}`,
      place,
      notes: '',
      duration: 60
    };
    setItinerary(prev => [...prev, newItem]);
    setShowAddPanel(false);
    setSearchQuery('');
  }, []);

  const removeFromItinerary = useCallback((id: string) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateDuration = useCallback((id: string, duration: number) => {
    setItinerary(prev => prev.map(item => 
      item.id === id ? { ...item, duration } : item
    ));
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setItinerary(prev => prev.map(item => 
      item.id === id ? { ...item, notes } : item
    ));
  }, []);

  const totalDuration = itinerary.reduce((sum, item) => sum + item.duration, 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  const exportItinerary = useCallback(() => {
    const text = itinerary.map((item, index) => 
      `${index + 1}. ${item.place.name}\n   Duration: ${item.duration} minutes\n   ${item.notes ? `Notes: ${item.notes}` : ''}`
    ).join('\n\n');
    
    const blob = new Blob([`Dhaka Trip Itinerary\n\nTotal Duration: ${hours}h ${minutes}m\n\n${text}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dhaka-itinerary.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [itinerary, hours, minutes]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] bg-[#0B1220] rounded-3xl overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-emerald-400" />
                  Trip Planner
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Drag and drop places to create your perfect itinerary
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-180px)]">
              {/* Itinerary List */}
              <div className="flex-1 p-6 overflow-y-auto">
                {itinerary.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white/30" />
                    </div>
                    <p className="text-white/50 mb-4">Your itinerary is empty</p>
                    <button
                      onClick={() => setShowAddPanel(true)}
                      className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                      Add your first destination
                    </button>
                  </div>
                ) : (
                  <Reorder.Group 
                    axis="y" 
                    values={itinerary} 
                    onReorder={setItinerary}
                    className="space-y-3"
                  >
                    {itinerary.map((item, index) => (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        className="group"
                      >
                        <motion.div
                          layout
                          className="flex gap-4 p-4 rounded-xl glass border border-white/10 hover:border-emerald-500/30 transition-colors cursor-grab active:cursor-grabbing"
                        >
                          {/* Drag Handle */}
                          <div className="flex items-center">
                            <GripVertical className="w-5 h-5 text-white/30 group-hover:text-white/50" />
                          </div>

                          {/* Number */}
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>

                          {/* Image */}
                          <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.place.heroImage}
                              alt={item.place.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {item.place.name}
                            </h3>
                            <p className="text-white/50 text-sm truncate">
                              {item.place.location.area}
                            </p>
                            <input
                              type="text"
                              placeholder="Add notes..."
                              value={item.notes}
                              onChange={(e) => updateNotes(item.id, e.target.value)}
                              className="mt-2 w-full px-2 py-1 rounded bg-white/5 text-white/70 text-xs placeholder:text-white/30 border border-transparent focus:border-emerald-500/50 focus:outline-none"
                            />
                          </div>

                          {/* Duration */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-white/50" />
                              <select
                                value={item.duration}
                                onChange={(e) => updateDuration(item.id, Number(e.target.value))}
                                className="bg-transparent text-white/70 text-sm focus:outline-none cursor-pointer"
                              >
                                <option value={30} className="bg-[#0B1220]">30 min</option>
                                <option value={60} className="bg-[#0B1220]">1 hour</option>
                                <option value={90} className="bg-[#0B1220]">1.5 hours</option>
                                <option value={120} className="bg-[#0B1220]">2 hours</option>
                                <option value={180} className="bg-[#0B1220]">3 hours</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeFromItinerary(item.id)}
                              className="p-1 rounded hover:bg-rose-500/20 text-white/30 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                )}

                {/* Add More Button */}
                {itinerary.length > 0 && (
                  <button
                    onClick={() => setShowAddPanel(true)}
                    className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-white/20 text-white/50 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add more places
                  </button>
                )}
              </div>

              {/* Add Panel */}
              <AnimatePresence>
                {showAddPanel && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="border-l border-white/10 overflow-hidden"
                  >
                    <div className="w-80 h-full flex flex-col">
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-white">Add Places</h3>
                          <button
                            onClick={() => setShowAddPanel(false)}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                          >
                            <X className="w-4 h-4 text-white/50" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Search places..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg glass text-white placeholder:text-white/40 border border-white/10 focus:border-emerald-500/50 focus:outline-none"
                        />
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {filteredPlaces.map(place => (
                          <button
                            key={place.slug}
                            onClick={() => addToItinerary(place)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={place.heroImage}
                                alt={place.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{place.name}</p>
                              <p className="text-white/50 text-xs truncate capitalize">{place.category}</p>
                            </div>
                            <Plus className="w-4 h-4 text-emerald-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-white/60">
                <span className="font-semibold text-white">{itinerary.length}</span> places • 
                <span className="font-semibold text-emerald-400 ml-1">{hours}h {minutes}m</span> total
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportItinerary}
                  disabled={itinerary.length === 0}
                  className="px-4 py-2 rounded-full glass text-white text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  disabled={itinerary.length === 0}
                  className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium flex items-center gap-2 hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
