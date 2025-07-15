import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

export default function WishlistPage() {
  const { dispatch } = useApp();

  // Mock wishlist items - in a real app, this would come from context/state
  const wishlistItems = products.slice(0, 4); // Mock data

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        selectedColor: product.colors[0]?.name || '',
        selectedSize: product.sizes[0] || ''
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    // In a real app, this would remove from wishlist state
    console.log('Remove from wishlist:', productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to your wishlist.</p>
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'shop' })}
              className="bg-[#B6F500] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors inline-flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'shop' })}
            className="flex items-center space-x-2 text-[#B6F500] hover:text-[#A5E600] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    -{item.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-[#B6F500] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: `product-${item.id}` })}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#B6F500] text-black p-2 rounded-lg hover:bg-[#A5E600] transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}