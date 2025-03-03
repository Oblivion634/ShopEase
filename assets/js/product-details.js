import { fetchProducts } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const productDetailsContainer = document.getElementById("product-details");

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        productDetailsContainer.innerHTML = `<p class="text-danger">Product not found!</p>`;
        return;
    }

    // Fetch products from API
    const products = await fetchProducts();
    const product = products.find(p => p.id == productId);

    if (!product) {
        productDetailsContainer.innerHTML = `<p class="text-danger">Product not found!</p>`;
        return;
    }

    productDetailsContainer.innerHTML = `
        <div class="col-md-4 me-5">
            <img src="${product.image}" class="img-fluid p-3" alt="${product.title}" style="height:370px;">
        </div>
        <div class="col-md-5 ms-5">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h4 class="text-success">$${product.price}</h4>
            <button class="btn btn-primary cart-btn" data-id="${product.id}">Add to Cart</button>
            <a href="index.html" class="btn btn-secondary">Back to Shop</a>
        </div>
    `;

    // Add event listener to cart button
    document.querySelector(".cart-btn").addEventListener("click", () => addToCart(product));
});

// Function to add items to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item is already in cart
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    Toastify({
        text: "Added to cart!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}

// Function to update cart count in the navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

// Update cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
