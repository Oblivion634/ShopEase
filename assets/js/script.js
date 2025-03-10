import {
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
  } from "./api.js";
  
  document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById("product-list");
    const categorySelect = document.getElementById("category-select");
    const searchBox = document.getElementById("search-box");
    const cartCount = document.getElementById("cart-count");
  
    let allProducts = await fetchProducts(); // Fetch all products
    let categories = await fetchCategories(); // Fetch categories
  
    console.log("Categories received:", categories); // Debugging
  
    // Ensure "All Categories" appears first
    categorySelect.innerHTML = `<option value="all">All Categories</option>`;
  
    // Populate categories dynamically
    if (categories.length > 0) {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent =
          category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
      });
    } else {
      console.error("No categories fetched.");
    }
  
    function displayProducts(products) {
      productContainer.innerHTML = ""; // Clear products
      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("col-md-4", "mb-4", "d-flex");
  
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
  
      addProductEventListeners();
      addCartEventListeners();
      updateCartCount();
    }
  
    // Display all products initially
    displayProducts(allProducts);
  
    // Filter products by category
    categorySelect.addEventListener("change", async () => {
      const selectedCategory = categorySelect.value;
      if (selectedCategory === "all") {
        displayProducts(await fetchProducts());
      } else {
        displayProducts(await fetchProductsByCategory(selectedCategory));
      }
    });
  
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
      if (!cart.some((item) => item.id == productId)) {
        let product = allProducts.find((p) => p.id == productId);
        cart.push({ ...product, quantity: 1 }); // Add product with quantity
      } else {
        cart = cart.map((item) =>
          item.id == productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      Toastify({
        text: "Added to cart!",
        duration: 3000, // Duration in milliseconds
        close: true, // Show close button
        gravity: "top", // Position: "top" or "bottom"
        position: "right", // "left", "center" or "right"
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
      }).showToast();
    }
  
    function updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCount.innerText = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    }
  
    function filterProducts() {
      const searchTerm = searchBox.value.toLowerCase();
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    }
  
    function addProductEventListeners() {
      document
        .querySelectorAll(".view-details, .product-image")
        .forEach((element) => {
          element.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            window.open(`product.html?id=${productId}`, "_blank"); // Open in a new tab with ID in URL
          });
        });
    }
  
    // Search event listener
    searchBox.addEventListener("input", filterProducts);
  });
  
  // Hero Section Background Slideshow
  document.addEventListener("DOMContentLoaded", () => {
    const heroImages = [
      "assets/images/hero-1.avif",
      "assets/images/hero2.jpg",
      "assets/images/hero3.jpg",
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
  