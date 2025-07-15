import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 12
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 18
  },
  {
    id: 'jeans',
    name: 'Jeans',
    image: 'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 15
  },
  {
    id: 'jackets',
    name: 'Jackets',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 10
  },
  {
    id: 'sneakers',
    name: 'Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 20
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    productCount: 25
  }
];

export const products: Product[] = [
  // Hoodies
  {
    id: '1',
    name: 'Premium Cotton Hoodie',
    price: 5799,
    originalPrice: 7499,
    discount: 22,
    rating: 4.8,
    reviewCount: 127,
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'Forest Green', value: '#228B22', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'Navy Blue', value: '#000080', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'hoodies',
    description: 'Crafted from premium 100% organic cotton, this hoodie combines comfort with sustainability.',
    features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
    inStock: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Urban Street Hoodie',
    price: 4999,
    originalPrice: 6599,
    discount: 25,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'Charcoal Gray', value: '#36454F', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'Black', value: '#000000', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'hoodies',
    description: 'Perfect for street style with a modern urban fit.',
    features: ['Cotton blend', 'Relaxed fit', 'Ribbed cuffs', 'Screen printed logo'],
    inStock: true,
    isNew: true
  },
  // T-Shirts
  {
    id: '3',
    name: 'Classic Cotton Tee',
    price: 2099,
    originalPrice: 2899,
    discount: 29,
    rating: 4.7,
    reviewCount: 203,
    images: [
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'White', value: '#FFFFFF', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'Navy', value: '#000080', image: 'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'tshirts',
    description: 'Essential cotton tee with perfect fit and premium quality.',
    features: ['100% cotton', 'Pre-shrunk', 'Crew neck', 'Short sleeves'],
    inStock: true,
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Graphic Print Tee',
    price: 2499,
    rating: 4.5,
    reviewCount: 156,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'Black', value: '#000000', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'tshirts',
    description: 'Bold graphic design on premium cotton blend.',
    features: ['Cotton blend', 'Graphic print', 'Regular fit', 'Soft feel'],
    inStock: true,
    isNew: true
  },
  // Jeans
  {
    id: '5',
    name: 'Slim Fit Jeans',
    price: 7499,
    originalPrice: 9999,
    discount: 25,
    rating: 4.6,
    reviewCount: 178,
    images: [
      'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'Dark Blue', value: '#1e3a8a', image: 'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'Black', value: '#000000', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    category: 'jeans',
    description: 'Premium denim with perfect slim fit and comfort stretch.',
    features: ['Stretch denim', 'Slim fit', '5-pocket design', 'Button fly'],
    inStock: true
  },
  // Sneakers
  {
    id: '6',
    name: 'Urban Runner Sneakers',
    price: 10799,
    originalPrice: 13299,
    discount: 19,
    rating: 4.8,
    reviewCount: 245,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: [
      { name: 'White', value: '#FFFFFF', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    category: 'sneakers',
    description: 'Comfortable running sneakers with modern design.',
    features: ['Breathable mesh', 'Cushioned sole', 'Lightweight', 'Durable rubber outsole'],
    inStock: true,
    isBestSeller: true
  }
];

export const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 8);
export const bestSellers = products.filter(p => p.isBestSeller);
export const newArrivals = products.filter(p => p.isNew);