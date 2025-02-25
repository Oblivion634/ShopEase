document.addEventListener("DOMContentLoaded", () => {
    const checkoutContainer = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function displayCheckoutItems() {
        checkoutContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            checkoutContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
            checkoutTotal.innerText = "0.00";
            return;
        }

        cart.forEach(item => {
            total += item.price * item.quantity;

            const checkoutItem = document.createElement("div");
            checkoutItem.classList.add("col-md-4", "mb-3");

            checkoutItem.innerHTML = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">$${item.price} x ${item.quantity}</p>
                    </div>
                </div>
            `;

            checkoutContainer.appendChild(checkoutItem);
        });

        checkoutTotal.innerText = total.toFixed(2);
    }

    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get user details
        const fullName = document.getElementById("full-name").value;
        const address = document.getElementById("address").value;
        const paymentMethod = document.getElementById("payment-method").value;

        if (!fullName || !address || !paymentMethod) {
            Toastify({
                text: "Please fill in all the details!",
                duration: 3000,  // Duration in milliseconds
                close: true,     // Show close button
                gravity: "top",  // Position: "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
            }).showToast();
            
            return;
        }

        // Process order (For now, we just clear the cart)
        Toastify({
            text: `Thank you, ${fullName}! Your order has been placed.`,
            duration: 3000,  // Duration in milliseconds
            close: true,     // Show close button
            gravity: "top",  // Position: "top" or "bottom"
            position: "right", // "left", "center" or "right"
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
        }).showToast();
        
        localStorage.removeItem("cart");
        window.location.href = "index.html";  // Redirect to home after checkout
    });

    displayCheckoutItems();
});
