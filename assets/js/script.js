import { fetchProducts } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById("product-list");
    const searchBox = document.getElementById("search-box");
    const cartCount = document.getElementById("cart-count");


    let allProducts = await fetchProducts(); // Store all products

    function displayProducts(products) {
        productContainer.innerHTML = ""; // Clear existing products
        products.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add("col-md-4", "mb-4", "d-flex");  // Added `d-flex`
    
            productItem.innerHTML = `
                <div class="card product-item w-100">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.title}" data-id="${product.id}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-secondary view-details" data-id="${product.id}">View Details</button>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
    
            productContainer.appendChild(productItem);
        });
    
        // Re-add event listeners after filtering
        addProductEventListeners();
        addCartEventListeners();
        addBlurEffect();
        updateCartCount();
    }
    
    function addCartEventListeners() {
        document.querySelectorAll(".add-to-cart").forEach((button) => {
            button.addEventListener("click", (event) => {
                const productId = event.target.getAttribute("data-id");
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exists
        if (!cart.some(item => item.id == productId)) {
            let product = allProducts.find(p => p.id == productId);
            cart.push({...product, quantity: 1});  // Add product with quantity
        } else {
            cart = cart.map(item => 
                item.id == productId ? { ...item, quantity: item.quantity + 1 } : item
            );
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Added to cart!");
    }

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function filterProducts() {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    function addProductEventListeners() {
        document.querySelectorAll('.view-details, .product-image').forEach((element) => {
            element.addEventListener('click', (event) => {
                const productId = event.target.getAttribute("data-id");
                localStorage.setItem("selectedProduct", productId);
                window.location.href = "product.html"; // Redirect to product details page
            });
        });
    }

    // Initial display of products
    displayProducts(allProducts);

    // Search event listener
    searchBox.addEventListener("input", filterProducts);
});

// Function to apply blur effect
function addBlurEffect() {
    const products = document.querySelectorAll('.product-item');

    products.forEach((product) => {
        product.addEventListener('mouseenter', () => {
            products.forEach((item) => {
                if (item !== product) {
                    item.style.transition = 'filter 1s ease-in-out';
                    item.style.filter = 'blur(5px)';
                }
            });
        });

        product.addEventListener('mouseleave', () => {
            products.forEach((item) => {
                item.style.transition = 'filter 1s ease-in-out';
                item.style.filter = 'none';
            });
        });
    });
}

// Hero Section Background Slideshow
document.addEventListener("DOMContentLoaded", () => {
    const heroImages = [
        "assets/images/hero-1.avif",
        "assets/images/hero2.jpg",
        "assets/images/hero3.jpg"
    ];

    let currentIndex = 0;
    const heroSection = document.getElementById("hero");

    function changeHeroBackground() {
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % heroImages.length;
        }
    }

    // Set initial background
    changeHeroBackground();

    // Change background every 4 seconds
    setInterval(changeHeroBackground, 4000);
});
