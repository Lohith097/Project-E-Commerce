// Application State
let appState = {
    currentPage: 'home',
    user: null,
    cart: [],
    isLoginModalOpen: false,
    isMobileMenuOpen: false
};

// DOM Elements
const mainContent = document.getElementById('main-content');
const loginModal = document.getElementById('login-modal');
const mobileMenu = document.getElementById('mobile-menu');
const cartCount = document.getElementById('cart-count');
const userIndicator = document.getElementById('user-indicator');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    renderCurrentPage();
    updateCartCount();
});

// Event Listeners
function initializeEventListeners() {
    // Logo click
    document.getElementById('logo-btn').addEventListener('click', () => navigateTo('home'));
    
    // Navigation buttons
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.target.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // User button
    document.getElementById('user-btn').addEventListener('click', toggleLoginModal);
    document.getElementById('mobile-user-btn').addEventListener('click', () => {
        toggleMobileMenu();
        toggleLoginModal();
    });
    
    // Mobile menu
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    
    // Login modal
    document.getElementById('close-modal').addEventListener('click', toggleLoginModal);
    document.getElementById('auth-toggle').addEventListener('click', toggleAuthMode);
    document.getElementById('toggle-password').addEventListener('click', togglePasswordVisibility);
    document.getElementById('auth-form').addEventListener('submit', handleAuthSubmit);
    
    // Close modal on backdrop click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            toggleLoginModal();
        }
    });
}

// Navigation
function navigateTo(page) {
    appState.currentPage = page;
    closeMobileMenu();
    updateActiveNavigation();
    renderCurrentPage();
}

function updateActiveNavigation() {
    // Update desktop nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === appState.currentPage) {
            btn.classList.add('active');
        }
    });
}

// Mobile Menu
function toggleMobileMenu() {
    appState.isMobileMenuOpen = !appState.isMobileMenuOpen;
    
    if (appState.isMobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        document.getElementById('menu-icon').classList.add('hidden');
        document.getElementById('close-icon').classList.remove('hidden');
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    appState.isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    document.getElementById('menu-icon').classList.remove('hidden');
    document.getElementById('close-icon').classList.add('hidden');
}

// Login Modal
function toggleLoginModal() {
    appState.isLoginModalOpen = !appState.isLoginModalOpen;
    
    if (appState.isLoginModalOpen) {
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        loginModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function toggleAuthMode() {
    const isLogin = document.getElementById('modal-title').textContent === 'Welcome Back';
    const modalTitle = document.getElementById('modal-title');
    const nameField = document.getElementById('name-field');
    const confirmPasswordField = document.getElementById('confirm-password-field');
    const authSubmit = document.getElementById('auth-submit');
    const authSwitchQuestion = document.getElementById('auth-switch-question');
    const authToggle = document.getElementById('auth-toggle');
    const forgotPassword = document.getElementById('forgot-password');
    
    if (isLogin) {
        // Switch to Sign Up
        modalTitle.textContent = 'Create Account';
        nameField.classList.remove('hidden');
        confirmPasswordField.classList.remove('hidden');
        authSubmit.textContent = 'Create Account';
        authSwitchQuestion.textContent = 'Already have an account? ';
        authToggle.textContent = 'Sign In';
        forgotPassword.classList.add('hidden');
    } else {
        // Switch to Sign In
        modalTitle.textContent = 'Welcome Back';
        nameField.classList.add('hidden');
        confirmPasswordField.classList.add('hidden');
        authSubmit.textContent = 'Sign In';
        authSwitchQuestion.textContent = "Don't have an account? ";
        authToggle.textContent = 'Sign Up';
        forgotPassword.classList.remove('hidden');
    }
}

function togglePasswordVisibility() {
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
}

function handleAuthSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const isLogin = document.getElementById('modal-title').textContent === 'Welcome Back';
    
    if (!isLogin) {
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    }
    
    // Mock authentication
    const user = {
        id: '1',
        name: isLogin ? 'John Doe' : formData.get('name'),
        email: formData.get('email'),
        avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100'
    };
    
    setUser(user);
    toggleLoginModal();
    
    // Reset form
    e.target.reset();
}

function setUser(user) {
    appState.user = user;
    
    if (user) {
        userIndicator.classList.remove('hidden');
        document.getElementById('mobile-user-btn').textContent = `Hi, ${user.name}`;
    } else {
        userIndicator.classList.add('hidden');
        document.getElementById('mobile-user-btn').textContent = 'Login / Sign Up';
    }
}

// Cart Functions
function addToCart(product, quantity = 1, selectedColor = '', selectedSize = '') {
    const existingItemIndex = appState.cart.findIndex(item => 
        item.product.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );
    
    if (existingItemIndex >= 0) {
        appState.cart[existingItemIndex].quantity += quantity;
    } else {
        appState.cart.push({
            product,
            quantity,
            selectedColor: selectedColor || product.colors[0]?.name || '',
            selectedSize: selectedSize || product.sizes[0] || ''
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(index) {
    appState.cart.splice(index, 1);
    updateCartCount();
    if (appState.currentPage === 'cart') {
        renderCurrentPage();
    }
}

function updateCartQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        appState.cart[index].quantity = quantity;
        updateCartCount();
        if (appState.currentPage === 'cart') {
            renderCurrentPage();
        }
    }
}

function clearCart() {
    appState.cart = [];
    updateCartCount();
    if (appState.currentPage === 'cart') {
        renderCurrentPage();
    }
}

function updateCartCount() {
    const count = appState.cart.reduce((total, item) => total + item.quantity, 0);
    
    if (count > 0) {
        cartCount.textContent = count;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

function getCartTotal() {
    const subtotal = appState.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 2000 ? 0 : 199;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#B6F500' : '#EF4444'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Page Rendering
function renderCurrentPage() {
    switch (appState.currentPage) {
        case 'home':
            renderHomePage();
            break;
        case 'shop':
        case 'categories':
            renderShopPage();
            break;
        case 'cart':
            renderCartPage();
            break;
        case 'sale':
            renderSalePage();
            break;
        case 'wishlist':
            renderWishlistPage();
            break;
        default:
            if (appState.currentPage.startsWith('product-')) {
                const productId = appState.currentPage.replace('product-', '');
                renderProductDetailPage(productId);
            } else {
                renderHomePage();
            }
    }
}

function renderHomePage() {
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

    mainContent.innerHTML = `
        <!-- Hero Section -->
        <section class="hero">
            ${heroSlides.map((slide, index) => `
                <div class="hero-slide ${index === 0 ? 'active' : 'next'}">
                    <img src="${slide.image}" alt="${slide.title}" class="hero-image" loading="${index === 0 ? 'eager' : 'lazy'}">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <div class="hero-text">
                            <p class="hero-subtitle">${slide.subtitle}</p>
                            <h1 class="hero-title">${slide.title}</h1>
                            <p class="hero-description">${slide.description}</p>
                            <button class="hero-cta" onclick="navigateTo('shop')">
                                <span>${slide.cta}</span>
                                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <div class="hero-indicators">
                ${heroSlides.map((_, index) => `
                    <button class="hero-indicator ${index === 0 ? 'active' : ''}" onclick="setHeroSlide(${index})"></button>
                `).join('')}
            </div>
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
                        <p class="feature-description">Free shipping on all orders over ₹2000</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Quality Guarantee</h3>
                        <p class="feature-description">30-day money back guarantee</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 class="feature-title">Fast Delivery</h3>
                        <p class="feature-description">Express delivery in 2-3 business days</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="categories">
            <div class="categories-container">
                <div class="section-header">
                    <h2 class="section-title">Shop by Category</h2>
                    <p class="section-description">Discover our wide range of premium products</p>
                </div>
                <div class="categories-grid">
                    ${categories.map(category => `
                        <div class="category-card" onclick="navigateTo('categories')">
                            <div class="category-image-container">
                                <img src="${category.image}" alt="${category.name}" class="category-image">
                                <div class="category-overlay"></div>
                                <div class="category-count">${category.productCount} items</div>
                            </div>
                            <h3 class="category-name">${category.name}</h3>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="products-section alt">
            <div class="products-container">
                <div class="section-header-with-link">
                    <div>
                        <h2 class="section-title">Featured Products</h2>
                        <p class="section-description">Handpicked favorites just for you</p>
                    </div>
                    <button class="view-all-btn" onclick="navigateTo('shop')">
                        <span>View All</span>
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </div>
                <div class="products-grid">
                    ${renderProductGrid(getFeaturedProducts().slice(0, 8))}
                </div>
            </div>
        </section>

        <!-- Best Sellers -->
        <section class="products-section">
            <div class="products-container">
                <div class="section-header-with-link">
                    <div>
                        <h2 class="section-title">
                            <svg style="width: 2rem; height: 2rem; color: #B6F500; display: inline-block; margin-right: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            Best Sellers
                        </h2>
                        <p class="section-description">Most loved by our customers</p>
                    </div>
                </div>
                <div class="products-grid">
                    ${renderProductGrid(getBestSellers().slice(0, 4))}
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="newsletter">
            <div class="newsletter-container">
                <h2 class="newsletter-title">Stay in the Loop</h2>
                <p class="newsletter-description">
                    Get the latest updates on new products, exclusive offers, and fashion trends
                </p>
                <form class="newsletter-form" onsubmit="handleNewsletterSubmit(event)">
                    <input type="email" class="newsletter-input" placeholder="Enter your email" required>
                    <button type="submit" class="newsletter-btn">Subscribe</button>
                </form>
            </div>
        </section>
    `;

    // Initialize hero slider
    initializeHeroSlider();
}

function renderShopPage() {
    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <div class="text-center mb-8">
                    <h1 class="page-title">Shop All Products</h1>
                    <p class="page-subtitle">Discover our complete collection of premium fashion</p>
                </div>
                
                <div class="products-grid">
                    ${renderProductGrid(products)}
                </div>
            </div>
        </div>
    `;
}

function renderCartPage() {
    if (appState.cart.length === 0) {
        mainContent.innerHTML = `
            <div class="empty-cart">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"></path>
                </svg>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button class="btn btn-primary" onclick="navigateTo('shop')">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Continue Shopping
                </button>
            </div>
        `;
        return;
    }

    const { subtotal, shipping, tax, total } = getCartTotal();

    mainContent.innerHTML = `
        <div class="cart-page">
            <div class="cart-container">
                <div class="cart-header">
                    <div>
                        <h1 class="cart-title">Shopping Cart</h1>
                        <p class="cart-subtitle">${appState.cart.length} items in your cart</p>
                    </div>
                    <button class="continue-shopping" onclick="navigateTo('shop')">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Continue Shopping
                    </button>
                </div>

                <div class="cart-content">
                    <div class="cart-items">
                        ${appState.cart.map((item, index) => `
                            <div class="cart-item">
                                <div class="cart-item-content">
                                    <img src="${item.product.images[0]}" alt="${item.product.name}" class="cart-item-image">
                                    
                                    <div class="cart-item-details">
                                        <h3 class="cart-item-name">${item.product.name}</h3>
                                        <div class="cart-item-options">
                                            <span>Color: ${item.selectedColor}</span>
                                            <span>Size: ${item.selectedSize}</span>
                                        </div>
                                        <div class="cart-item-controls">
                                            <div class="quantity-controls">
                                                <button class="quantity-btn" onclick="updateCartQuantity(${index}, ${item.quantity - 1})">
                                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                                    </svg>
                                                </button>
                                                <span class="quantity-display">${item.quantity}</span>
                                                <button class="quantity-btn" onclick="updateCartQuantity(${index}, ${item.quantity + 1})">
                                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div class="cart-item-price-actions">
                                                <span class="cart-item-price">${formatPrice(item.product.price * item.quantity)}</span>
                                                <button class="remove-item" onclick="removeFromCart(${index})">
                                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="order-summary">
                        <h2 class="summary-title">Order Summary</h2>
                        
                        <div class="summary-row">
                            <span class="summary-label">Subtotal</span>
                            <span class="summary-value">${formatPrice(subtotal)}</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Shipping</span>
                            <span class="summary-value">${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Tax</span>
                            <span class="summary-value">${formatPrice(tax)}</span>
                        </div>
                        
                        <div class="summary-total">
                            <div class="summary-row">
                                <span class="summary-label">Total</span>
                                <span class="summary-value">${formatPrice(total)}</span>
                            </div>
                        </div>

                        ${subtotal < 2000 ? `
                            <div class="shipping-notice">
                                <p>Add ${formatPrice(2000 - subtotal)} more for free shipping!</p>
                            </div>
                        ` : ''}

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

function renderSalePage() {
    const saleProducts = getSaleProducts();
    
    mainContent.innerHTML = `
        <div style="min-height: 100vh; background: linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%);">
            <!-- Sale Hero Banner -->
            <div style="background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%); color: white; padding: 3rem 1rem; text-align: center;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;">
                        <svg style="width: 2rem; height: 2rem; animation: pulse 2s infinite;" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <h1 style="font-size: 3rem; font-weight: 700; margin: 0;">MEGA SALE</h1>
                        <svg style="width: 2rem; height: 2rem; animation: pulse 2s infinite;" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>
                    <p style="font-size: 1.5rem; margin-bottom: 1.5rem;">Up to 70% OFF on Premium Fashion</p>
                    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 2rem;">
                        <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 0.5rem; padding: 0.75rem 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span style="font-weight: 600;">Limited Time Offer</span>
                            </div>
                        </div>
                        <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 0.5rem; padding: 0.75rem 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                                <span style="font-weight: 600;">Save up to ₹50,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page">
                <div class="page-container">
                    <div class="text-center mb-8">
                        <h2 class="page-title">Sale Items</h2>
                        <p class="page-subtitle">Don't miss out on these incredible deals!</p>
                    </div>
                    
                    <div class="products-grid">
                        ${renderProductGrid(saleProducts, true)}
                    </div>

                    <!-- Sale Banner -->
                    <div style="margin-top: 4rem; background: linear-gradient(135deg, #DC2626 0%, #EA580C 100%); border-radius: 1rem; padding: 2rem; text-align: center; color: white;">
                        <h3 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem;">Don't Miss Out!</h3>
                        <p style="font-size: 1.125rem; margin-bottom: 1.5rem;">These deals won't last forever. Shop now and save big!</p>
                        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1.5rem;">
                            <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 0.5rem; padding: 1rem 1.5rem;">
                                <span style="font-weight: 600;">Free Shipping on orders over ₹2000</span>
                            </div>
                            <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 0.5rem; padding: 1rem 1.5rem;">
                                <span style="font-weight: 600;">30-day return policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderWishlistPage() {
    // Mock wishlist items
    const wishlistItems = products.slice(0, 4);
    
    if (wishlistItems.length === 0) {
        mainContent.innerHTML = `
            <div class="empty-cart">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <h2>Your wishlist is empty</h2>
                <p>Save items you love to your wishlist.</p>
                <button class="btn btn-primary" onclick="navigateTo('shop')">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Continue Shopping
                </button>
            </div>
        `;
        return;
    }

    mainContent.innerHTML = `
        <div class="page" style="background-color: #F9FAFB;">
            <div class="page-container">
                <div class="cart-header">
                    <div>
                        <h1 class="cart-title">My Wishlist</h1>
                        <p class="cart-subtitle">${wishlistItems.length} items saved</p>
                    </div>
                    <button class="continue-shopping" onclick="navigateTo('shop')">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Continue Shopping
                    </button>
                </div>

                <div class="products-grid">
                    ${wishlistItems.map(item => `
                        <div class="product-card">
                            <div class="product-image-container">
                                <img src="${item.images[0]}" alt="${item.name}" class="product-image">
                                <button class="product-action-btn" style="position: absolute; top: 0.75rem; right: 0.75rem;" onclick="showNotification('Removed from wishlist')">
                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                                ${item.discount ? `<div class="product-badges"><span class="product-badge badge-discount">-${item.discount}%</span></div>` : ''}
                            </div>
                            
                            <div class="product-info">
                                <h3 class="product-name">${item.name}</h3>
                                
                                <div class="product-price-row">
                                    <div class="product-price">
                                        <span class="price-current">${formatPrice(item.price)}</span>
                                        ${item.originalPrice ? `<span class="price-original">${formatPrice(item.originalPrice)}</span>` : ''}
                                    </div>
                                </div>

                                <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                                    <button class="btn btn-primary" style="flex: 1; font-size: 0.875rem; padding: 0.5rem;" onclick="addToCart(getProductById('${item.id}'))">
                                        <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                                        </svg>
                                        Add to Cart
                                    </button>
                                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="navigateTo('product-${item.id}')">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Recommendations -->
                <div style="margin-top: 4rem;">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1.5rem;">You might also like</h2>
                    <div class="products-grid">
                        ${renderProductGrid(products.slice(4, 8))}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProductDetailPage(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        mainContent.innerHTML = `
            <div class="empty-cart">
                <h2>Product not found</h2>
                <button class="btn btn-primary" onclick="navigateTo('shop')">Back to Shop</button>
            </div>
        `;
        return;
    }

    mainContent.innerHTML = `
        <div class="page">
            <div class="page-container">
                <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
                    <!-- Product Images -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <div style="position: relative; aspect-ratio: 1; background-color: #F3F4F6; border-radius: 0.5rem; overflow: hidden; margin-bottom: 1rem;">
                                <img id="main-product-image" src="${product.images[0]}" alt="Product" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            
                            ${product.images.length > 1 ? `
                                <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
                                    ${product.images.map((image, index) => `
                                        <button onclick="setProductImage('${image}')" style="flex-shrink: 0; width: 4rem; height: 4rem; border-radius: 0.5rem; overflow: hidden; border: 2px solid ${index === 0 ? '#B6F500' : '#E5E7EB'}; background: none; cursor: pointer;">
                                            <img src="${image}" alt="Product ${index + 1}" style="width: 100%; height: 100%; object-fit: cover;">
                                        </button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Product Details -->
                        <div>
                            <h1 style="font-size: 2rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">
                                ${product.name}
                            </h1>
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                                <div class="rating-stars">
                                    ${renderStars(product.rating)}
                                </div>
                                <span style="font-size: 0.875rem; color: #6B7280;">(${product.rating})</span>
                                <span style="font-size: 0.875rem; color: #3B82F6;">${product.reviewCount} reviews</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <span style="font-size: 2rem; font-weight: 700; color: #111827;">${formatPrice(product.price)}</span>
                                ${product.originalPrice ? `
                                    <span style="font-size: 1.125rem; color: #6B7280; text-decoration: line-through;">${formatPrice(product.originalPrice)}</span>
                                    <span style="background-color: #FEE2E2; color: #DC2626; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500;">
                                        ${product.discount}% OFF
                                    </span>
                                ` : ''}
                            </div>

                            <!-- Color Selection -->
                            ${product.colors.length > 0 ? `
                                <div style="margin-bottom: 1.5rem;">
                                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Color: <span id="selected-color">${product.colors[0].name}</span></h3>
                                    <div style="display: flex; gap: 0.75rem;">
                                        ${product.colors.map((color, index) => `
                                            <button onclick="selectColor('${color.name}')" style="width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid ${index === 0 ? '#B6F500' : '#D1D5DB'}; background-color: ${color.value}; cursor: pointer; transition: all 0.3s ease;" title="${color.name}"></button>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Size Selection -->
                            ${product.sizes.length > 0 ? `
                                <div style="margin-bottom: 1.5rem;">
                                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Size: <span id="selected-size">${product.sizes[0]}</span></h3>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                        ${product.sizes.map((size, index) => `
                                            <button onclick="selectSize('${size}')" style="padding: 0.5rem 1rem; border: 1px solid ${index === 0 ? '#B6F500' : '#D1D5DB'}; background-color: ${index === 0 ? '#B6F500' : 'white'}; color: ${index === 0 ? 'black' : '#374151'}; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s ease;">${size}</button>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Quantity -->
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem;">Quantity</h3>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <button onclick="updateQuantity(-1)" style="width: 2.5rem; height: 2.5rem; border: 1px solid #D1D5DB; background: white; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">-</button>
                                    <span id="quantity" style="width: 4rem; text-align: center; font-size: 1.125rem; font-weight: 500;">1</span>
                                    <button onclick="updateQuantity(1)" style="width: 2.5rem; height: 2.5rem; border: 1px solid #D1D5DB; background: white; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                                <button onclick="addProductToCart()" class="btn btn-primary" style="width: 100%; padding: 0.75rem; font-size: 1.125rem;">
                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                                    </svg>
                                    Add to Cart
                                </button>
                                <div style="display: flex; gap: 0.75rem;">
                                    <button class="btn btn-secondary" style="flex: 1; padding: 0.75rem;" onclick="showNotification('Added to wishlist!')">
                                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                        Wishlist
                                    </button>
                                    <button class="btn btn-secondary" style="flex: 1; padding: 0.75rem;" onclick="showNotification('Share link copied!')">
                                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>

                            <!-- Product Features -->
                            <div style="border-top: 1px solid #E5E7EB; padding-top: 1.5rem;">
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <svg style="width: 1.25rem; height: 1.25rem; color: #6B7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                        </svg>
                                        <span style="font-size: 0.875rem; color: #6B7280;">Free shipping</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <svg style="width: 1.25rem; height: 1.25rem; color: #6B7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                        <span style="font-size: 0.875rem; color: #6B7280;">2-year warranty</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <svg style="width: 1.25rem; height: 1.25rem; color: #6B7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        <span style="font-size: 0.875rem; color: #6B7280;">30-day returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Description -->
                <div style="margin-top: 3rem; border-top: 1px solid #E5E7EB; padding-top: 2rem;">
                    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Product Description</h2>
                    <div>
                        <p style="color: #6B7280; margin-bottom: 1rem;">${product.description}</p>
                        <ul style="color: #6B7280; list-style: none; padding: 0;">
                            ${product.features.map(feature => `<li style="margin-bottom: 0.5rem;">• ${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <script>
            let currentProductQuantity = 1;
            let selectedColor = '${product.colors[0]?.name || ''}';
            let selectedSize = '${product.sizes[0] || ''}';

            function setProductImage(imageSrc) {
                document.getElementById('main-product-image').src = imageSrc;
                // Update thumbnail borders
                document.querySelectorAll('[onclick^="setProductImage"]').forEach(btn => {
                    btn.style.border = btn.onclick.toString().includes(imageSrc) ? '2px solid #B6F500' : '2px solid #E5E7EB';
                });
            }

            function selectColor(colorName) {
                selectedColor = colorName;
                document.getElementById('selected-color').textContent = colorName;
                // Update color button borders
                document.querySelectorAll('[onclick^="selectColor"]').forEach(btn => {
                    btn.style.border = btn.onclick.toString().includes(colorName) ? '2px solid #B6F500' : '2px solid #D1D5DB';
                });
            }

            function selectSize(size) {
                selectedSize = size;
                document.getElementById('selected-size').textContent = size;
                // Update size button styles
                document.querySelectorAll('[onclick^="selectSize"]').forEach(btn => {
                    const isSelected = btn.onclick.toString().includes(size);
                    btn.style.border = isSelected ? '1px solid #B6F500' : '1px solid #D1D5DB';
                    btn.style.backgroundColor = isSelected ? '#B6F500' : 'white';
                    btn.style.color = isSelected ? 'black' : '#374151';
                });
            }

            function updateQuantity(change) {
                currentProductQuantity = Math.max(1, currentProductQuantity + change);
                document.getElementById('quantity').textContent = currentProductQuantity;
            }

            function addProductToCart() {
                const product = getProductById('${productId}');
                addToCart(product, currentProductQuantity, selectedColor, selectedSize);
            }
        </script>
    `;
}

function renderProductGrid(productList, showSavings = false) {
    return productList.map(product => `
        <div class="product-card" onclick="navigateTo('product-${product.id}')">
            <div class="product-image-container">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                
                <div class="product-badges">
                    ${product.isNew ? '<span class="product-badge badge-new">NEW</span>' : ''}
                    ${product.isBestSeller ? '<span class="product-badge badge-bestseller">BESTSELLER</span>' : ''}
                    ${product.discount ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ''}
                </div>

                <div class="product-actions">
                    <button class="product-action-btn" onclick="event.stopPropagation(); showNotification('Added to wishlist!')">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                    <button class="product-action-btn cart" onclick="event.stopPropagation(); addToCart(getProductById('${product.id}'))">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                        </svg>
                    </button>
                </div>

                <div class="product-quick-view">
                    <button class="quick-view-btn">Quick View</button>
                </div>

                ${showSavings && product.originalPrice ? `
                    <div style="position: absolute; top: -0.5rem; right: -0.5rem; background-color: #EF4444; color: white; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; z-index: 10; animation: pulse 2s infinite;">
                        SAVE ${formatPrice((product.originalPrice || product.price) - product.price)}
                    </div>
                ` : ''}
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
                    
                    ${product.colors.length > 1 ? `
                        <div class="product-colors">
                            ${product.colors.slice(0, 3).map(color => `
                                <div class="color-dot" style="background-color: ${color.value};" title="${color.name}"></div>
                            `).join('')}
                            ${product.colors.length > 3 ? `<span class="color-more">+${product.colors.length - 3}</span>` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Hero Slider Functions
let currentHeroSlide = 0;
let heroSliderInterval;

function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    
    heroSliderInterval = setInterval(() => {
        setHeroSlide((currentHeroSlide + 1) % totalSlides);
    }, 5000);
}

function setHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    const totalSlides = slides.length;
    
    // Update slides
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
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    currentHeroSlide = index;
}

// Utility Functions
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification(`Thank you for subscribing with ${email}!`);
    e.target.reset();
}

function handleCheckout() {
    if (!appState.user) {
        showNotification('Please login to continue with checkout', 'error');
        toggleLoginModal();
        return;
    }
    
    showNotification('Redirecting to checkout...');
    // In a real app, this would navigate to checkout page
    setTimeout(() => {
        showNotification('Order placed successfully!');
        clearCart();
        navigateTo('home');
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);