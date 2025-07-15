import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  TrendingUp, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

interface ProductDetailPageProps {
  productId: string;
}

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing quality! The fabric is soft and the fit is perfect. Highly recommend!",
    upvotes: 15,
    downvotes: 2
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "1 week ago",
    comment: "Good quality hoodie, runs a bit large so consider sizing down. Great color options.",
    upvotes: 12,
    downvotes: 1
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "2 weeks ago",
    comment: "Perfect for layering! The material is thick enough for cold weather but not too heavy.",
    upvotes: 18,
    downvotes: 0
  }
];

const reviewInsights = {
  liked: [
    "Soft and comfortable fabric",
    "Perfect fit and sizing",
    "Great color options",
    "Durable construction",
    "Excellent value for money"
  ],
  disliked: [
    "Some color fading after washing",
    "Runs slightly large",
    "Limited seasonal availability",
    "Shipping could be faster"
  ],
  whyBuy: [
    "Top-rated in comfort category",
    "Free shipping to your location",
    "30-day return policy",
    "Sustainable organic cotton",
    "Currently 22% off - lowest price in 6 months",
    "Perfect for your climate zone"
  ]
};

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const { dispatch } = useApp();
  const product = products.find(p => p.id === productId);
  
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeReviewTab, setActiveReviewTab] = useState('whyBuy');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'shop' })}
            className="bg-[#B6F500] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedColor,
        selectedSize
      }
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[currentImage]} 
                alt="Product" 
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index ? 'border-[#B6F500]' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(Math.floor(product.rating))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>
                <span className="text-sm text-blue-600">
                  {product.reviewCount} reviews
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-[#B6F500] scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size 
                          ? 'border-[#B6F500] bg-[#B6F500] text-black' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#B6F500] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#A5E600] transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 border-2 py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isWishlisted 
                      ? 'border-red-500 bg-red-50 text-red-600' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Free shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">2-year warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">{product.description}</p>
            <ul className="text-gray-600 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(Math.floor(product.rating))}
                <span className="ml-2 text-lg font-semibold">{product.rating}</span>
                <span className="ml-1 text-gray-600">({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Review Insights Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveReviewTab('whyBuy')}
                className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                  activeReviewTab === 'whyBuy' 
                    ? 'bg-[#B6F500] text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Why you should buy this
              </button>
              <button
                onClick={() => setActiveReviewTab('liked')}
                className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                  activeReviewTab === 'liked' 
                    ? 'bg-[#B6F500] text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                What people liked
              </button>
              <button
                onClick={() => setActiveReviewTab('disliked')}
                className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                  activeReviewTab === 'disliked' 
                    ? 'bg-[#B6F500] text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                What people disliked
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              {activeReviewTab === 'whyBuy' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Why this product is perfect for you:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {reviewInsights.whyBuy.map((reason, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 flex items-start space-x-2">
                        <span className="text-[#B6F500] mt-1">✓</span>
                        <span className="text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeReviewTab === 'liked' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Most appreciated features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {reviewInsights.liked.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 flex items-start space-x-2">
                        <ThumbsUp className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeReviewTab === 'disliked' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Areas for improvement:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {reviewInsights.disliked.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 flex items-start space-x-2">
                        <ThumbsDown className="w-4 h-4 text-red-600 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{review.comment}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <button className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{review.upvotes}</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{review.downvotes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}