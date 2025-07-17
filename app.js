// SLAY Fashion Store - Complete E-commerce Application
// All functionality rebuilt from scratch

// Global State Management
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentPage = 'home';
let currentProduct = null;
let heroSlideIndex = 0;
let heroSlideInterval;

// DOM Elements
let mainContent, cartCount, userIndicator, mobileMenu, loginModal;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Get DOM elements
    mainContent = document.getElementById('main-content');
    cartCount = document.getElementById('cart-count');
    userIndicator = document.getElementById('user-indicator');
    mobileMenu = document.getElementById('mobile-menu');
    loginModal = document.getElementById('login-modal');

    // Update UI state
    updateCartCount();
    updateUserIndicator();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load home page
    loadPage('home');
}

function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const page = btn.getAttribute('data-page');
            loadPage(page);
            closeMobileMenu();
        });
    });

    // Logo click
    document.getElementById('logo-btn').addEventListener('click', () => {
        loadPage('home');
    });

    // Mobile menu toggle
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);

    // User button
    document.getElementById('user-btn').addEventListener('click', () => {
        if (currentUser) {
            showUserMenu();
        } else {
            showLoginModal();
        }
    });

    // Mobile user button
    document.getElementById('mobile-user-btn').addEventListener('click', () => {
        if (currentUser) {
            showUserMenu();
        } else {
            showLoginModal();
        }
        closeMobileMenu();
    });

    // Search functionality
    document.getElementById('search-input').addEventListener('input', handleSearch);
    document.querySelector('.mobile-search .search-input').addEventListener('input', handleSearch);

    // Note: Auth forms now handled on separate pages
}

// Page Loading System
function loadPage(page) {
    currentPage = page;
    
    // Update active navigation
    document.querySelectorAll('.nav-btn, .mobile-nav-btn,.footer-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === page) {
            btn.classList.add('active');
        }
    });   
    
    // Load page content
    switch(page) {
        case 'home':
            loadHomePage();
            break;
        case 'shop':
            loadShopPage();
            break;
        case 'categories':
            loadCategoriesPage();
            break;
        case 'cart':
            loadCartPage();
            break;
        case 'wishlist':
            loadWishlistPage();
            break;
        case 'sale':
            loadSalePage();
            break;
        case 'about':
            loadAboutPage();
            break;
        default:
            loadHomePage();
    }

    /*// Scroll to top
    window.scrollTo(0, 0);*/
    const active = document.activeElement;

    if (active && active.classList.contains('footer-link')) {
        const target = active.getAttribute('data-target');

        if (target) {
            // Only delay scroll if there's a target
            setTimeout(() => {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        } else {
            // No target → scroll to top instantly
            window.scrollTo(0, 0);
        }
    } else {
        // Not a footer link → scroll to top
        window.scrollTo(0, 0);
    }

}

// HOME PAGE
function loadHomePage() {
    clearInterval(heroSlideInterval);
    
    mainContent.innerHTML = `
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-slide active">
                <img src="https://images.pexels.com/photos/31367060/pexels-photo-31367060.png" alt="Fashion Collection" class="hero-image">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-text">
                        <p class="hero-subtitle">NEW COLLECTION</p>
                        <h1 class="hero-title">Style That Speaks</h1>
                        <p class="hero-description">Discover premium fashion that defines your unique style and makes every moment memorable.</p>
                        <button class="hero-cta" onclick="loadPage('shop')">
                            Shop Now
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="hero-slide">
                <img src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg" alt="Summer Collection" class="hero-image">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-text">
                        <p class="hero-subtitle">SUMMER ESSENTIALS</p>
                        <h1 class="hero-title">Beat the Heat</h1>
                        <p class="hero-description">Cool, comfortable, and stylish pieces perfect for the summer season.</p>
                        <button class="hero-cta" onclick="loadPage('shop')">
                            Explore Collection
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="hero-slide">
                <img src="https://images.pexels.com/photos/54206/pexels-photo-54206.jpeg" alt="Urban Style" class="hero-image">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-text">
                        <p class="hero-subtitle">URBAN COLLECTION</p>
                        <h1 class="hero-title">Street Ready</h1>
                        <p class="hero-description">Bold designs and contemporary cuts for the modern urban lifestyle.</p>
                        <button class="hero-cta" onclick="loadPage('shop')">
                            Shop Urban
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="hero-indicators">
                <button class="hero-indicator active" onclick="goToSlide(0)"></button>
                <button class="hero-indicator" onclick="goToSlide(1)"></button>
                <button class="hero-indicator" onclick="goToSlide(2)"></button>
            </div>
            
            <button class="hero-nav hero-prev" onclick="previousSlide()">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            
            <button class="hero-nav hero-next" onclick="nextSlide()">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </section>

        <!-- Features Section -->
        <section class="features">
            <div class="features-container">
                <div class="features-grid">
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Free Shipping</h3>
                        <p class="feature-description">Free shipping on orders over ₹999. Fast and reliable delivery nationwide.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Quality Guarantee</h3>
                        <p class="feature-description">Premium materials and craftsmanship. 30-day return policy on all items.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">24/7 Support</h3>
                        <p class="feature-description">Round-the-clock customer support. We're here to help with any questions.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="categories">
            <div class="categories-container">
                <div class="section-header">
                    <h2 class="section-title">Shop by Category</h2>
                    <p class="section-description">Discover our curated collections</p>
                </div>
                <div class="categories-grid">
                    ${categories.map(category => `
                        <div class="category-card" onclick="loadCategoryProducts('${category.id}')">
                            <div class="category-image-container">
                                <img src="${category.image}" alt="${category.name}" class="category-image">
                                <div class="category-overlay"></div>
                                <div class="category-count">${category.productCount} Items</div>
                            </div>
                            <h3 class="category-name">${category.name}</h3>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="products-section">
            <div class="products-container">
                <div class="section-header-with-link">
                    <div class="section-header">
                        <h2 class="section-title">Featured Products</h2>
                        <p class="section-description">Handpicked favorites</p>
                    </div>
                    <button class="view-all-btn" onclick="loadPage('shop')">
                        View All
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </div>
                <div class="products-grid">
                    ${getFeaturedProducts().map(product => createProductCard(product)).join('')}
                </div>
            </div>
        </section>

        <!-- Best Sellers -->
        <section class="products-section alt">
            <div class="products-container">
                <div class="section-header-with-link">
                    <div class="section-header">
                        <h2 class="section-title">Best Sellers</h2>
                        <p class="section-description">Most loved by customers</p>
                    </div>
                    <button class="view-all-btn" onclick="loadPage('shop')">
                        View All
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </div>
                <div class="products-grid">
                    ${getBestSellers().map(product => createProductCard(product)).join('')}
                </div>
            </div>
        </section>

        <!-- Newsletter -->
        <section class="newsletter">
            <div class="newsletter-container">
                <h2 class="newsletter-title">Stay in Style</h2>
                <p class="newsletter-description">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
                <form class="newsletter-form" onsubmit="handleNewsletterSubmit(event)">
                    <input type="email" class="newsletter-input" placeholder="Enter your email address" required>
                    <button type="submit" class="newsletter-btn">Subscribe</button>
                </form>
            </div>
        </section>
    `;

    // Start hero slider
    startHeroSlider();
    
    // Add hover pause functionality
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', pauseHeroSlider);
        heroSection.addEventListener('mouseleave', resumeHeroSlider);
    }
}

// Hero Slider Functions
function startHeroSlider() {
    heroSlideInterval = setInterval(() => {
        heroSlideIndex = (heroSlideIndex + 1) % 3;
        goToSlide(heroSlideIndex);
    }, 5000); // Changed to 5 seconds for better UX
}

function goToSlide(index) {
    heroSlideIndex = index;
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        if (i === index) {
            slide.classList.add('active');
        } else if (i < index) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('next');
        }
    });
    
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) indicator.classList.add('active');
    });
}

function nextSlide() {
    heroSlideIndex = (heroSlideIndex + 1) % 3;
    goToSlide(heroSlideIndex);
}

function previousSlide() {
    heroSlideIndex = (heroSlideIndex - 1 + 3) % 3;
    goToSlide(heroSlideIndex);
}

function pauseHeroSlider() {
    clearInterval(heroSlideInterval);
}

function resumeHeroSlider() {
    startHeroSlider();
}

// SHOP PAGE
function loadShopPage() {
    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <div class="page-header">
                    <h1 class="page-title">All Products</h1>
                    <p class="page-subtitle">Discover our complete collection</p>
                </div>
                
                <div class="shop-filters">
                    <div class="filter-group">
                        <label class="filter-label">Category:</label>
                        <select class="filter-select" onchange="filterProducts(this.value)">
                            <option value="">All Categories</option>
                            ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">Sort by:</label>
                        <select class="filter-select" onchange="sortProducts(this.value)">
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
                
                <div class="products-grid" id="shop-products">
                    ${products.map(product => createProductCard(product)).join('')}
                </div>
            </div>
        </div>
    `;
}

// CATEGORIES PAGE
function loadCategoriesPage() {
    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <h1 class="page-title">Categories</h1>
                <p class="page-subtitle">Browse by category</p>
                
                <div class="categories-grid">
                    ${categories.map(category => `
                        <div class="category-card" onclick="loadCategoryProducts('${category.id}')">
                            <div class="category-image-container">
                                <img src="${category.image}" alt="${category.name}" class="category-image">
                                <div class="category-overlay"></div>
                                <div class="category-count">${category.productCount} Items</div>
                            </div>
                            <h3 class="category-name">${category.name}</h3>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// CART PAGE
function loadCartPage() {
    if (cart.length === 0) {
        mainContent.innerHTML = `
            <div class="cart-page">
                <div class="cart-container">
                    <div class="empty-cart">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                        </svg>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <button class="btn btn-primary" onclick="loadPage('shop')">Start Shopping</button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 99; // Free shipping over ₹999
    const total = subtotal + shipping;

    mainContent.innerHTML = `
        <div class="cart-page">
            <div class="cart-container">
                <div class="cart-header">
                    <div>
                        <h1 class="cart-title">Shopping Cart</h1>
                        <p class="cart-subtitle">${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart</p>
                    </div>
                    <button class="continue-shopping" onclick="loadPage('shop')">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Continue Shopping
                    </button>
                </div>

                <div class="cart-content">
                    <div class="cart-items">
                        ${cart.map(item => createCartItem(item)).join('')}
                    </div>

                    <div class="order-summary">
                        <h3 class="summary-title">Order Summary</h3>
                        
                        <div class="summary-row">
                            <span class="summary-label">Subtotal</span>
                            <span class="summary-value">${formatPrice(subtotal)}</span>
                        </div>
                        
                        <div class="summary-row">
                            <span class="summary-label">Shipping</span>
                            <span class="summary-value">${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                        </div>
                        
                        ${shipping === 0 ? '' : `
                            <div class="shipping-notice">
                                <p>Add ${formatPrice(999 - subtotal)} more for free shipping!</p>
                            </div>
                        `}
                        
                        <div class="summary-total">
                            <div class="summary-row">
                                <span class="summary-label">Total</span>
                                <span class="summary-value">${formatPrice(total)}</span>
                            </div>
                        </div>
                        
                        <button class="checkout-btn" onclick="handleCheckout()">
                            Proceed to Checkout
                        </button>
                        
                        <button class="clear-cart" onclick="clearCart()">
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// WISHLIST PAGE
function loadWishlistPage() {
    if (wishlist.length === 0) {
        mainContent.innerHTML = `
            <div class="page">
                <div class="page-container">
                    <div class="empty-cart">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love to your wishlist.</p>
                        <button class="btn btn-primary" onclick="loadPage('shop')">Start Shopping</button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    const wishlistProducts = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);

    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <h1 class="page-title">My Wishlist</h1>
                <p class="page-subtitle">${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved</p>
                
                <div class="products-grid">
                    ${wishlistProducts.map(product => createProductCard(product)).join('')}
                </div>
            </div>
        </div>
    `;
}

// SALE PAGE
function loadSalePage() {
    const saleProducts = getSaleProducts();
    
    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <h1 class="page-title">🔥 SALE</h1>
                <p class="page-subtitle">Up to 50% off on selected items</p>
                
                <div class="products-grid">
                    ${saleProducts.map(product => createProductCard(product)).join('')}
                </div>
            </div>
        </div>
    `;
}

// PRODUCT DETAIL PAGE
function loadProductPage(productId) {
    const product = getProductById(productId);
    if (!product) {
        loadPage('shop');
        return;
    }

    currentProduct = product;
    const isInWishlist = wishlist.includes(product.id);

    // Generate sample reviews
    const sampleReviews = [
        { name: "Priya Sharma", rating: 5, comment: "Absolutely love this! Great quality and perfect fit.", date: "2 days ago", verified: true },
        { name: "Rahul Kumar", rating: 4, comment: "Good product, fast delivery. Slightly expensive but worth it.", date: "1 week ago", verified: true },
        { name: "Anita Singh", rating: 5, comment: "Exceeded my expectations! Will definitely buy again.", date: "2 weeks ago", verified: false },
        { name: "Vikram Patel", rating: 4, comment: "Nice quality, comfortable to wear. Recommended!", date: "3 weeks ago", verified: true }
    ];

    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <div class="product-detail">
                    <div class="product-images">
                        <div class="image-thumbnails">
                            ${product.images.map((img, index) => `
                                <img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                                     onclick="changeMainImage('${img}', this)">
                            `).join('')}
                        </div>
                        <div class="main-image">
                            <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
                        </div>
                    </div>

                    <div class="product-details">
                        <h1 class="product-title">${product.name}</h1>
                        
                        <div class="product-rating">
                            <div class="rating-stars">
                                ${renderStars(product.rating)}
                            </div>
                            <span class="rating-count">(${product.reviewCount} reviews)</span>
                        </div>

                        <div class="product-price">
                            <span class="price-current">${formatPrice(product.price)}</span>
                            ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
                            ${product.discount ? `<span class="price-discount">${product.discount}% OFF</span>` : ''}
                        </div>

                        <p class="product-description">${product.description}</p>

                        <div class="product-options">
                            ${product.colors ? `
                                <div class="option-group">
                                    <label class="option-label">Color:</label>
                                    <div class="color-options">
                                        ${product.colors.map((color, index) => `
                                            <div class="color-option ${index === 0 ? 'active' : ''}" 
                                                 onclick="selectColor('${color.name}', '${color.image}', this)">
                                                <div class="color-swatch" style="background-color: ${color.value}"></div>
                                                <span class="color-name">${color.name}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            ${product.sizes ? `
                                <div class="option-group">
                                    <label class="option-label">Size:</label>
                                    <div class="size-options">
                                        ${product.sizes.map((size, index) => `
                                            <div class="size-option ${index === 2 ? 'active' : ''}" onclick="selectSize('${size}', this)">
                                                ${size}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <div class="option-group">
                                <label class="option-label">Quantity:</label>
                                <div class="quantity-selector">
                                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                                    <span class="quantity-display" id="product-quantity">1</span>
                                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                                </div>
                            </div>

                            <div class="option-group">
                                <label class="option-label">add to cart:</label>
                            <button class="add-to-cart-btn" onclick="addToCartFromProduct()">
                                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                                </svg>
                                Add to Cart
                            </button>
                            </div>
                        </div>

                        <div class="product-actions">
                            <button class="add-to-cart-btn" onclick="addToCartFromProduct()">
                                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                                </svg>
                                Add to Cart
                            </button>
                            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist('${product.id}', this)">
                                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>

                        ${product.features ? `
                            <div class="product-features">
                                <h3>Features</h3>
                                <ul>
                                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Reviews Section -->
                <div class="product-reviews">
                    <div class="reviews-header">
                        <h3>Customer Reviews</h3>
                        <div class="reviews-summary">
                            <div class="reviews-rating">
                                <div class="rating-stars large">
                                    ${renderStars(product.rating)}
                                </div>
                                <span class="rating-number">${product.rating}</span>
                                <span class="rating-text">out of 5</span>
                            </div>
                            <span class="reviews-count">${product.reviewCount} reviews</span>
                        </div>
                    </div>

                    <div class="reviews-breakdown">
                        <div class="rating-breakdown">
                            ${[5,4,3,2,1].map(stars => {
                                const percentage = Math.max(0, (product.rating - stars + 1) * 20);
                                return `
                                    <div class="rating-row">
                                        <span class="rating-label">${stars} stars</span>
                                        <div class="rating-bar">
                                            <div class="rating-fill" style="width: ${percentage}%"></div>
                                        </div>
                                        <span class="rating-percentage">${Math.round(percentage)}%</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <div class="reviews-list">
                        ${sampleReviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <div class="reviewer-info">
                                        <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                                        <div>
                                            <div class="reviewer-name">${review.name}</div>
                                            <div class="review-date">${review.date}</div>
                                        </div>
                                    </div>
                                    <div class="review-rating">
                                        <div class="rating-stars small">
                                            ${renderStars(review.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p class="review-content">${review.comment}</p>
                                ${review.verified ? '<span class="verified-purchase">✓ Verified Purchase</span>' : ''}
                            </div>
                        `).join('')}
                    </div>

                    <button class="load-more-reviews">Load More Reviews</button>
                </div>
            </div>
        </div>
    `;
} 
// ABOUT PAGE

// Product Card Creation
function createProductCard(product) {
    const isInWishlist = wishlist.includes(product.id);
    
    return `
        <div class="product-card" onclick="loadProductPage('${product.id}')">
            <div class="product-image-container">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                
                <div class="product-badges">
                    ${product.isNew ? '<span class="product-badge badge-new">NEW</span>' : ''}
                    ${product.isBestSeller ? '<span class="product-badge badge-bestseller">BESTSELLER</span>' : ''}
                    ${product.discount ? `<span class="product-badge badge-discount">${product.discount}% OFF</span>` : ''}
                </div>
                
                <div class="product-actions">
                    <button class="product-action-btn ${isInWishlist ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleWishlist('${product.id}', this)" 
                            title="${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                    <button class="product-action-btn cart" 
                            onclick="event.stopPropagation(); addToCart('${product.id}')" 
                            title="Add to Cart">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                
                <div class="product-rating">
                    <div class="rating-stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                
                <div class="product-price-row">
                    <div class="product-price">
                        <span class="price-current">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    
                    ${product.colors ? `
                        <div class="product-colors">
                            ${product.colors.slice(0, 3).map(color => `
                                <div class="color-dot" style="background-color: ${color.value}"></div>
                            `).join('')}
                            ${product.colors.length > 3 ? `<span class="color-more">+${product.colors.length - 3}</span>` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Cart Item Creation
function createCartItem(item) {
    return `
        <div class="cart-item">
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-options">
                        ${item.color ? `<span>Color: ${item.color}</span>` : ''}
                        ${item.size ? `<span>Size: ${item.size}</span>` : ''}
                    </div>
                    
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                        
                        <div class="cart-item-price-actions">
                            <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                            <button class="remove-item" onclick="removeFromCart('${item.id}')" title="Remove item">
                                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Cart Functions
function addToCart(productId, options = {}) {
    const product = getProductById(productId);
    if (!product) return;

    const cartItem = {
        id: productId + (options.color || '') + (options.size || ''),
        productId: productId,
        name: product.name,
        price: product.price,
        image: options.image || product.images[0],
        color: options.color || (product.colors ? product.colors[0].name : null),
        size: options.size || (product.sizes ? product.sizes[2] : null),
        quantity: options.quantity || 1
    };

    const existingItem = cart.find(item => item.id === cartItem.id);
    
    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

function addToCartFromProduct() {
    if (!currentProduct) return;

    const selectedColor = document.querySelector('.color-option.active')?.textContent.trim() || 
                         (currentProduct.colors ? currentProduct.colors[0].name : null);
    const selectedSize = document.querySelector('.size-option.active')?.textContent.trim() || 
                        (currentProduct.sizes ? currentProduct.sizes[2] : null);
    const quantity = parseInt(document.getElementById('product-quantity').textContent);
    const selectedImage = document.getElementById('main-product-image').src;

    addToCart(currentProduct.id, {
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        image: selectedImage
    });
}

function updateCartQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        loadCartPage(); // Refresh cart page
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    loadCartPage(); // Refresh cart page
    showNotification('Item removed from cart', 'info');
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        loadCartPage();
        showNotification('Cart cleared', 'info');
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.classList.toggle('hidden', count === 0);
}

// Wishlist Functions
function toggleWishlist(productId, button) {
    const isInWishlist = wishlist.includes(productId);
    const product = getProductById(productId);
    
    if (isInWishlist) {
        wishlist = wishlist.filter(id => id !== productId);
        button.classList.remove('active');
        button.title = 'Add to Wishlist';
        if (button.querySelector('span')) {
            button.querySelector('span').textContent = 'Add to Wishlist';
        }
        showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
        wishlist.push(productId);
        button.classList.add('active');
        button.title = 'Remove from Wishlist';
        if (button.querySelector('span')) {
            button.querySelector('span').textContent = 'Remove from Wishlist';
        }
        showNotification(`${product.name} added to wishlist!`, 'success');
    }
    
    saveWishlist();
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Product Page Functions
function changeMainImage(imageSrc, thumbnail) {
    document.getElementById('main-product-image').src = imageSrc;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

function selectColor(colorName, colorImage, element) {
    document.querySelectorAll('.color-option').forEach(option => option.classList.remove('active'));
    element.classList.add('active');
    
    if (colorImage) {
        changeMainImage(colorImage, document.querySelector('.thumbnail'));
    }
}

function selectSize(size, element) {
    document.querySelectorAll('.size-option').forEach(option => option.classList.remove('active'));
    element.classList.add('active');
}

function changeQuantity(delta) {
    const quantityDisplay = document.getElementById('product-quantity');
    const currentQuantity = parseInt(quantityDisplay.textContent);
    const newQuantity = Math.max(1, currentQuantity + delta);
    quantityDisplay.textContent = newQuantity;
}

// Filter and Search Functions
function filterProducts(category) {
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    const productsGrid = document.getElementById('shop-products');
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Keep original order for featured
            break;
    }
    
    const productsGrid = document.getElementById('shop-products');
    productsGrid.innerHTML = sortedProducts.map(product => createProductCard(product)).join('');
}

function loadCategoryProducts(categoryId) {
    loadPage('shop');
    setTimeout(() => {
        const categorySelect = document.querySelector('.filter-select');
        if (categorySelect) {
            categorySelect.value = categoryId;
            filterProducts(categoryId);
        }
    }, 100);
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    if (query.length < 2) return;
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    if (currentPage === 'shop') {
        const productsGrid = document.getElementById('shop-products');
        if (productsGrid) {
            productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        }
    } else {
        loadPage('shop');
        setTimeout(() => {
            const productsGrid = document.getElementById('shop-products');
            if (productsGrid) {
                productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
            }
        }, 100);
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function closeMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// Authentication Functions
function setupAuthForm() {
    const authForm = document.getElementById('auth-form');
    const authToggle = document.getElementById('auth-toggle');
    const modalTitle = document.getElementById('modal-title');
    const authSubmit = document.getElementById('auth-submit');
    const nameField = document.getElementById('name-field');
    const confirmPasswordField = document.getElementById('confirm-password-field');
    const authSwitchQuestion = document.getElementById('auth-switch-question');
    const forgotPassword = document.getElementById('forgot-password');
    
    let isSignUp = false;

    authToggle.addEventListener('click', () => {
        isSignUp = !isSignUp;
        
        if (isSignUp) {
            modalTitle.textContent = 'Create Account';
            authSubmit.textContent = 'Sign Up';
            nameField.classList.remove('hidden');
            confirmPasswordField.classList.remove('hidden');
            authSwitchQuestion.textContent = 'Already have an account? ';
            authToggle.textContent = 'Sign In';
            forgotPassword.classList.add('hidden');
        } else {
            modalTitle.textContent = 'Welcome Back';
            authSubmit.textContent = 'Sign In';
            nameField.classList.add('hidden');
            confirmPasswordField.classList.add('hidden');
            authSwitchQuestion.textContent = "Don't have an account? ";
            authToggle.textContent = 'Sign Up';
            forgotPassword.classList.remove('hidden');
        }
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(authForm);
        
        if (isSignUp) {
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            currentUser = {
                name: formData.get('name'),
                email: formData.get('email')
            };
            
            showNotification('Account created successfully!', 'success');
        } else {
            currentUser = {
                name: 'User',
                email: formData.get('email')
            };
            
            showNotification('Welcome back!', 'success');
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserIndicator();
        closeLoginModal();
    });

    // Password toggle
    document.getElementById('toggle-password').addEventListener('click', () => {
        const passwordInput = document.querySelector('input[name="password"]');
        const eyeIcon = document.getElementById('eye-icon');
        const eyeOffIcon = document.getElementById('eye-off-icon');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        }
    });
}

function showLoginModal() {
    window.location.href = 'login.html';
}

function closeLoginModal() {
    loginModal.classList.add('hidden');
}

function updateUserIndicator() {
    if (currentUser) {
        userIndicator.classList.remove('hidden');
        document.getElementById('mobile-user-btn').textContent = `Hi, ${currentUser.name}`;
    } else {
        userIndicator.classList.add('hidden');
        document.getElementById('mobile-user-btn').textContent = 'Login / Sign Up';
    }
}

function showUserMenu() {
    
        window.location.href = 'profile.html';
    
}

// Utility Functions
function handleCheckout() {
    if (!currentUser) {
        showNotification('Please login to checkout', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    showNotification('Checkout functionality coming soon!', 'info');
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    showNotification('Thank you for subscribing!', 'success');
    event.target.reset();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#B6F500' : type === 'error' ? '#EF4444' : '#6B7280'};
        color: ${type === 'success' ? '#000000' : '#FFFFFF'};
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}