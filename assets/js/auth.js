document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");

    // Toggle between login and signup
    showSignup.addEventListener("click", () => {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    showLogin.addEventListener("click", () => {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Signup Function
    signupBtn.addEventListener("click", () => {
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        if (!name || !email || !password) {
            Toastify({
                text: "Please fill all the fields!",
                duration: 3000,  // Duration in milliseconds
                close: true,     // Show close button
                gravity: "top",  // Position: "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
            }).showToast();
            
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            Toastify({
                text: "Email already registered! Please login.",
                duration: 3000,  // Duration in milliseconds
                close: true,     // Show close button
                gravity: "top",  // Position: "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
            }).showToast();
            
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        Toastify({
            text: "Signup successful! Please login.",
            duration: 3000,  // Duration in milliseconds
            close: true,     // Show close button
            gravity: "top",  // Position: "top" or "bottom"
            position: "right", // "left", "center" or "right"
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
        }).showToast();
        
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Login Function
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            Toastify({
                text: "Login successful!",
                duration: 3000,  // Duration in milliseconds
                close: true,     // Show close button
                gravity: "top",  // Position: "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
            }).showToast();
            
            window.location.href = "index.html";
        } else {
            Toastify({
                text: "Invalid credentials! Please try again.",
                duration: 3000,  // Duration in milliseconds
                close: true,     // Show close button
                gravity: "top",  // Position: "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Custom background
            }).showToast();
            
        }
    });
});
