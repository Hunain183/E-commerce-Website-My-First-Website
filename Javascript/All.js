// Function to add product to cart
function addToCart(event) {
    event.preventDefault(); // Prevent the default anchor behavior

    // Get product details from the data attributes
    const productName = event.target.dataset.name;
    const productPrice = parseFloat(event.target.dataset.price);
    const productImage = event.target.dataset.image;

    // Check if price is a valid number
    if (isNaN(productPrice)) {
        alert('Invalid price. Please try again.');
        return;
    }

    // Create a product object
    const product = { name: productName, price: productPrice, image: productImage, quantity: 1 };

    // Get cart from local storage, or initialize if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity
        alert(`${productName} quantity has been updated in your cart!`);
    } else {
        cart.push(product);
        alert(`${productName} has been added to your cart!`);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Search function
document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(product => {
        const name = product.dataset.name.toLowerCase();
        product.style.display = name.includes(query) ? 'block' : 'none';
    });
});


// Cart summary on hover
const cartIcon = document.querySelector('.cart a');
cartIcon.addEventListener('mouseenter', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummary = document.getElementById('cartSummary');

    let cartHTML = '<h3>Cart Summary</h3>';
    cart.forEach(item => {
        cartHTML += `<p>${item.name}: $${item.price} x ${item.quantity}</p>`;
    });

    cartSummary.innerHTML = cartHTML;
    cartSummary.style.display = 'block';
});

cartIcon.addEventListener('mouseleave', function() {
    document.getElementById('cartSummary').style.display = 'none';
});
