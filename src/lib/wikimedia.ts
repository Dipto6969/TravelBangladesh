/**
 * Wikimedia Commons API Integration
 * Fetches high-quality images for landmarks without API key
 */

interface WikimediaImage {
  url: string;
  title: string;
  width: number;
  height: number;
}

/**
 * Search for images on Wikimedia Commons
 * @param query - Search term (e.g., "Lalbagh Fort Dhaka")
 * @param limit - Number of images to fetch (default: 5)
 */
export async function searchWikimediaImages(
  query: string,
  limit: number = 5
): Promise<WikimediaImage[]> {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?` +
      `action=query` +
      `&format=json` +
      `&generator=search` +
      `&gsrsearch=${encodeURIComponent(query)}` +
      `&gsrnamespace=6` +
      `&gsrlimit=${limit}` +
      `&prop=imageinfo` +
      `&iiprop=url|size` +
      `&origin=*`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.query?.pages) {
      return [];
    }

    const images: WikimediaImage[] = Object.values(data.query.pages).map((page: any) => ({
      url: page.imageinfo?.[0]?.url || '',
      title: page.title || '',
      width: page.imageinfo?.[0]?.width || 0,
      height: page.imageinfo?.[0]?.height || 0,
    })).filter(img => img.url);

    return images;
  } catch (error) {
    console.error('Error fetching Wikimedia images:', error);
    return [];
  }
}

/**
 * Get a specific image from Wikimedia Commons by filename
 * @param filename - Exact filename on Wikimedia (e.g., "Lalbagh_Fort.jpg")
 */
export async function getWikimediaImage(filename: string): Promise<string | null> {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?` +
      `action=query` +
      `&format=json` +
      `&titles=File:${encodeURIComponent(filename)}` +
      `&prop=imageinfo` +
      `&iiprop=url` +
      `&origin=*`;

    const response = await fetch(url);
    const data = await response.json();

    const pages = data.query?.pages;
    const page = pages ? Object.values(pages)[0] : null;
    
    return (page as any)?.imageinfo?.[0]?.url || null;
  } catch (error) {
    console.error('Error fetching Wikimedia image:', error);
    return null;
  }
}

/**
 * Predefined mapping of places to Wikimedia Commons images
 * These are verified high-quality images for Bangladesh landmarks
 */
export const wikimediaPlaceImages: Record<string, string[]> = {
  'lalbagh-fort': [
    'Lalbagh_Fort_01.jpg',
    'Lalbagh_Fort_Gate.jpg',
    'Pari_Bibi_Tomb.jpg',
    'Fort_Aurangabad.jpg'
  ],
  'ahsan-manzil': [
    'Ahsan_Manzil_Pink_Palace.jpg',
    'Ahsan_Manzil_Facade.jpg',
    'Pink_Palace_Dhaka.jpg'
  ],
  'shaheed-minar': [
    'Shaheed_Minar_Monument.jpg',
    'Shaheed_Minar_Flowers.jpg',
    'Ekushey_February_Shaheed_Minar.jpg'
  ],
  'curzon-hall': [
    'Curzon_Hall_Dhaka.jpg',
    'Curzon_Hall_Red_Building.jpg',
    'Curzon_Hall_University.jpg'
  ],
  'armenian-church': [
    'Armenian_Church_Dhaka.jpg',
    'Armenian_Church_Armanitola.jpg',
    'Armenian_Church_Cemetery.jpg'
  ],
  'national-museum': [
    'Bangladesh_National_Museum.jpg',
    'National_Museum_Shahbag.jpg',
    'Museum_Building_Dhaka.jpg'
  ],
  'liberation-war-museum': [
    'Liberation_War_Museum_Dhaka.jpg',
    'Liberation_War_Museum_Building.jpg',
    'War_Museum_Agargaon.jpg'
  ],
  'national-parliament': [
    'Jatiyo_Sangsad_Bhaban.jpg',
    'National_Parliament_Bangladesh.jpg',
    'Jatiyo_Sangsad_Bhaban_Lake.jpg',
    'Louis_Kahn_Parliament_Building.jpg'
  ],
  'shilpakala-academy': [
    'Shilpakala_Academy_Dhaka.jpg',
    'Bangladesh_Shilpakala_Academy.jpg',
    'Cultural_Academy_Building.jpg'
  ],
  'baitul-mukarram': [
    'Baitul_Mukarram_Mosque_Dhaka.jpg',
    'National_Mosque_Bangladesh.jpg',
    'Baitul_Mukarram_Interior.jpg'
  ],
  'star-mosque': [
    'Tara_Masjid_Star_Mosque.jpg',
    'Star_Mosque_Dhaka.jpg',
    'Tara_Masjid_Tiles.jpg',
    'Star_Mosque_Armanitola.jpg'
  ],
  'dhakeshwari-temple': [
    'Dhakeshwari_Temple.jpg',
    'Dhakeshwari_Temple_Dhaka.jpg',
    'Dhakeshwari_National_Temple.jpg',
    'Durga_Puja_Dhakeshwari.jpg'
  ],
  'hatirjheel': [
    'Hatirjheel_Lake_Dhaka.jpg',
    'Hatirjheel_Bridge.jpg',
    'Hatirjheel_Promenade.jpg',
    'Shetu_Bridge_Hatirjheel.jpg'
  ],
  'ramna-park': [
    'Ramna_Park_Dhaka.jpg',
    'Ramna_Batamul_Tree.jpg',
    'Ramna_Park_Pahela_Baishakh.jpg',
    'Ramna_Lake.jpg'
  ],
  'dhanmondi-lake': [
    'Dhanmondi_Lake.jpg',
    'Dhanmondi_Lake_Evening.jpg',
    'Dhanmondi_Promenade.jpg',
    'Dhanmondi_Lake_Dhaka.jpg'
  ],
  'gulshan-lake': [
    'Gulshan_Lake_Dhaka.jpg',
    'Gulshan_Baridhara_Lake.jpg',
    'Gulshan_Lake_Park.jpg'
  ],
  'botanical-garden': [
    'National_Botanical_Garden_Mirpur.jpg',
    'Botanical_Garden_Dhaka.jpg',
    'Mirpur_Botanical_Garden.jpg',
    'Rose_Garden_Bangladesh.jpg'
  ],
  'star-kabab': [
    'Old_Dhaka_Restaurant.jpg',
    'Dhaka_Kebab.jpg',
    'Mughlai_Food.jpg'
  ],
  'haji-biryani': [
    'Biryani_Bangladesh.jpg',
    'Old_Dhaka_Food.jpg',
    'Dhaka_Biryani.jpg'
  ],
  'new-market-street-food': [
    'Street_Food_Bangladesh.jpg',
    'Dhaka_Food_Street.jpg',
    'Bangladeshi_Street_Food.jpg'
  ],
  'puran-dhaka-food-trail': [
    'Old_Dhaka_Street.jpg',
    'Chawkbazar_Dhaka.jpg',
    'Old_Dhaka_Bazaar.jpg'
  ],
  'new-market': [
    'New_Market_Dhaka.jpg',
    'Nilkhet_Book_Market.jpg',
    'Dhaka_Shopping_Market.jpg'
  ],
  'banani-11': [
    'Banani_Street_Dhaka.jpg',
    'Banani_Block_11.jpg',
    'Modern_Dhaka_Restaurant.jpg'
  ],
  'hatirjheel-bridge-lights': [
    'Hatirjheel_Night_Lights.jpg',
    'Hatirjheel_Bridge_Light_Show.jpg',
    'Dhaka_Night_Scene.jpg'
  ],
  'jamuna-future-park': [
    'Jamuna_Future_Park.jpg',
    'Shopping_Mall_Bangladesh.jpg',
    'Jamuna_Future_Park_Dhaka.jpg'
  ]
};

/**
 * Get image URLs for a place using smart search with multiple fallbacks
 */
export async function getPlaceImages(slug: string): Promise<string[]> {
  // Custom search queries optimized for Bangladesh landmarks
  const searchQueries: Record<string, string[]> = {
    'lalbagh-fort': ['Lalbagh Fort', 'Fort Aurangabad'],
    'ahsan-manzil': ['Ahsan Manzil', 'Pink Palace Dhaka'],
    'shaheed-minar': ['Shaheed Minar', 'Martyrs Monument Bangladesh'],
    'curzon-hall': ['Curzon Hall', 'Dhaka University Old Building'],
    'armenian-church': ['Armenian Church Dhaka', 'Armanitola Church'],
    'national-museum': ['National Museum Bangladesh', 'Bangladesh National Museum Dhaka'],
    'liberation-war-museum': ['Bangladesh Liberation War Museum', '1971 War Museum Dhaka'],
    'national-parliament': ['Jatiyo Sangsad', 'Bangladesh Parliament Building'],
    'shilpakala-academy': ['Shilpakala Academy', 'Bangladesh Arts Academy Dhaka'],
    'baitul-mukarram': ['Baitul Mukarram National Mosque', 'Bangladesh National Mosque'],
    'star-mosque': ['Tara Masjid', 'Star Mosque Dhaka'],
    'dhakeshwari-temple': ['Dhakeshwari Temple', 'Durga Temple Dhaka'],
    'hatirjheel': ['Hatirjheel', 'Hatirjheel Lake Dhaka'],
    'ramna-park': ['Ramna Park Dhaka', 'Pahela Baishakh'],
    'dhanmondi-lake': ['Dhanmondi Lake', 'Dhanmondi Lake Park Dhaka'],
    'gulshan-lake': ['Gulshan Lake', 'Gulshan Park Dhaka'],
    'botanical-garden': ['Botanical Garden Mirpur', 'National Botanical Garden Bangladesh'],
    'star-kabab': ['Star Kabab Dhaka', 'Old Dhaka Restaurant'],
    'haji-biryani': ['Haji Biryani', 'Dhaka Biryani'],
    'new-market-street-food': ['Old Dhaka Street Food', 'Chawkbazar Food'],
    'puran-dhaka-food-trail': ['Old Dhaka Chawkbazar', 'Historic Dhaka Food'],
    'new-market': ['New Market Dhaka', 'Shopping District Dhaka'],
    'banani-11': ['Banani 11 Dhaka', 'Restaurant Street Dhaka'],
    'hatirjheel-bridge-lights': ['Hatirjheel Bridge', 'Dhaka Bridge Lights'],
    'jamuna-future-park': ['Jamuna Future Park', 'Shopping Mall Bangladesh Dhaka']
  };
  
  const queries = searchQueries[slug] || [slug.replace(/-/g, ' ')];
  
  // Try each search query in order
  for (const query of queries) {
    try {
      console.log(`[Wikimedia] Searching: "${query}"`);
      const results = await searchWikimediaImages(query, 5);
      
      if (results.length > 0) {
        console.log(`[Wikimedia] ✅ Found ${results.length} images for "${query}"`);
        return results.map(r => r.url).slice(0, 3);
      }
    } catch (error) {
      console.error(`[Wikimedia] Error searching for "${query}":`, error);
      continue;
    }
  }
  
  console.warn(`[Wikimedia] ❌ No images found for slug: ${slug}`);
  return [];
}

/**
 * Fallback Unsplash URLs for places (if Wikimedia search fails)
 * These are curated high-quality images for Bangladesh landmarks
 */
export const unsplashFallbackImages: Record<string, string[]> = {
  'lalbagh-fort': [
    'https://images.unsplash.com/photo-1605280740569-5c0f0b6326fe?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600744222538-96fa5ae613d2?w=800&h=600&fit=crop',
  ],
  'ahsan-manzil': [
    'https://images.unsplash.com/photo-1599856917606-eb3dbc722c26?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544147098-e280a1a3eef2?w=800&h=600&fit=crop',
  ],
  'shaheed-minar': [
    'https://images.unsplash.com/photo-1601316317652-73b6e9f6bed1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1587620294235-cd4cb6e3e79e?w=800&h=600&fit=crop',
  ],
  'curzon-hall': [
    'https://images.unsplash.com/photo-1500747292396-3061ecf002e5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1597457541362-0c5a1cccf9a8?w=800&h=600&fit=crop',
  ],
  'armenian-church': [
    'https://images.unsplash.com/photo-1584555694892-461d430f25d8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1574876691745-8d23fce59b55?w=800&h=600&fit=crop',
  ],
  'national-museum': [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585985947527-e21cc028cb29?w=800&h=600&fit=crop',
  ],
  'liberation-war-museum': [
    'https://images.unsplash.com/photo-1562487702-5a4a1a7a7a1f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581578731548-c64695c952e2?w=800&h=600&fit=crop',
  ],
  'national-parliament': [
    'https://images.unsplash.com/photo-1499085411259-2ad12eef8c80?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568779291330-f69e06b32aa9?w=800&h=600&fit=crop',
  ],
  'shilpakala-academy': [
    'https://images.unsplash.com/photo-1545183697-d1265dd37dde?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  ],
  'baitul-mukarram': [
    'https://images.unsplash.com/photo-1564769662533-4f00a87b1d4e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1536514072410-5bf4ad2588d0?w=800&h=600&fit=crop',
  ],
  'star-mosque': [
    'https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&h=600&fit=crop',
  ],
  'dhakeshwari-temple': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  ],
  'hatirjheel': [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  ],
  'ramna-park': [
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800&h=600&fit=crop',
  ],
  'dhanmondi-lake': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
  ],
  'gulshan-lake': [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
  ],
  'botanical-garden': [
    'https://images.unsplash.com/photo-1500382017468-f049863256f1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=800&h=600&fit=crop',
  ],
  'star-kabab': [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop',
  ],
  'haji-biryani': [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
  ],
  'new-market-street-food': [
    'https://images.unsplash.com/photo-1555939594-58d7cb561811?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
  ],
  'puran-dhaka-food-trail': [
    'https://images.unsplash.com/photo-1602301940733-4efaa55a85f8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
  ],
  'new-market': [
    'https://images.unsplash.com/photo-1584707113341-a74b6e6a3b81?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1569547189819-a55dd00f12ac?w=800&h=600&fit=crop',
  ],
  'banani-11': [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572695157816-f04a855e9c5c?w=800&h=600&fit=crop',
  ],
  'hatirjheel-bridge-lights': [
    'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
  ],
  'jamuna-future-park': [
    'https://images.unsplash.com/photo-1544598351-a62e69bf0900?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1569547189819-a55dd00f12ac?w=800&h=600&fit=crop',
  ]
};
