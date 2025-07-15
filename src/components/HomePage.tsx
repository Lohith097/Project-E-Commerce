import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, TrendingUp, Zap, Shield, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { featuredProducts, bestSellers, newArrivals, categories } from '../data/products';
import ProductCard from './ProductCard';

export default function HomePage() {
  const { dispatch } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "New Collection",
      subtitle: "SPRING 2024",
      description: "Discover the latest trends in fashion with our premium collection",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Now"
    },
    {
      title: "Best Sellers",
      subtitle: "TOP RATED",
      description: "Join thousands of satisfied customers with our most loved products",
      image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Explore"
    },
    {
      title: "Limited Edition",
      subtitle: "EXCLUSIVE",
      description: "Premium quality meets exceptional design in our exclusive line",
      image: "https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Get Yours"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'shop' });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="relative h-full">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4 animate-in fade-in duration-1000">
                  <p className="text-[#B6F500] font-semibold text-lg mb-2 tracking-wider">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <button 
                      onClick={handleShopClick}
                      className="bg-[#B6F500] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A5E600] transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#B6F500] scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-[#B6F500] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center group">
              <div className="bg-[#B6F500] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>
            <div className="text-center group">
              <div className="bg-[#B6F500] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Express delivery in 2-3 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Discover our wide range of premium products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="group cursor-pointer"
                onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'categories' })}
              >
                <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.productCount} items
                    </span>
                  </div>
                </div>
                <h3 className="text-center font-semibold group-hover:text-[#B6F500] transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg">Handpicked favorites just for you</p>
            </div>
            <button 
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'shop' })}
              className="hidden md:flex items-center space-x-2 text-[#B6F500] hover:text-[#A5E600] font-semibold transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-[#B6F500]" />
                <span>Best Sellers</span>
              </h2>
              <p className="text-gray-600 text-lg">Most loved by our customers</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 text-lg mb-8">
            Get the latest updates on new products, exclusive offers, and fashion trends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#B6F500] focus:outline-none transition-colors"
            />
            <button className="bg-[#B6F500] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}