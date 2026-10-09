export type Category = 'Skin' | 'Fragrance' | 'Makeup' | 'Grooming' | 'Body' | 'Gifts';

export type Audience = 'Unisex' | 'Men' | 'Women';

export interface Shade {
  id: string;
  name: string;
  hex: string;
  undertone: 'Cool' | 'Warm' | 'Neutral' | 'Olive';
  description: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
  intensity: 'Subtle' | 'Moderate' | 'Intense' | 'Haute';
  sillage: 'Intimate' | 'Noticeable' | 'Enveloping';
  family: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  skinType?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  audience: Audience[];
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New' | 'Haute Exclusive' | 'Award Winner' | 'Limited Edition' | 'Sold Out' | 'Waitlist';
  benefit: string;
  description: string;
  concerns: string[];
  skinTypes: string[];
  keyIngredients: {
    name: string;
    role: string;
    description: string;
  }[];
  inciIngredients: string;
  sizes: {
    size: string;
    price: number;
  }[];
  shades?: Shade[];
  fragranceNotes?: FragranceNotes;
  images: string[];
  texture: string;
  usageSteps: string[];
  finish?: string;
  coverage?: string;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique cart entry key: product.id + size + (shade?.id || '')
  productId: string;
  product: Product;
  size: string;
  shade?: Shade;
  price: number;
  quantity: number;
}

export interface RitualStep {
  stepNumber: number;
  stepName: string;
  instruction: string;
  productId: string;
}

export interface Ritual {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  mood: string;
  timeOfDay: 'Morning' | 'Evening' | 'Anytime' | 'Weekend';
  description: string;
  image: string;
  accentColor: string;
  steps: RitualStep[];
  products: Product[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
  relatedProductIds: string[];
}

export interface FilterState {
  category: string;
  concern: string;
  skinType: string;
  audience: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'bestsellers';
  searchQuery: string;
}
