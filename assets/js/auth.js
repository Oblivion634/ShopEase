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
            alert("Please fill all fields!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            alert("Email already registered! Please login.");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful! Please login.");
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
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials! Please try again.");
        }
    });
});
