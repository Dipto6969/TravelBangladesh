// Components barrel export
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';
export { default as PlaceCard } from './PlaceCard';
export { default as SpeechButton } from './SpeechButton';
export { default as GallerySlider } from './GallerySlider';
export { default as HeroSlider } from './HeroSlider';
export { default as CategoryGrid } from './CategoryGrid';
export { ThemeProvider, useTheme } from './ThemeProvider';
export { 
  default as PageTransition,
  FadeInUp,
  ScaleIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  TextReveal
} from './PageTransitions';

// Animation Components
export { ParallaxHero, ParallaxSection, FloatingElement } from './ParallaxHero';
export { 
  LoadingSpinner, 
  PageLoader, 
  SuccessAnimation, 
  HeartAnimation,
  LocationPinAnimation,
  ScrollIndicator,
  TravelLoader,
  CameraAnimation
} from './LottieAnimations';
export { CustomCursor, Magnetic } from './CustomCursor';
export { ImageReveal, ClipTextReveal, RevealContainer, StaggerReveal } from './ImageReveal';
export { TiltCard, Card3D, HoverLift, MagneticHover, ShineCard } from './TiltCard';

// Interactive Features
export { FavoritesProvider, useFavorites } from './FavoritesContext';
export { FavoriteButton } from './FavoriteButton';
export { VirtualTour } from './VirtualTour';
export { TripPlanner } from './TripPlanner';
export { PhotoLightbox } from './PhotoLightbox';
export { InteractiveMap } from './InteractiveMap';
