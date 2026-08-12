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
}

export interface Theme {
  slug: string;
  name: string;
  image: string;
  color: string;
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
