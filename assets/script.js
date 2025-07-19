// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product data
const products = {
    'produk1': {
        id: 'produk1',
        name: 'Seporsi Mie Ayam Sebelum Mati (Brian Khrisna)',
        price: 25000,
        image: 'images/produk/produk1.jpg'
    },
    'produk2': {
        id: 'produk2',
        name: 'Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa (James Clear)',
        price: 50000,
        image: 'images/produk/produk2.jpeg'
    },
    'produk3': {
        id: 'produk3',
        name: 'Laut Bercerita (Leila S. Chudori)',
        price: 20000,
        image: 'images/produk/produk3.jpeg'
    },
    'produk4': {
        id: 'produk4',
        name: 'The Psychology of Money Edisi Revisi (Morgan Housel)',
        price: 30000,
        image: 'images/produk/produk4.jpg'
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