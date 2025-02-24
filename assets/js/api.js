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

// Export the function for use in script.js
export { fetchProducts };
