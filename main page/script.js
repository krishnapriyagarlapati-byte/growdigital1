// ==============================
// Grow Digital Website Script
// ==============================

// Show welcome message in browser console
console.log("Welcome to Grow Digital!");

// ------------------------------
// Smooth Scrolling
// ------------------------------
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (targetId.startsWith('#')) {
            e.preventDefault();

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

    });
});

// ------------------------------
// Sticky Header Shadow
// ------------------------------
const header = document.querySelector("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
    } else {
        header.style.boxShadow = "none";
    }

});

// ------------------------------
// Fade-in Animation
// ------------------------------
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease";

    observer.observe(section);

});

// ------------------------------
// Button Click Alert
// ------------------------------
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        alert("Thank you for choosing Grow Digital! We will contact you soon.");

    });

});

// ------------------------------
// Current Year in Footer
// ------------------------------
const footer = document.querySelector("footer");

const year = new Date().getFullYear();

footer.innerHTML += `<p style="margin-top:15px;">© ${year} Grow Digital. All Rights Reserved.</p>`;