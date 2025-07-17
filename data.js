// Product and category data
const categories = [
    {
        id: 'hoodies',
        name: 'Hoodies',
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
        productCount: 6
    },
    {
        id: 'tshirts',
        name: 'T-Shirts',
        image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
        productCount: 7
    },
    {
        id: 'jeans',
        name: 'Jeans',
        image: 'https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800',
        productCount: 3
    },
    {
        id: 'jackets',
        name: 'Jackets',
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
        productCount: 3
    },
    {
        id: 'sneakers',
        name: 'Sneakers',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
        productCount: 1
    },
    {
        id: 'accessories',
        name: 'Accessories',
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
        productCount: 2
    }
];

const products = [
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
        id: '7',
        name: 'ultra softshirt',
        price: 799,
        originalPrice: 1200,
        discount: 33,
        rating: 3.1,
        reviewCount: 197,
        images: [
            'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg'],
        colors: [
            { name: 'Forest Green', value: '#228B22', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800' },
            { name: 'Navy Blue', value: '#000080', image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'tshirts',
        description: 'Crafted from premium 100% organic cotton, this shirt combines comfort with sustainability.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '8',
        name: 'highquality pure leather jacket',
        price: 579,
        originalPrice: 749,
        discount: 22,
        rating: 3.8,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?_gl=1*1rrkfmi*_ga*MTUzNDYyNjg3NC4xNzUyMjI1MDgx*_ga_8JE65Q40S6*czE3NTI3NTkwMTUkbzIkZzEkdDE3NTI3NTk4MDMkajM3JGwwJGgw'
        ],
        colors: [
            {
                name: 'red', value: '#8b2222ff', image:
                    'https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?_gl=1*1rrkfmi*_ga*MTUzNDYyNjg3NC4xNzUyMjI1MDgx*_ga_8JE65Q40S6*czE3NTI3NTkwMTUkbzIkZzEkdDE3NTI3NTk4MDMkajM3JGwwJGgw'
            }],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'jackets',
        description: 'Crafted from premium 100% organic leather, this jacket combines comfort with sustainability, no animals were harmed.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'pure leather', 'maximum durability'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '9',
        name: 'any size fashion jeans',
        price: 1400,
        originalPrice: 1900,
        discount: 26,
        rating: 4.0,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?_gl=1*1bilm0f*_ga*MTUzNDYyNjg3NC4xNzUyMjI1MDgx*_ga_8JE65Q40S6*czE3NTI3NTkwMTUkbzIkZzEkdDE3NTI3NTk5NzYkajQwJGwwJGgw'
        ],
        colors: [
            {
                name: 'navy blue', value: 'blue', image:
                    'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?_gl=1*1bilm0f*_ga*MTUzNDYyNjg3NC4xNzUyMjI1MDgx*_ga_8JE65Q40S6*czE3NTI3NTkwMTUkbzIkZzEkdDE3NTI3NTk5NzYkajQwJGwwJGgw'
            },],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'jeans',
        description: 'Crafted from premium 100% organic cotton, this jeans combines comfort with sustainability.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '10',
        name: 'ultra quality Hoodie',
        price: 1200,
        originalPrice: 1700,
        discount: 29,
        rating: 3.7,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'
        ],
        colors: [
{ name: 'yellow', value: '#c9da38ff', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'hoodies',
        description: 'Crafted from premium 100% organic cotton, this hoodie combines comfort with sustainability.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '11',
        name: 'Premium Cotton Hoodie',
        price: 500,
        originalPrice: 799,
        discount: 37,
        rating: 3.5,
        reviewCount: 108,
        images: [
            'https://images.pexels.com/photos/31367060/pexels-photo-31367060.png'   ],
        colors: [
           { name: 'black', value: '#000000ff', image:'https://images.pexels.com/photos/31367060/pexels-photo-31367060.png' },
           { name: 'brown', value: '#94884a7b', image:'https://images.pexels.com/photos/31367060/pexels-photo-31367060.png' },
           { name: 'dark green', value: '#1a3926ff', image:'https://images.pexels.com/photos/31367060/pexels-photo-31367060.png' },
           { name: 'grey', value: '#252525ff', image:'https://images.pexels.com/photos/31367060/pexels-photo-31367060.png' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'accessories',
        description: 'just a good belt',
        features: ['strecthy', 'thick fibers'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '12',
        name: 'pure leather long belt',
        price: 749,
        originalPrice: 999,
        discount: 25,
        rating: 4.0,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/31367058/pexels-photo-31367058.jpeg?'
        ],
       
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'accessories',
        description: 'pure leather belt!',
        features: ['most reliable belt on the market', 'bestseller fo 2021'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '13',
        name: 'new brand t-shirt',
        price: 300,
        originalPrice: 500,
        discount: 40,
        rating: 3.8,
        reviewCount: 127,
        images: [
           'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg'
        ],
        colors: [
            { name: 'red', value: '#9a4848ff', image: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg' },
              ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'tshirts',
        description: 'Crafted from premium 100% organic cotton, this shirt combines comfort with sustainability.',
        features: ['100% rewashable','summer friendly'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '14',
        name: 'stylish shirt',
        price: 500,
        originalPrice: 700,
        discount: 28,
        rating: 3.5,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg'   ],
        colors: [
         { name: 'blue', value: '#000080', image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'tshirts',
        description: 'comfort and style combined into one',
        features: ['100% organic cotton fleece', 'Machine washable'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '15',
        name: 'nice and free flowing t-shirt',
        price: 900,
        originalPrice: 1300,
        discount: 31,
        rating: 2.8,
        reviewCount: 27,
        images: [
            'https://images.pexels.com/photos/3775119/pexels-photo-3775119.jpeg'
        ],
        colors: [
           { name: 'yellow', value: '#c2d33cff', image: 'https://images.pexels.com/photos/3775119/pexels-photo-3775119.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'tshirts',
        description: 't-shirt for your summer adventures',
        features: ['100% organic cotton fleece', 'Machine washable'],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '16',
        name: 'Premium Cotton Hoodie',
        price: 1500,
        originalPrice: 2000,
        discount: 25,
        rating: 4.8,
        reviewCount: 107,
        images: [
            'https://images.pexels.com/photos/1192335/pexels-photo-1192335.jpeg'
          ],
        colors: [
         { name: 'grey', value: '#343434ff', image: 'https://images.pexels.com/photos/1192335/pexels-photo-1192335.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'hoodies',
        description: 'Crafted from premium 100% organic cotton, this hoodie combines comfort with sustainability.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '17',
        name: 'Premium Cotton Hoodie',
        price: 1534,
        originalPrice: 1800,
        discount: 15,
        rating: 4.8,
        reviewCount: 127,
        images: [
                'https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg'
           ],
        colors: [
           { name: 'light grey', value: '#313131ff', image:'https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'hoodies',
        description: 'Crafted from premium 100% organic cotton, this hoodie combines comfort with sustainability.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '18',
        name: 't-shirt',
        price: 600,
        originalPrice: 800,
        discount: 25,
        rating: 2.8,
        reviewCount: 127,
        images: [
        'https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg'
      ],
        colors: [
           { name: 'white', value: '#ffffffff', image:'https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'tshirts',
        description: 'Crafted from premium 100% organic cotton, this t-shirt combines comfort with sustainability.',
        features: ['100% organic cotton fleece', 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: true
    },
    {
        id: '19',
        name: 'winter times jacket',
        price: 2000,
        originalPrice: 3000,
        discount: 33,
        rating: 4.2,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/54206/pexels-photo-54206.jpeg'
       ],
        colors: [
              { name: 'black', value: '#000000ff', image: 'https://images.pexels.com/photos/54206/pexels-photo-54206.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'jackets',
        description: 'a perfect jacket to keep you warm duing winter times',
        features: [ 'Drawstring hood', 'Kangaroo pocket', 'Machine washable'],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '20',
        name: 'high durability jacket',
        price: 1699,
        originalPrice: 2000,
        discount: 15,
        rating: 3.5,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg'   
        ],
        colors: [
            { name: ' Green', value: '#2d432dff', image: 'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg' },
            ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'hoodies',
        description: 'leather jacket fir for everyone',
        features: ['tear resistant', 'high-quality material'],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '21',
        name: 'premium cold resistance jacket',
        price: 1200,
        originalPrice: 1500,
        discount: 20,
        rating: 4.0,
        reviewCount: 127,
        images: [
            'https://images.pexels.com/photos/106567/pexels-photo-106567.jpeg'
         ],
        colors: [
             { name: 'black', value: '#000000ff', image: 'https://images.pexels.com/photos/106567/pexels-photo-106567.jpeg' }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'jackets',
        description: 'Crafted from premium 100% organic cotton, this jacket combines comfort with sustainability.',
        features: ['long lasting design', 'Drawstring hood', 'Kangaroo pocket', ],
        inStock: true,
        isBestSeller: false
    },
    {
        id: '22',
        name: 'fany jeans for all ages',
        price: 600,
        originalPrice: 1000,
        discount: 22,
        rating: 3.6,
        reviewCount: 45,
        images: [
        'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg'  
        ],
        colors: [
            { name: 'whitesh blue', value: '#93def3ff', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg' },
            { name: 'light blue', value: '#7ef2f6ff', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg' },
            { name: 'blue', value: '#4597dfff', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg' },
            { name: 'dark blue', value: '#22298bff', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg' },
            { name: 'cargo blue', value: '#27228bff', image: 'https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg' },],

        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        category: 'jeans',
        description: 'long lasting with fitting design',
        features: ['deep pockets', 'multicolor'],
        inStock: true,
        isBestSeller: false
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

// Helper functions
function getFeaturedProducts() {
    return products.filter(p => p.isBestSeller || p.isNew).slice(0, 8);
}

function getBestSellers() {
    return products.filter(p => p.isBestSeller);
}

function getNewArrivals() {
    return products.filter(p => p.isNew);
}

function getSaleProducts() {
    return products.filter(p => p.discount && p.discount > 0);
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= Math.floor(rating);
        starsHtml += `
            <svg class="star ${filled ? 'filled' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
        `;
    }
    return starsHtml;
}