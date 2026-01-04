/**
 * Script to fetch real images from Wikimedia Commons and update dhakaPlaces.ts
 * Run with: npx tsx scripts/fetchWikimediaImages.ts
 */

import { searchWikimediaImages, getWikimediaImage, wikimediaPlaceImages } from '../src/lib/wikimedia';

// Bangladesh landmark search queries for Wikimedia Commons
const placeQueries: Record<string, string> = {
  'lalbagh-fort': 'Lalbagh Fort Dhaka Bangladesh',
  'ahsan-manzil': 'Ahsan Manzil Pink Palace Dhaka',
  'shaheed-minar': 'Shaheed Minar Dhaka Bangladesh',
  'curzon-hall': 'Curzon Hall University Dhaka',
  'national-parliament': 'Jatiyo Sangsad Bhaban Louis Kahn',
  'star-mosque': 'Tara Masjid Star Mosque Dhaka',
  'dhakeshwari-temple': 'Dhakeshwari Temple Dhaka',
  'armenian-church': 'Armenian Church Dhaka',
  'ramna-park': 'Ramna Park Dhaka',
  'hatirjheel': 'Hatirjheel Lake Dhaka',
  'botanical-garden': 'National Botanical Garden Mirpur Dhaka',
  'national-zoo': 'Dhaka Zoo Bangladesh',
  'liberation-war-museum': 'Liberation War Museum Dhaka',
  'national-museum': 'Bangladesh National Museum',
  'sadarghat': 'Sadarghat River Port Dhaka',
  'pink-city': 'Dhaka Pink City',
  'jamuna-future-park': 'Jamuna Future Park Dhaka',
  'bashundhara-city': 'Bashundhara City Shopping Mall',
  'new-market': 'New Market Dhaka',
  'gulshan-lake': 'Gulshan Lake Dhaka',
  'dhanmondi-lake': 'Dhanmondi Lake Dhaka',
  'science-museum': 'Science Museum Dhaka',
  'baitul-mukarram': 'Baitul Mukarram National Mosque',
  'shankhari-bazar': 'Shankhari Bazar Old Dhaka',
  'sonargaon': 'Sonargaon Folk Art Museum'
};

async function fetchImagesForPlace(slug: string, query: string) {
  console.log(`\n🔍 Fetching images for: ${slug}`);
  console.log(`   Query: ${query}`);
  
  try {
    // Try predefined filenames first
    const predefinedFilenames = wikimediaPlaceImages[slug];
    
    if (predefinedFilenames && predefinedFilenames.length > 0) {
      console.log(`   ✓ Using predefined filenames (${predefinedFilenames.length})`);
      const imagePromises = predefinedFilenames.map(filename => 
        getWikimediaImage(filename.replace('File:', ''))
      );
      const images = await Promise.all(imagePromises);
      const validImages = images.filter((url): url is string => url !== null);
      
      if (validImages.length > 0) {
        console.log(`   ✅ Found ${validImages.length} images`);
        return {
          heroImage: validImages[0],
          gallery: validImages.slice(0, 3)
        };
      }
    }
    
    // Fallback to search
    console.log(`   🔎 Searching Wikimedia Commons...`);
    const results = await searchWikimediaImages(query, 5);
    
    if (results.length > 0) {
      console.log(`   ✅ Found ${results.length} images from search`);
      return {
        heroImage: results[0].url,
        gallery: results.slice(0, 3).map(img => img.url)
      };
    }
    
    console.log(`   ⚠️  No images found`);
    return null;
  } catch (error) {
    console.error(`   ❌ Error:`, error);
    return null;
  }
}

async function main() {
  console.log('🚀 Fetching Wikimedia Commons images for Bangladesh landmarks...\n');
  
  const results: Record<string, any> = {};
  
  for (const [slug, query] of Object.entries(placeQueries)) {
    const images = await fetchImagesForPlace(slug, query);
    if (images) {
      results[slug] = images;
    }
    // Be nice to Wikimedia servers
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n\n📊 Results Summary:');
  console.log('==================');
  console.log(`Total places processed: ${Object.keys(placeQueries).length}`);
  console.log(`Successfully found images: ${Object.keys(results).length}`);
  console.log(`Failed: ${Object.keys(placeQueries).length - Object.keys(results).length}`);
  
  console.log('\n\n📝 Image URLs to update in dhakaPlaces.ts:\n');
  console.log('Copy and paste these into your place objects:\n');
  
  for (const [slug, images] of Object.entries(results)) {
    console.log(`// ${slug}`);
    console.log(`heroImage: '${images.heroImage}',`);
    console.log(`gallery: [`);
    images.gallery.forEach((url: string) => {
      console.log(`  '${url}',`);
    });
    console.log(`],\n`);
  }
  
  console.log('\n✨ Done! You can now manually update dhakaPlaces.ts with these URLs.');
}

main().catch(console.error);
