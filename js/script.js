// =============================
// Register Password Validation
// =============================

const registerForm = document.querySelector("#registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            e.preventDefault();
            alert("Passwords do not match!");
        }

    });

}

// =============================
// AFTER PAGE LOAD
// =============================

document.addEventListener("DOMContentLoaded", function () {

    // =============================
    // HAMBURGER MENU
    // =============================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navLinks");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function (e) {

            e.stopPropagation();
            navMenu.classList.toggle("active");

        });

        navMenu.addEventListener("click", function (e) {

            e.stopPropagation();

        });

        document.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    }

});