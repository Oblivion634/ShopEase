document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const clearCartBtn = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function displayCartItems() {
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
            cartTotal.innerText = "0.00";
            return;
        }

        cart.forEach(item => {
            total += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("col-md-4", "mb-3");

            cartItem.innerHTML = `
                <div class="card" style="height:430px;">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">$${item.price} x <span class="item-quantity">${item.quantity}</span></p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">Remove</button>
                            <div>
                                <button class="btn btn-sm btn-outline-secondary decrease-qty" data-id="${item.id}">-</button>
                                <button class="btn btn-sm btn-outline-secondary increase-qty" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        cartTotal.innerText = total.toFixed(2);
    }

    cartContainer.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-id");

        if (event.target.classList.contains("remove-item")) {
            cart = cart.filter(item => item.id != productId);
        } else if (event.target.classList.contains("increase-qty")) {
            cart = cart.map(item => 
                item.id == productId ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else if (event.target.classList.contains("decrease-qty")) {
            cart = cart.map(item => 
                item.id == productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0); // Remove if quantity reaches 0
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    });

    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        displayCartItems();
    });

    checkoutBtn.addEventListener("click", () => {
        Toastify({
            text: "Added to cart!",
            duration: 3000,  // Duration in milliseconds
            close: true,     // Show close button
            gravity: "top",  // Position: "top" or "bottom"
            position: "right", // "left", "center" or "right"
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
        }).showToast();        
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

    displayCartItems();
});

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
