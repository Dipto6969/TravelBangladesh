import { Place } from './types';

export const dhakaPlaces: Place[] = [
  // ============ HISTORIC ============
  {
    id: '1',
    slug: 'lalbagh-fort',
    name: 'Lalbagh Fort',
    nameBangla: 'লালবাগ কেল্লা',
    category: 'historic',
    shortDescription: 'A 17th-century Mughal fort complex showcasing the grandeur of the Mughal Empire.',
    fullDescription: `Lalbagh Fort, also known as Fort Aurangabad, is an incomplete 17th-century Mughal fort complex that stands on the banks of the Buriganga River. Construction began in 1678 by Prince Muhammad Azam, son of Emperor Aurangzeb, and was later continued by Shaista Khan. The fort complex includes the Tomb of Pari Bibi (Fair Lady), the Audience Hall and Hammam, and the Lalbagh Mosque. The romantic legend of Pari Bibi, believed to be Shaista Khan's daughter, adds a mystical charm to this architectural marvel. The fort's incomplete status is often attributed to the death of Pari Bibi, after which Shaista Khan considered it inauspicious to continue. Today, it stands as one of Dhaka's most visited heritage sites, offering a glimpse into the city's Mughal past.`,
    heroImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80'
    ],
    location: {
      address: 'Lalbagh Road, Lalbagh',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7188, lng: 90.3882 }
    },
    visitInfo: {
      openingHours: '10:00 AM - 6:00 PM (Closed on Sundays)',
      entryFee: 'BDT 20 (Locals), BDT 200 (Foreigners)',
      bestTime: 'October to March',
      duration: '2-3 hours'
    },
    highlights: ['Tomb of Pari Bibi', 'Mughal Gardens', 'Audience Hall', 'Ancient Mosque'],
    tags: ['mughal', 'heritage', 'architecture', 'history', 'photography'],
    featured: true,
    rating: 4.7
  },
  {
    id: '2',
    slug: 'ahsan-manzil',
    name: 'Ahsan Manzil',
    nameBangla: 'আহসান মঞ্জিল',
    category: 'historic',
    shortDescription: 'The Pink Palace - former residence of the Nawabs of Dhaka, now a museum.',
    fullDescription: `Ahsan Manzil, famously known as the Pink Palace, is one of the most significant architectural heritage sites in Bangladesh. Built in 1872 by Nawab Abdul Ghani, this magnificent Indo-Saracenic Revival architecture served as the official residential palace and seat of the Nawab of Dhaka. The palace witnessed many historic events, including the first formal meeting that led to the creation of the All India Muslim League. After years of neglect and damage from the 1888 tornado and 1897 earthquake, it was extensively renovated and converted into a museum in 1992. The palace features 23 rooms displaying portraits, furniture, and household items of the Nawab family, offering visitors a window into the aristocratic lifestyle of 19th-century Dhaka.`,
    heroImage: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=800&q=80',
      'https://images.unsplash.com/photo-1582560475093-ba66accbc953?w=800&q=80'
    ],
    location: {
      address: 'Kumartoli, Islampur Road',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7082, lng: 90.4066 }
    },
    visitInfo: {
      openingHours: '10:30 AM - 5:30 PM (Closed on Thursdays)',
      entryFee: 'BDT 20 (Locals), BDT 200 (Foreigners)',
      bestTime: 'November to February',
      duration: '1-2 hours'
    },
    highlights: ['Pink Palace Architecture', 'Nawab Family Museum', 'Buriganga River View', 'Historic Ballroom'],
    tags: ['palace', 'museum', 'nawab', 'pink-palace', 'colonial'],
    featured: true,
    rating: 4.6
  },
  {
    id: '3',
    slug: 'shaheed-minar',
    name: 'Shaheed Minar',
    nameBangla: 'শহীদ মিনার',
    category: 'historic',
    shortDescription: 'The national monument commemorating the Language Movement martyrs of 1952.',
    fullDescription: `Shaheed Minar, or the Martyr Monument, is a national monument established to commemorate those killed during the Bengali Language Movement demonstrations of 1952. On February 21, 1952, several students and activists were killed by Pakistani police while demanding recognition of Bengali as one of the state languages. The original monument was demolished by the government, but it was rebuilt in 1963 with a more elaborate design. The structure represents a mother with her martyred sons, symbolizing the sacrifice made for the mother tongue. Every year on February 21 (now observed as International Mother Language Day by UNESCO), millions gather here to pay tribute, creating a sea of flowers and songs celebrating the Bengali language.`,
    heroImage: 'https://images.unsplash.com/photo-1590586767908-20d6d1b6db58?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590586767908-20d6d1b6db58?w=800&q=80'
    ],
    location: {
      address: 'Dhaka Medical College Campus',
      area: 'Shahbag',
      city: 'Dhaka',
      coordinates: { lat: 23.7271, lng: 90.3975 }
    },
    visitInfo: {
      openingHours: 'Open 24 hours',
      entryFee: 'Free',
      bestTime: 'February 21 (Ekushey February)',
      duration: '30 minutes - 1 hour'
    },
    highlights: ['Language Movement Memorial', 'February 21 Celebrations', 'Night Photography', 'Cultural Significance'],
    tags: ['memorial', 'language-movement', 'martyrs', 'history', 'ekushey'],
    featured: true,
    rating: 4.8
  },
  {
    id: '4',
    slug: 'curzon-hall',
    name: 'Curzon Hall',
    nameBangla: 'কার্জন হল',
    category: 'historic',
    shortDescription: 'A stunning British Raj-era building with European and Mughal architectural fusion.',
    fullDescription: `Curzon Hall is a British Raj-era building and former town hall located in the University of Dhaka campus. Named after Lord Curzon, the Viceroy of India who laid its foundation stone in 1904, it was originally intended to be a town hall but became part of Dhaka University in 1921. The building showcases a beautiful blend of European and Mughal architectural elements, featuring red brick construction, horseshoe arches, and intricate decorative motifs. The striking red building set against lush green lawns creates one of Dhaka's most photographed scenes. Curzon Hall has witnessed many historical events and remains an active part of the university, housing the Faculty of Science.`,
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80'
    ],
    location: {
      address: 'University of Dhaka Campus',
      area: 'Shahbag',
      city: 'Dhaka',
      coordinates: { lat: 23.7285, lng: 90.3973 }
    },
    visitInfo: {
      openingHours: 'Campus open during university hours',
      entryFee: 'Free',
      bestTime: 'Morning or late afternoon',
      duration: '1 hour'
    },
    highlights: ['Colonial Architecture', 'University Campus Walk', 'Photography Spot', 'Historical Significance'],
    tags: ['colonial', 'university', 'architecture', 'british-raj', 'photography'],
    featured: false,
    rating: 4.5
  },
  {
    id: '5',
    slug: 'armenian-church',
    name: 'Armenian Church',
    nameBangla: 'আর্মেনীয় গির্জা',
    category: 'historic',
    shortDescription: 'The oldest church in Dhaka, built in 1781 by the Armenian community.',
    fullDescription: `The Armenian Church of the Holy Resurrection is the oldest church in Dhaka, built in 1781 by the Armenian community who were prominent traders in the region. The church stands as a testament to the diverse cultural history of Dhaka and the significant Armenian presence during the Mughal period. The cemetery within the church compound contains graves dating back to the late 17th century, making it a fascinating site for history enthusiasts. Though the Armenian community has dwindled, the church remains a protected heritage site, featuring beautiful stained glass windows and colonial-era architecture.`,
    heroImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80'
    ],
    location: {
      address: 'Armanitola',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7098, lng: 90.4058 }
    },
    visitInfo: {
      openingHours: 'By appointment',
      entryFee: 'Free',
      bestTime: 'Morning hours',
      duration: '1 hour'
    },
    highlights: ['Ancient Cemetery', 'Stained Glass', 'Colonial Architecture', 'Heritage Site'],
    tags: ['church', 'armenian', 'heritage', 'colonial', 'cemetery'],
    featured: false,
    rating: 4.3
  },

  // ============ CULTURAL ============
  {
    id: '6',
    slug: 'national-museum',
    name: 'Bangladesh National Museum',
    nameBangla: 'বাংলাদেশ জাতীয় জাদুঘর',
    category: 'cultural',
    shortDescription: 'The largest museum in Bangladesh showcasing art, history, and natural heritage.',
    fullDescription: `The Bangladesh National Museum is the largest museum in Bangladesh, established in 1913 and moved to its current building in Shahbag in 1983. The museum houses over 83,000 artifacts spread across 46 galleries on four floors. Collections span prehistory to modern times, including archaeological finds, ethnographic materials, decorative arts, natural history specimens, and contemporary art. Highlights include ancient sculptures, terracotta works, the Liberation War gallery, and traditional crafts. The museum serves as a cultural treasure trove, preserving and presenting the rich heritage of Bengal.`,
    heroImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80'
    ],
    location: {
      address: 'Shahbag',
      area: 'Shahbag',
      city: 'Dhaka',
      coordinates: { lat: 23.7377, lng: 90.3944 }
    },
    visitInfo: {
      openingHours: '10:30 AM - 5:30 PM (Closed Thursdays & holidays)',
      entryFee: 'BDT 20 (Locals), BDT 200 (Foreigners)',
      bestTime: 'Weekday mornings',
      duration: '2-3 hours'
    },
    highlights: ['Archaeological Gallery', 'Liberation War Collection', 'Natural History Section', 'Art Gallery'],
    tags: ['museum', 'history', 'art', 'culture', 'education'],
    featured: true,
    rating: 4.4
  },
  {
    id: '7',
    slug: 'liberation-war-museum',
    name: 'Liberation War Museum',
    nameBangla: 'মুক্তিযুদ্ধ জাদুঘর',
    category: 'cultural',
    shortDescription: 'A powerful museum documenting Bangladesh\'s 1971 Liberation War.',
    fullDescription: `The Liberation War Museum is dedicated to the memory of the 1971 Bangladesh Liberation War. Founded in 1996, it moved to its current nine-story purpose-built facility in Agargaon in 2017. The museum houses an extensive collection of photographs, documents, newspapers, and artifacts from the war, including weapons, personal belongings of freedom fighters, and evidence of genocide. Through multimedia presentations and interactive displays, visitors experience the struggle for independence and the sacrifice of millions. The museum serves as both a memorial and an educational institution, ensuring future generations never forget the price of freedom.`,
    heroImage: 'https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=800&q=80'
    ],
    location: {
      address: 'F11/A-B, Agargaon',
      area: 'Agargaon',
      city: 'Dhaka',
      coordinates: { lat: 23.7784, lng: 90.3652 }
    },
    visitInfo: {
      openingHours: '10:00 AM - 6:00 PM (Closed Sundays)',
      entryFee: 'BDT 30 (Adults), BDT 10 (Students)',
      bestTime: 'December (Victory Month)',
      duration: '2-3 hours'
    },
    highlights: ['War Artifacts', 'Documentary Screenings', 'Martyr Memorials', 'Interactive Exhibits'],
    tags: ['liberation-war', '1971', 'history', 'memorial', 'museum'],
    featured: true,
    rating: 4.9
  },
  {
    id: '8',
    slug: 'national-parliament',
    name: 'National Parliament Building',
    nameBangla: 'জাতীয় সংসদ ভবন',
    category: 'cultural',
    shortDescription: 'Louis Kahn\'s architectural masterpiece - one of the largest legislative complexes.',
    fullDescription: `The Jatiya Sangsad Bhaban, or National Parliament House, is one of the largest legislative complexes in the world and a masterpiece of 20th-century architecture. Designed by renowned architect Louis I. Kahn, the building took over 20 years to complete (1961-1982). The structure is characterized by its geometric precision, with massive concrete walls punctuated by circular, triangular, and linear openings that create dramatic light patterns throughout the day. Set on 200 acres of landscaped grounds, the complex includes the main parliament building, a lake, gardens, and auxiliary structures. It stands as a symbol of Bangladesh's democracy and architectural ambition.`,
    heroImage: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80'
    ],
    location: {
      address: 'Sher-e-Bangla Nagar',
      area: 'Agargaon',
      city: 'Dhaka',
      coordinates: { lat: 23.7625, lng: 90.3778 }
    },
    visitInfo: {
      openingHours: 'Exterior viewable anytime; Interior tours by arrangement',
      entryFee: 'Free (Exterior)',
      bestTime: 'Golden hour for photography',
      duration: '1-2 hours'
    },
    highlights: ['Louis Kahn Architecture', 'Geometric Design', 'Lakeside Views', 'Brutalist Masterpiece'],
    tags: ['architecture', 'parliament', 'louis-kahn', 'brutalist', 'landmark'],
    featured: true,
    rating: 4.8
  },
  {
    id: '9',
    slug: 'shilpakala-academy',
    name: 'Bangladesh Shilpakala Academy',
    nameBangla: 'বাংলাদেশ শিল্পকলা একাডেমি',
    category: 'cultural',
    shortDescription: 'The national academy for fine and performing arts.',
    fullDescription: `Bangladesh Shilpakala Academy is the national academy for fine and performing arts, established in 1974 to promote and preserve Bangladeshi culture and arts. Located in the heart of Dhaka, it serves as a hub for artists, musicians, dancers, and cultural enthusiasts. The academy hosts regular exhibitions, performances, workshops, and festivals throughout the year, including the prestigious Asian Art Biennale. With multiple galleries, auditoriums, and studios, it provides a platform for both established and emerging artists to showcase their work and connect with audiences.`,
    heroImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
    ],
    location: {
      address: 'Segunbagicha',
      area: 'Ramna',
      city: 'Dhaka',
      coordinates: { lat: 23.7335, lng: 90.4147 }
    },
    visitInfo: {
      openingHours: '10:00 AM - 8:00 PM',
      entryFee: 'Varies by event',
      bestTime: 'During festivals and exhibitions',
      duration: '1-3 hours'
    },
    highlights: ['Art Exhibitions', 'Live Performances', 'Cultural Festivals', 'Art Workshops'],
    tags: ['art', 'culture', 'gallery', 'performance', 'academy'],
    featured: false,
    rating: 4.3
  },

  // ============ RELIGIOUS ============
  {
    id: '10',
    slug: 'baitul-mukarram',
    name: 'Baitul Mukarram Mosque',
    nameBangla: 'বায়তুল মোকাররম মসজিদ',
    category: 'religious',
    shortDescription: 'The National Mosque of Bangladesh with a striking modernist design.',
    fullDescription: `Baitul Mukarram, meaning "The Holy House," is the national mosque of Bangladesh and one of the largest mosques in the world. Completed in 1968, its design is inspired by the Kaaba in Mecca, featuring a striking rectangular form that sets it apart from traditional domed mosques. The mosque complex spans over 8 acres and can accommodate up to 40,000 worshippers. The modernist architecture, designed by Abdulhusein Muzharul Islam, blends Islamic geometric patterns with contemporary design. The mosque also houses a library, conference rooms, and a funeral prayer area (Janaza Gah), making it a center of religious and community life.`,
    heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80'
    ],
    location: {
      address: 'Paltan, Near Dhaka Stadium',
      area: 'Paltan',
      city: 'Dhaka',
      coordinates: { lat: 23.7319, lng: 90.4124 }
    },
    visitInfo: {
      openingHours: 'Open during prayer times',
      entryFee: 'Free',
      bestTime: 'Friday prayers (Jummah)',
      duration: '30 minutes - 1 hour'
    },
    highlights: ['Kaaba-Inspired Design', 'Modernist Architecture', 'Largest Mosque', 'Jummah Prayers'],
    tags: ['mosque', 'religious', 'architecture', 'islamic', 'national'],
    featured: true,
    rating: 4.7
  },
  {
    id: '11',
    slug: 'star-mosque',
    name: 'Star Mosque (Tara Masjid)',
    nameBangla: 'তারা মসজিদ',
    category: 'religious',
    shortDescription: 'A stunning mosque decorated with mosaic stars and Chinese tiles.',
    fullDescription: `Tara Masjid, or the Star Mosque, is one of the most ornate mosques in Dhaka. Built in the early 19th century, it gets its name from the exquisite star motifs created from blue-tinted Japanese and English chinaware that adorn its surface. The mosque was originally built in Mughal style but was later renovated with colorful mosaics and tiles, giving it a distinctive appearance that sets it apart from other mosques. The interior features floral designs, geometric patterns, and beautiful arched mihrabs. Despite its relatively small size, the Star Mosque is one of Old Dhaka's most photographed landmarks.`,
    heroImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80'
    ],
    location: {
      address: 'Armanitola, Abul Khairat Road',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7093, lng: 90.4047 }
    },
    visitInfo: {
      openingHours: 'Open during prayer times',
      entryFee: 'Free',
      bestTime: 'Morning light',
      duration: '30 minutes'
    },
    highlights: ['Star Mosaic Art', 'Chinese Tile Work', 'Colorful Interior', 'Mughal Architecture'],
    tags: ['mosque', 'mosaic', 'old-dhaka', 'heritage', 'art'],
    featured: true,
    rating: 4.6
  },
  {
    id: '12',
    slug: 'dhakeshwari-temple',
    name: 'Dhakeshwari Temple',
    nameBangla: 'ঢাকেশ্বরী মন্দির',
    category: 'religious',
    shortDescription: 'The most important Hindu temple in Bangladesh, dating back to the 12th century.',
    fullDescription: `Dhakeshwari Temple is the most important Hindu temple in Bangladesh and is closely linked to the city's name and history. Legend says the temple was established in the 12th century by Ballal Sen of the Sena dynasty, who placed an idol of the goddess Dhakeshwari here. The temple complex includes shrines to multiple deities, with the main temple dedicated to Goddess Durga. After suffering damage during the 1971 Liberation War, the temple was extensively restored. It serves as the center of Hindu religious celebrations in Bangladesh, particularly during Durga Puja when thousands of devotees gather for prayers and festivities.`,
    heroImage: 'https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=800&q=80'
    ],
    location: {
      address: 'Dhakeshwari Road',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7214, lng: 90.3895 }
    },
    visitInfo: {
      openingHours: '6:00 AM - 8:00 PM',
      entryFee: 'Free',
      bestTime: 'Durga Puja (October)',
      duration: '1 hour'
    },
    highlights: ['Ancient Temple', 'Durga Puja Celebrations', 'Religious Architecture', 'Cultural Heritage'],
    tags: ['temple', 'hindu', 'heritage', 'religious', 'ancient'],
    featured: false,
    rating: 4.5
  },

  // ============ NATURE & PARKS ============
  {
    id: '13',
    slug: 'hatirjheel',
    name: 'Hatirjheel',
    nameBangla: 'হাতিরঝিল',
    category: 'nature',
    shortDescription: 'A stunning urban lakefront with bridges, walkways, and evening light shows.',
    fullDescription: `Hatirjheel is a spectacular waterfront development project that transformed a previously polluted canal system into one of Dhaka's most beautiful urban spaces. Completed in 2013, the 302-acre project features a scenic lake, pedestrian walkways, cycling paths, and multiple iconic bridges including the Chinese-inspired Shetu Bridge. The area comes alive in the evening with a stunning light show that illuminates the bridges and lakefront. Hatirjheel has become a favorite spot for Dhaka residents seeking respite from the city's chaos, offering spaces for walking, photography, and simply enjoying the waterfront views.`,
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    ],
    location: {
      address: 'Hatirjheel, Tejgaon',
      area: 'Tejgaon',
      city: 'Dhaka',
      coordinates: { lat: 23.7632, lng: 90.4052 }
    },
    visitInfo: {
      openingHours: 'Open 24 hours',
      entryFee: 'Free',
      bestTime: 'Evening (for light show)',
      duration: '1-2 hours'
    },
    highlights: ['Evening Light Show', 'Scenic Bridges', 'Lakefront Walking', 'Night Photography'],
    tags: ['lake', 'urban-park', 'photography', 'walking', 'evening'],
    featured: true,
    rating: 4.6
  },
  {
    id: '14',
    slug: 'ramna-park',
    name: 'Ramna Park',
    nameBangla: 'রমনা পার্ক',
    category: 'nature',
    shortDescription: 'A historic green oasis in the heart of Dhaka, perfect for morning walks.',
    fullDescription: `Ramna Park is a historic public park spread over 68 acres in the heart of Dhaka. Originally developed during the Mughal period as the Bagh-e-Badshahi (Imperial Garden), it was redesigned during British rule and remains one of the city's most beloved green spaces. The park features tree-lined paths, flowering gardens, a lake, and the famous Ramna Batamul (Banyan tree), which serves as the venue for the traditional Pahela Baishakh (Bengali New Year) celebrations. Morning joggers, families on picnics, and couples seeking shade fill the park daily, making it a cherished refuge from urban life.`,
    heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
    ],
    location: {
      address: 'Ramna',
      area: 'Ramna',
      city: 'Dhaka',
      coordinates: { lat: 23.7400, lng: 90.3980 }
    },
    visitInfo: {
      openingHours: '5:00 AM - 8:00 PM',
      entryFee: 'Free',
      bestTime: 'Early morning or Pahela Baishakh',
      duration: '1-2 hours'
    },
    highlights: ['Historic Banyan Tree', 'Bengali New Year Venue', 'Morning Jogging', 'Lake Gardens'],
    tags: ['park', 'nature', 'jogging', 'pahela-baishakh', 'green-space'],
    featured: false,
    rating: 4.4
  },
  {
    id: '15',
    slug: 'dhanmondi-lake',
    name: 'Dhanmondi Lake',
    nameBangla: 'ধানমন্ডি লেক',
    category: 'nature',
    shortDescription: 'A serene urban lake surrounded by walkways, eateries, and greenery.',
    fullDescription: `Dhanmondi Lake is one of Dhaka's most popular recreational spots, stretching through the residential Dhanmondi area. The lake, which was once a natural canal, has been developed with walking paths, sitting areas, and well-maintained gardens along its banks. The area around the lake is dotted with restaurants, cafes, and ice cream shops, making it a favorite destination for families and young people. Boating facilities are available, and the lake promenade offers a peaceful escape for evening walks. The Rabindra Sarobar concert venue hosts cultural events, adding to the area's appeal.`,
    heroImage: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80'
    ],
    location: {
      address: 'Dhanmondi',
      area: 'Dhanmondi',
      city: 'Dhaka',
      coordinates: { lat: 23.7470, lng: 90.3752 }
    },
    visitInfo: {
      openingHours: 'Open 24 hours',
      entryFee: 'Free',
      bestTime: 'Evening',
      duration: '1-2 hours'
    },
    highlights: ['Lakeside Walking', 'Boat Rides', 'Cafes & Restaurants', 'Cultural Events'],
    tags: ['lake', 'walking', 'boating', 'cafes', 'recreation'],
    featured: false,
    rating: 4.3
  },
  {
    id: '16',
    slug: 'gulshan-lake',
    name: 'Gulshan Lake',
    nameBangla: 'গুলশান লেক',
    category: 'nature',
    shortDescription: 'An upscale lakefront area surrounded by embassies and high-end restaurants.',
    fullDescription: `Gulshan Lake is situated in one of Dhaka's most affluent neighborhoods, surrounded by embassies, five-star hotels, and upscale restaurants. The lake, also known as Gulshan-Baridhara Lake, spans across Gulshan and Baridhara areas, offering a scenic waterfront in the diplomatic zone. The lake park features jogging tracks, sitting areas, and beautiful landscaping. The surrounding area is home to some of Dhaka's best dining options, making it a popular destination for both recreation and fine dining. The reflection of modern high-rises in the calm lake waters creates a striking urban landscape.`,
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80'
    ],
    location: {
      address: 'Gulshan',
      area: 'Gulshan',
      city: 'Dhaka',
      coordinates: { lat: 23.7925, lng: 90.4146 }
    },
    visitInfo: {
      openingHours: 'Open 24 hours',
      entryFee: 'Free',
      bestTime: 'Evening',
      duration: '1 hour'
    },
    highlights: ['Upscale Dining', 'Diplomatic Quarter', 'Modern Skyline', 'Jogging Track'],
    tags: ['lake', 'gulshan', 'upscale', 'dining', 'modern'],
    featured: false,
    rating: 4.2
  },
  {
    id: '17',
    slug: 'botanical-garden',
    name: 'National Botanical Garden',
    nameBangla: 'জাতীয় উদ্ভিদ উদ্যান',
    category: 'nature',
    shortDescription: 'A 208-acre garden showcasing diverse plant species from Bangladesh and beyond.',
    fullDescription: `The National Botanical Garden, located in Mirpur, is the largest of its kind in Bangladesh, spreading over 208 acres. Established in 1961, the garden houses over 50,000 trees belonging to more than 2,000 species, including rare and exotic plants from around the world. The garden is divided into themed sections including rose gardens, palm collections, bamboo groves, and aquatic plant displays. Walking paths wind through the greenery, offering visitors a peaceful retreat from the city. The garden also serves as a research and conservation facility, protecting endangered plant species.`,
    heroImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80'
    ],
    location: {
      address: 'Mirpur',
      area: 'Mirpur',
      city: 'Dhaka',
      coordinates: { lat: 23.8127, lng: 90.3509 }
    },
    visitInfo: {
      openingHours: '9:00 AM - 5:00 PM (Closed Sundays)',
      entryFee: 'BDT 10',
      bestTime: 'Spring (February-March)',
      duration: '2-3 hours'
    },
    highlights: ['Rose Garden', 'Rare Plant Species', 'Nature Photography', 'Peaceful Walks'],
    tags: ['garden', 'nature', 'plants', 'botanical', 'peaceful'],
    featured: false,
    rating: 4.4
  },

  // ============ FOOD ============
  {
    id: '18',
    slug: 'star-kabab',
    name: 'Star Kabab & Restaurant',
    nameBangla: 'স্টার কাবাব',
    category: 'food',
    shortDescription: 'Legendary Old Dhaka eatery famous for its mouth-watering kebabs.',
    fullDescription: `Star Kabab & Restaurant is an iconic Old Dhaka establishment that has been serving legendary kebabs for decades. Located in the heart of the old city, this modest restaurant has become a pilgrimage site for food lovers seeking authentic Mughlai cuisine. Their signature dishes include Shami Kebab, Boti Kebab, and the famous Star Special Biryani. The tender, perfectly spiced kebabs are prepared using recipes passed down through generations. Despite its simple appearance, Star Kabab attracts everyone from local workers to celebrities, all united by their love for extraordinary kebabs.`,
    heroImage: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80'
    ],
    location: {
      address: 'Nazira Bazaar, Chawkbazar',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7200, lng: 90.3975 }
    },
    visitInfo: {
      openingHours: '12:00 PM - 11:00 PM',
      entryFee: 'N/A (Restaurant)',
      bestTime: 'Lunch or dinner',
      duration: '1-2 hours'
    },
    highlights: ['Legendary Kebabs', 'Biryani', 'Old Dhaka Experience', 'Mughlai Cuisine'],
    tags: ['food', 'kebab', 'restaurant', 'old-dhaka', 'biryani'],
    featured: true,
    rating: 4.7
  },
  {
    id: '19',
    slug: 'haji-biryani',
    name: 'Haji Biryani',
    nameBangla: 'হাজী বিরিয়ানি',
    category: 'food',
    shortDescription: 'The most famous biryani destination in Dhaka since 1939.',
    fullDescription: `Haji Biryani is perhaps the most legendary name in Dhaka's culinary history. Established in 1939, this Old Dhaka institution has been serving its signature Kacchi Biryani (raw meat biryani) for over eight decades. The biryani is cooked in the traditional dum style, where marinated raw meat is layered with aromatic basmati rice and slow-cooked in sealed pots, allowing the flavors to meld perfectly. The result is tender, fall-off-the-bone meat infused with rich spices. A meal at Haji Biryani is a must for anyone wanting to experience the authentic taste of Dhaka's culinary heritage.`,
    heroImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80'
    ],
    location: {
      address: 'Kazi Alauddin Road, Lalbagh',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7215, lng: 90.3898 }
    },
    visitInfo: {
      openingHours: '11:00 AM - 10:00 PM',
      entryFee: 'N/A (Restaurant)',
      bestTime: 'Lunch (limited portions)',
      duration: '1 hour'
    },
    highlights: ['Kacchi Biryani', 'Since 1939', 'Authentic Recipe', 'Legendary Status'],
    tags: ['food', 'biryani', 'restaurant', 'old-dhaka', 'legendary'],
    featured: true,
    rating: 4.8
  },
  {
    id: '20',
    slug: 'new-market-street-food',
    name: 'New Market Street Food Zone',
    nameBangla: 'নিউ মার্কেট স্ট্রীট ফুড',
    category: 'food',
    shortDescription: 'A vibrant street food paradise offering Dhaka\'s favorite snacks.',
    fullDescription: `The New Market area is not just about shopping; it's home to one of Dhaka's most vibrant street food scenes. Surrounding the main market building, vendors serve up an array of beloved Bangladeshi street snacks. From Fuchka (pani puri) and Chotpoti to Jhalmuri and fresh fruit juices, the options are endless. The area truly comes alive in the evening when office-goers and shoppers crowd around vendors for their favorite treats. The sensory experience of sizzling snacks, aromatic spices, and bustling crowds makes this an authentic taste of Dhaka street life.`,
    heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
    ],
    location: {
      address: 'New Market, Mirpur Road',
      area: 'Dhanmondi',
      city: 'Dhaka',
      coordinates: { lat: 23.7345, lng: 90.3845 }
    },
    visitInfo: {
      openingHours: '10:00 AM - 10:00 PM',
      entryFee: 'N/A',
      bestTime: 'Evening',
      duration: '1-2 hours'
    },
    highlights: ['Fuchka', 'Chotpoti', 'Jhalmuri', 'Evening Street Scene'],
    tags: ['street-food', 'fuchka', 'snacks', 'evening', 'shopping'],
    featured: false,
    rating: 4.5
  },
  {
    id: '21',
    slug: 'puran-dhaka-food-trail',
    name: 'Puran Dhaka Food Trail',
    nameBangla: 'পুরান ঢাকার খাবার',
    category: 'food',
    shortDescription: 'A culinary journey through the historic lanes of Old Dhaka.',
    fullDescription: `Puran Dhaka (Old Dhaka) is a food lover's paradise, offering a culinary experience unlike anywhere else in Bangladesh. The narrow lanes of Chawkbazar, Shakhari Bazar, and Banglabazar hide generations-old food establishments serving Mughlai-influenced cuisine. Must-try items include Bakarkhani (sweet bread), Borhani (spiced yogurt drink), Sheermal, various types of halwa from Alauddin Sweets, and the famous rooftop Iftar spreads during Ramadan. A food trail through Old Dhaka is not just about eating; it's about experiencing centuries of culinary tradition in one of South Asia's oldest urban centers.`,
    heroImage: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80'
    ],
    location: {
      address: 'Old Dhaka (Chawkbazar, Shakhari Bazar)',
      area: 'Old Dhaka',
      city: 'Dhaka',
      coordinates: { lat: 23.7150, lng: 90.4000 }
    },
    visitInfo: {
      openingHours: 'Varies by establishment',
      entryFee: 'N/A',
      bestTime: 'Evening or during Ramadan',
      duration: '3-4 hours'
    },
    highlights: ['Bakarkhani', 'Borhani', 'Traditional Sweets', 'Ramadan Iftar'],
    tags: ['food-trail', 'old-dhaka', 'mughlai', 'sweets', 'heritage'],
    featured: true,
    rating: 4.6
  },

  // ============ SHOPPING ============
  {
    id: '22',
    slug: 'new-market',
    name: 'New Market (Nilkhet)',
    nameBangla: 'নিউ মার্কেট',
    category: 'shopping',
    shortDescription: 'Dhaka\'s oldest and most famous shopping destination.',
    fullDescription: `New Market, officially named K.M. Das Lane Market, is Dhaka's oldest and most iconic shopping destination. Established in 1952, this covered market complex houses over 2,000 shops selling everything from clothes and shoes to electronics and home goods. The market is famous for bargaining, and skilled negotiators can find amazing deals. Adjacent to the main building, the book market at Nilkhet offers thousands of titles at discounted prices. The atmosphere is quintessentially Dhaka – crowded, colorful, and chaotic, but utterly charming for those seeking an authentic local shopping experience.`,
    heroImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80'
    ],
    location: {
      address: 'Mirpur Road, Dhanmondi',
      area: 'Dhanmondi',
      city: 'Dhaka',
      coordinates: { lat: 23.7350, lng: 90.3850 }
    },
    visitInfo: {
      openingHours: '9:00 AM - 9:00 PM (Closed Tuesdays)',
      entryFee: 'Free',
      bestTime: 'Weekday afternoons',
      duration: '2-4 hours'
    },
    highlights: ['Bargain Shopping', 'Book Market', 'Local Experience', 'Variety of Goods'],
    tags: ['shopping', 'market', 'books', 'bargain', 'traditional'],
    featured: false,
    rating: 4.2
  },

  // ============ NIGHTLIFE ============
  {
    id: '23',
    slug: 'banani-11',
    name: 'Banani Block 11 (Banani 11)',
    nameBangla: 'বনানী ব্লক ১১',
    category: 'nightlife',
    shortDescription: 'Dhaka\'s trendiest food and hangout street.',
    fullDescription: `Banani Block 11, commonly known as Banani 11, is Dhaka's most happening street for food and nightlife. This stretch of road is lined with trendy cafes, restaurants, dessert shops, and fast-food joints, attracting a young, fashionable crowd. From Korean BBQ to Italian pasta, Thai curries to American burgers, the culinary options are diverse. The street comes alive after sunset, with well-dressed youth spilling out of restaurants and cafes, creating a vibrant, cosmopolitan atmosphere. It's the perfect spot for dinner, dessert, or simply people-watching in Dhaka's hippest neighborhood.`,
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
    ],
    location: {
      address: 'Block 11, Banani',
      area: 'Banani',
      city: 'Dhaka',
      coordinates: { lat: 23.7940, lng: 90.4045 }
    },
    visitInfo: {
      openingHours: '11:00 AM - 11:00 PM',
      entryFee: 'N/A',
      bestTime: 'Evening (7 PM - 10 PM)',
      duration: '2-3 hours'
    },
    highlights: ['Trendy Restaurants', 'Night Scene', 'International Cuisine', 'Youth Culture'],
    tags: ['nightlife', 'restaurants', 'trendy', 'youth', 'food-street'],
    featured: true,
    rating: 4.5
  },
  {
    id: '24',
    slug: 'hatirjheel-bridge-lights',
    name: 'Hatirjheel Bridge Light Show',
    nameBangla: 'হাতিরঝিল ব্রিজ লাইট শো',
    category: 'nightlife',
    shortDescription: 'A mesmerizing evening light show across Hatirjheel\'s bridges.',
    fullDescription: `The Hatirjheel Bridge Light Show is one of Dhaka's most spectacular evening attractions. As dusk falls, the bridges spanning the Hatirjheel lake come alive with thousands of LED lights that create dancing patterns reflected in the water below. The most impressive is the Chinese-inspired Shetu Bridge, which displays a symphony of colors that change throughout the evening. The walking paths along the lake offer perfect vantage points to enjoy the show while taking a leisurely stroll. This free nightly spectacle has become a favorite date spot and family outing destination.`,
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'
    ],
    location: {
      address: 'Hatirjheel, Tejgaon',
      area: 'Tejgaon',
      city: 'Dhaka',
      coordinates: { lat: 23.7632, lng: 90.4052 }
    },
    visitInfo: {
      openingHours: 'Light show: 6:00 PM - 10:00 PM',
      entryFee: 'Free',
      bestTime: 'After sunset',
      duration: '1-2 hours'
    },
    highlights: ['LED Light Show', 'Bridge Reflections', 'Evening Walk', 'Photography Spot'],
    tags: ['lights', 'evening', 'photography', 'romantic', 'free'],
    featured: true,
    rating: 4.7
  },

  // ============ MODERN ============
  {
    id: '25',
    slug: 'jamuna-future-park',
    name: 'Jamuna Future Park',
    nameBangla: 'যমুনা ফিউচার পার্ক',
    category: 'modern',
    shortDescription: 'South Asia\'s largest shopping and entertainment complex.',
    fullDescription: `Jamuna Future Park is a massive mixed-use development and one of the largest shopping malls in South Asia. Opened in 2013, the complex spans over 4.5 million square feet and includes shopping areas, an indoor amusement park, a water park, cinemas, and numerous dining options. The mall houses hundreds of local and international brands, making it a one-stop destination for shopping and entertainment. The architecture features a striking glass facade and modern design. For visitors seeking a break from traditional sightseeing, Jamuna Future Park offers a glimpse into modern Dhaka's retail and entertainment culture.`,
    heroImage: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80'
    ],
    location: {
      address: 'Kuril, Progoti Sarani',
      area: 'Kuril',
      city: 'Dhaka',
      coordinates: { lat: 23.8136, lng: 90.4235 }
    },
    visitInfo: {
      openingHours: '10:00 AM - 10:00 PM',
      entryFee: 'Free (Attractions separately)',
      bestTime: 'Weekday afternoons',
      duration: '3-5 hours'
    },
    highlights: ['Mega Shopping', 'Amusement Park', 'Water Park', 'Cinema Complex'],
    tags: ['mall', 'shopping', 'entertainment', 'modern', 'family'],
    featured: false,
    rating: 4.3
  }
];

// Utility functions
export const getPlaceBySlug = (slug: string): Place | undefined => {
  return dhakaPlaces.find(place => place.slug === slug);
};

export const getFeaturedPlaces = (): Place[] => {
  return dhakaPlaces.filter(place => place.featured);
};

export const getPlacesByCategory = (category: string): Place[] => {
  return dhakaPlaces.filter(place => place.category === category);
};

export const searchPlaces = (query: string): Place[] => {
  const lowerQuery = query.toLowerCase();
  return dhakaPlaces.filter(place => 
    place.name.toLowerCase().includes(lowerQuery) ||
    place.nameBangla.includes(query) ||
    place.shortDescription.toLowerCase().includes(lowerQuery) ||
    place.tags.some(tag => tag.includes(lowerQuery))
  );
};

export const getAllSlugs = (): string[] => {
  return dhakaPlaces.map(place => place.slug);
};
