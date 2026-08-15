export type ProductStatus = "in-stock" | "pre-order" | "backorder" | "sold-out";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAt?: number;
  image: string;
  images?: string[];
  category: string;
  theme: string;
  status: ProductStatus;
  exclusive?: boolean;
  shipReady?: boolean;
  newArrival?: boolean;
  trending?: boolean;
  justAdded?: boolean;
  rating?: number;
  reviewCount?: number;
  sku: string;
  description: string;
  features?: string[];
  releaseDate?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  count: number;
  image: string;
}

export interface ThemeFacet {
  id: string;
  label: string;
  keywords: string[];
}

export interface Theme {
  slug: string;
  name: string;
  image: string;
  /** Wide listing-page banner (EE-style 1140×~200 header). */
  banner: string;
  color: string;
  count: number;
  tagline: string;
  description: string;
  subthemes?: ThemeFacet[];
  collections?: ThemeFacet[];
  characters?: ThemeFacet[];
}

export interface Brand {
  name: string;
  mark: string;
  tone: string;
  bg: string;
  image: string;
  count: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  accent: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
