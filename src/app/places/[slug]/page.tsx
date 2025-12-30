import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaceBySlug, getAllSlugs, siteConfig } from '@/data';
import PlaceDetailClient from './PlaceDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    return {
      title: 'Place Not Found',
    };
  }

  return {
    title: `${place.name} | ${siteConfig.name}`,
    description: place.shortDescription,
    openGraph: {
      title: place.name,
      description: place.shortDescription,
      images: [place.heroImage],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  return <PlaceDetailClient place={place} />;
}
