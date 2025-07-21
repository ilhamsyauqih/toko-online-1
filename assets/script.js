// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product data
const products = {
    'produk1': {
        id: 'produk1',
        name: 'Seporsi Mie Ayam Sebelum Mati (Brian Khrisna)',
        price: 83700,
        image: 'images/produk/produk1.jpg',
        category: 'Fiksi',
        author: 'Brian Khrisna'
    },
    'produk2': {
        id: 'produk2',
        name: 'Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa (James Clear)',
        price: 50000,
        image: 'images/produk/produk2.jpeg',
        category: 'Non-Fiksi',
        author: 'James Clear'
    },
    'produk3': {
        id: 'produk3',
        name: 'Laut Bercerita (Leila S. Chudori)',
        price: 130000,
        image: 'images/produk/produk3.jpeg',
        category: 'Fiksi',
        author: 'Leila S. Chudori'
    },
    'produk4': {
        id: 'produk4',
        name: 'The Psychology of Money Edisi Revisi (Morgan Housel)',
        price: 85000,
        image: 'images/produk/produk4.jpg',
        category: 'Non-Fiksi',
        author: 'Morgan Housel'
    },
    'produk5': {
        id: 'produk5',
        name: 'Filosofi Teras (New Cover) (Henry Manampiring)',
        price: 108000,
        image: 'images/produk/produk5.jpg',
        category: 'Fiksi',
        author: 'Henry Manampiring'
    },
    'produk6': {
        id: 'produk6',
        name: 'Sejarah Dunia Yang Disembunyikan (Jonathan Black)',
        price: 165000,
        image: 'images/produk/produk6.jpg',
        category: 'Non-Fiksi',
        author: 'Jonathan Black'
    },
    'produk7': {
        id: 'produk7',
        name: 'Bicara Itu Ada Seninya - Soft Cover (Oh Su Hyang)',
        price: 63000,
        image: 'images/produk/produk7.jpg',
        category: 'Fiksi',
        author: 'Oh Su Hyang'
    },
    'produk8': {
        id: 'produk8',
        name: 'Sisi Tergelap Surga (Brian Khrisna)',
        price: 89000,
        image: 'images/produk/produk8.jpg',
        category: 'Fiksi',
        author: 'Brian Khrisna'
    },
    'produk9': {
        id: 'produk9',
        name: 'Sebuah Seni untuk Bersikap Bodo Amat (edisi handy)',
        price: 70200,
        image: 'images/produk/produk9.jpg',
        category: 'Fiksi',
        author: 'Mark Manson'
    },
    'produk10': {
        id: 'produk10',
        name: 'Novel Dompet Ayah Sepatu Ibu (J.S. Khairen)',
        price: 79200,
        image: 'images/produk/produk10.jpg',
        category: 'Fiksi',
        author: 'J.S. Khairen'
    },
    'produk11': {
        id: 'produk11',
        name: 'Ayah, Ini Arahnya ke Mana, ya? (Khoirul Trian)',
        price: 71100,
        image: 'images/produk/produk11.jpg',
        category: 'Fiksi',
        author: 'Khoirul Trian'
    },
    'produk12': {
        id: 'produk12',
        name: 'Kado Terbaik (J.S. Khairen)',
        price: 75650,
        image: 'images/produk/produk12.jpg',
        category: 'Fiksi',
        author: 'J.S. Khairen'
    },
    'produk14': {
        id: 'produk14',
        name: 'Funiculi Funicula: Kisah-Kisah yang Baru Terungkap (Toshikazu Kawaguchi)',
        price: 71100,
        image: 'images/produk/produk14.jpg',
        category: 'Fiksi',
        author: 'Toshikazu Kawaguchi'
    },
    'produk15': {
        id: 'produk15',
        name: 'Kamu Tak Harus Sempurna',
        price: 38000,
        image: 'images/produk/produk15.jpg',
        category: 'Non-Fiksi',
        author: 'Unknown'
    },
    'produk16': {
        id: 'produk16',
        name: 'Berani Tidak Disukai',
        price: 88200,
        image: 'images/produk/produk16.jpg',
        category: 'Non-Fiksi',
        author: 'Ichiro Kishimi'
    },
    'produk17': {
        id: 'produk17',
        name: 'Teka-Teki Rumah Aneh (Uketsu)',
        price: 71100,
        image: 'images/produk/produk17.jpg',
        category: 'Fiksi',
        author: 'Uketsu'
    }
};

// Add item to cart
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    displayCartItems();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
        displayCartItems();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display (cart count badge)
function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    
    if (cartBadge) {
        if (cartCount > 0) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = 'inline';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
}

// Display cart items (for cart.html)
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return; // Not on cart page
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="${item.image}" class="img-fluid rounded-start h-100" alt="${item.name}" style="object-fit: cover; style="scale: 0.1">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text text-muted">${formatCurrency(item.price)}</p>
                            </div>
                            <div class="col-md-3">
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <input type="number" class="form-control text-center" value="${item.quantity}" min="1" 
                                           onchange="updateQuantity('${item.id}', parseInt(this.value))">
                                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3 text-end">
                                <p class="fw-bold mb-2">${formatCurrency(item.price * item.quantity)}</p>
                                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">
                                    <i class="bi bi-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 10000;
    const total = subtotal + shipping;
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotal);
    if (totalElement) totalElement.textContent = formatCurrency(total);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10000;
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Terima kasih! Pesanan Anda sebanyak ${itemCount} item dengan total ${formatCurrency(total)} akan diproses.`);
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartDisplay();
    displayCartItems();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // If on cart page, display cart items
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
    
    // Add cart badge to navbar if not exists
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink && !document.getElementById('cart-badge')) {
        const badge = document.createElement('span');
        badge.id = 'cart-badge';
        badge.className = 'badge bg-danger rounded-pill ms-1';
        badge.style.display = 'none';
        cartLink.appendChild(badge);
        updateCartDisplay();
    }
});

// Search functionality
function performSearch(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showNotification('Silakan masukkan kata kunci pencarian!');
        return;
    }
    
    // Search through products
    const searchResults = Object.values(products).filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.author.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
    
    displaySearchResults(searchResults, searchTerm);
}

function displaySearchResults(results, searchTerm) {
    // Check if we're on the homepage
    const productSection = document.getElementById('products');
    if (!productSection) {
        // If not on homepage, redirect to homepage with search results
        sessionStorage.setItem('searchResults', JSON.stringify(results));
        sessionStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'index.html#products';
        return;
    }
    
    // Find the product container
    const productContainer = productSection.querySelector('.row');
    if (!productContainer) return;
    
    // Update section title
    const sectionTitle = productSection.querySelector('h2');
    if (sectionTitle) {
        if (results.length > 0) {
            sectionTitle.textContent = `Hasil Pencarian "${searchTerm}" (${results.length} produk)`;
        } else {
            sectionTitle.textContent = `Tidak ada hasil untuk "${searchTerm}"`;
        }
    }
    
    // Clear current products
    productContainer.innerHTML = '';
    
    if (results.length === 0) {
        productContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search" style="font-size: 3rem; color: #ccc;"></i>
                <h4 class="mt-3 text-muted">Tidak ada produk yang ditemukan</h4>
                <p class="text-muted">Coba gunakan kata kunci yang berbeda</p>
                <button class="btn btn-primary" onclick="showAllProducts()">Lihat Semua Produk</button>
            </div>
        `;
        return;
    }
    
    // Display search results
    results.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
    
    // Add "Show All Products" button
    const showAllButton = document.createElement('div');
    showAllButton.className = 'col-12 text-center mt-4';
    showAllButton.innerHTML = `
        <button class="btn btn-outline-primary" onclick="showAllProducts()">Lihat Semua Produk</button>
    `;
    productContainer.appendChild(showAllButton);
    
    // Scroll to products section
    productSection.scrollIntoView({ behavior: 'smooth' });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3 mb-4';
    
    const categoryBadgeClass = product.category === 'Fiksi' ? 'bg-primary' : 'bg-success';
    
    col.innerHTML = `
        <div class="card h-100" style="cursor: pointer;" onclick="window.location.href='halaman_produk/${product.id}.html'">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <span class="badge ${categoryBadgeClass} mb-2" style="width: 40%;">${product.category}</span>
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Rp${product.price.toLocaleString('id-ID')}</p>
                <button class="btn btn-warning w-100 mt-auto" onclick="event.stopPropagation(); addToCart('${product.id}')">
                    <i class="bi bi-cart3 me-1"></i>Tambah
                </button>
            </div>
        </div>
    `;
    
    return col;
}

function showAllProducts() {
    // Reload the page to show all products
    window.location.href = 'index.html#products';
    window.location.reload();
}

// Handle search results from sessionStorage (when redirected from other pages)
document.addEventListener('DOMContentLoaded', function() {
    const savedResults = sessionStorage.getItem('searchResults');
    const savedSearchTerm = sessionStorage.getItem('searchTerm');
    
    if (savedResults && savedSearchTerm) {
        const results = JSON.parse(savedResults);
        displaySearchResults(results, savedSearchTerm);
        
        // Clear saved search results
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('searchTerm');
        
        // Update search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = savedSearchTerm;
        }
    }
    
    // Initialize contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Harap lengkapi semua field yang diperlukan!', 'warning');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Format email tidak valid!', 'warning');
        return;
    }
    
    // Simulate form submission
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Mengirim...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Pesan Anda berhasil dikirim! Kami akan segera merespons.', 'success');
        
        // Optional: Create mailto link as fallback
        const mailtoLink = `mailto:info@tokobuku.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
        
        // You can uncomment the line below to open email client
        // window.location.href = mailtoLink;
        
    }, 2000);
}

// Enhanced notification function with type support
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    
    let alertClass = 'alert-success';
    let icon = 'bi-check-circle-fill';
    
    if (type === 'warning') {
        alertClass = 'alert-warning';
        icon = 'bi-exclamation-triangle-fill';
    } else if (type === 'error') {
        alertClass = 'alert-danger';
        icon = 'bi-x-circle-fill';
    }
    
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
    notification.innerHTML = `
        <i class="bi ${icon} me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Real-time search functionality
let searchTimeout;
let originalProducts = null;

function handleRealTimeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Store original products on first search
    if (originalProducts === null) {
        storeOriginalProducts();
    }
    
    // Debounce search to avoid excessive filtering
    searchTimeout = setTimeout(() => {
        if (searchTerm === '') {
            // If search is empty, restore original products
            restoreOriginalProducts();
        } else {
            // Perform real-time search
            performRealTimeSearch(searchTerm);
        }
    }, 300); // 300ms delay
}

function storeOriginalProducts() {
    const productSection = document.getElementById('products');
    if (!productSection) return;
    
    const productContainer = productSection.querySelector('.row');
    const sectionTitle = productSection.querySelector('h2');
    
    if (productContainer && sectionTitle) {
        originalProducts = {
            title: sectionTitle.textContent,
            html: productContainer.innerHTML
        };
    }
}

function restoreOriginalProducts() {
    if (!originalProducts) return;
    
    const productSection = document.getElementById('products');
    if (!productSection) return;
    
    const productContainer = productSection.querySelector('.row');
    const sectionTitle = productSection.querySelector('h2');
    
    if (productContainer && sectionTitle) {
        sectionTitle.textContent = originalProducts.title;
        productContainer.innerHTML = originalProducts.html;
    }
}

function performRealTimeSearch(searchTerm) {
    // Search through products
    const searchResults = Object.values(products).filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.author.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm);
    });
    
    displayRealTimeResults(searchResults, searchTerm);
}

function displayRealTimeResults(results, searchTerm) {
    const productSection = document.getElementById('products');
    if (!productSection) return;
    
    const productContainer = productSection.querySelector('.row');
    const sectionTitle = productSection.querySelector('h2');
    
    if (!productContainer || !sectionTitle) return;
    
    // Update section title
    if (results.length > 0) {
        sectionTitle.innerHTML = `<i class="bi bi-search me-2"></i>Hasil Pencarian "${searchTerm}" (${results.length} produk)`;
    } else {
        sectionTitle.innerHTML = `<i class="bi bi-search me-2"></i>Tidak ada hasil untuk "${searchTerm}"`;
    }
    
    // Clear current products
    productContainer.innerHTML = '';
    
    if (results.length === 0) {
        productContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search" style="font-size: 3rem; color: #ccc;"></i>
                <h4 class="mt-3 text-muted">Tidak ada produk yang ditemukan</h4>
                <p class="text-muted">Coba gunakan kata kunci yang berbeda</p>
                <button class="btn btn-primary" onclick="clearSearch()">Lihat Semua Produk</button>
            </div>
        `;
        return;
    }
    
    // Display search results with animation
    results.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        productContainer.appendChild(productCard);
        
        // Animate in with delay
        setTimeout(() => {
            productCard.style.transition = 'all 0.3s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 50); // Stagger animation
    });
    
    // Add "Show All Products" button if there are results
    if (results.length > 0) {
        const showAllButton = document.createElement('div');
        showAllButton.className = 'col-12 text-center mt-4';
        showAllButton.innerHTML = `
            <button class="btn btn-outline-primary" onclick="clearSearch()">Lihat Semua Produk</button>
        `;
        productContainer.appendChild(showAllButton);
    }
    
    // Scroll to products section smoothly
    productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        restoreOriginalProducts();
    }
}