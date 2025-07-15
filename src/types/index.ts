export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface ProductColor {
  name: string;
  value: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  upvotes: number;
  downvotes: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}