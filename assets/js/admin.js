// Product Management System

// Initialize products from localStorage or use default products
let products = JSON.parse(localStorage.getItem('adminProducts')) || [
    {id: 1, name: 'Dove Shampoo', price: 49.99, category: 'beauty', image: 'assets/images/hair-care/dove.jpeg', discount: 0},
    {id: 2, name: 'Serum', price: 12.00, category: 'beauty', image: 'assets/images/hair-care/serum.jpg', discount: 0},
    {id: 3, name: 'Hair Oil', price: 99.00, category: 'beauty', image: 'assets/images/hair-care/serum-2.jpg', discount: 0},
    {id: 4, name: 'Airpods', price: 90.99, category: 'electronics', image: 'assets/images/electronics/airpods.jpeg', discount: 0},
    {id: 5, name: 'Headphones', price: 39.99, category: 'electronics', image: 'assets/images/electronics/headphones.jpeg', discount: 0},
    {id: 6, name: 'JBL Speaker', price: 199.99, category: 'electronics', image: 'assets/images/electronics/jbl.jpeg', discount: 0},
    {id: 7, name: 'Mouse', price: 19.99, category: 'electronics', image: 'assets/images/electronics/mouse.jpeg', discount: 0},
    {id: 8, name: 'Uriage', price: 19.99, category: 'beauty', image: 'assets/images/skin-care/uriage.jpg', discount: 0},
    {id: 9, name: 'Fitness Tracker', price: 49.99, category: 'sports', image: 'assets/images/outdoor/fitness-tracker.jpeg', discount: 0},
    {id: 10, name: 'Camping Tent', price: 99.99, category: 'sports', image: 'assets/images/outdoor/camping-tent.jpeg', discount: 0},
    {id: 11, name: 'Yoga Mat', price: 29.99, category: 'sports', image: 'assets/images/outdoor/yoga-mat.jpeg', discount: 0},
    {id: 12, name: 'Cycling Helmet', price: 59.99, category: 'sports', image: 'assets/images/outdoor/cycling-helmet.jpeg', discount: 0},
    {id: 13, name: 'Educational Toy', price: 29.99, category: 'toys', image: 'assets/images/toys/educational-toy.jpeg', discount: 0},
    {id: 14, name: 'Action Figure', price: 19.99, category: 'toys', image: 'assets/images/toys/action-figure.jpeg', discount: 0},
    {id: 15, name: 'Board Game', price: 39.99, category: 'toys', image: 'assets/images/toys/board-game.jpeg', discount: 0},
    {id: 16, name: 'Outdoor Play Equipment', price: 89.99, category: 'toys', image: 'assets/images/toys/outdoor-toy.jpeg', discount: 0}
];

let editingProductId = null;

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('adminProducts', JSON.stringify(products));
    // Also update the main products for the store
    updateStoreProducts();
}

// Update store products (this will be used by the main store pages)
function updateStoreProducts() {
    localStorage.setItem('storeProducts', JSON.stringify(products));
}

// Calculate final price after discount
function calculateFinalPrice(price, discount) {
    return price - (price * discount / 100);
}

// Load and display products in table
function loadProducts() {
    const tbody = document.getElementById('productTableBody');
    const filterCategory = document.getElementById('filterCategory').value;
    const searchTerm = document.getElementById('searchProduct').value.toLowerCase();
    
    let filteredProducts = products.filter(product => {
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    tbody.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const finalPrice = calculateFinalPrice(product.price, product.discount);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="../${product.image}" alt="${product.name}" onerror="this.src='../assets/images/placeholder.png'"></td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.discount > 0 ? `<span class="discount-badge">${product.discount}% OFF</span>` : '-'}</td>
            <td>${product.discount > 0 ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ''}$${finalPrice.toFixed(2)}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        'beauty': 'Beauty & Personal Care',
        'electronics': 'Electronics',
        'toys': 'Toys & Games',
        'sports': 'Sports & Outdoors',
        'accessories': 'Accessories'
    };
    return categories[category] || category;
}

// Handle form submission
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value,
        discount: parseFloat(document.getElementById('productDiscount').value) || 0
    };

    if (editingProductId) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            alert('Product updated successfully!');
        }
        editingProductId = null;
        document.getElementById('form-title').textContent = 'Add New Product';
    } else {
        // Add new product
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...productData });
        alert('Product added successfully!');
    }

    saveProducts();
    resetForm();
    loadProducts();
});

// Edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingProductId = id;
    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDiscount').value = product.discount || 0;

    // Scroll to form
    document.querySelector('.product-form-section').scrollIntoView({ behavior: 'smooth' });
}

// Delete product
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        saveProducts();
        loadProducts();
        alert('Product deleted successfully!');
    }
}

// Reset form
function resetForm() {
    document.getElementById('productForm').reset();
    editingProductId = null;
    document.getElementById('form-title').textContent = 'Add New Product';
    document.getElementById('productId').value = '';
}

// Apply bulk discount
function applyBulkDiscount() {
    const category = document.getElementById('bulkCategory').value;
    const discount = parseFloat(document.getElementById('bulkDiscount').value) || 0;

    if (discount < 0 || discount > 100) {
        alert('Discount must be between 0 and 100!');
        return;
    }

    let updatedCount = 0;
    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            product.discount = discount;
            updatedCount++;
        }
    });

    saveProducts();
    loadProducts();
    alert(`Discount of ${discount}% applied to ${updatedCount} product(s)!`);
}

// Filter and search functionality
document.getElementById('filterCategory').addEventListener('change', loadProducts);
document.getElementById('searchProduct').addEventListener('input', loadProducts);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    saveProducts(); // Ensure products are saved initially
    loadProducts();
});
