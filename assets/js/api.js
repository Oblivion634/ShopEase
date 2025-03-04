const API_URL = "https://fakestoreapi.com/products";

// Function to fetch all products
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Function to fetch product categories
async function fetchCategories() {
    try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

// Function to fetch products by category
async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
}

// Export functions
export { fetchProducts, fetchCategories, fetchProductsByCategory };
