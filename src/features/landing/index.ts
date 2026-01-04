/**
 * Landing Feature - Public API
 */

// Main component (default export for lazy loading)
export { default } from './components/LandingPage';

// Named exports
export { default as LandingPage } from './components/LandingPage';
export { default as HeroBanner } from './components/HeroBanner';
export { default as ProductCard } from './components/ProductCard';
export { default as CategoryFilter } from './components/CategoryFilter';
export { default as SectionHeader } from './components/SectionHeader';

// Hooks
export { useLandingPage } from './hooks/useLandingPage';

// Types (to be added)
// export type { Product, Category } from './types';
