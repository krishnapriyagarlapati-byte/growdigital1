// Select Elements
const cards = document.querySelectorAll(".card");
const lightbox = document.getElementById("lightbox");
const popupImage = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let currentIndex = 0;
let autoSlide;

// Open Gallery
cards.forEach(card => {

    card.addEventListener("click", function () {

        // Get images from data-images
        images = this.dataset.images
            .split(",")
            .map(img => img.trim());

        currentIndex = 0;

        popupImage.src = images[currentIndex];

        lightbox.style.display = "flex";

        startAutoSlide();

    });

});

// Show Image
function showImage() {

    popupImage.src = images[currentIndex];

}

// Next
function nextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    showImage();

}

// Previous
function prevImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    showImage();

}

// Auto Slide
function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(() => {

        nextImage();

    }, 3000);

}

// Next Button
nextBtn.addEventListener("click", function (e) {

    e.stopPropagation();

    nextImage();

    startAutoSlide();

});

// Previous Button
prevBtn.addEventListener("click", function (e) {

    e.stopPropagation();

    prevImage();

    startAutoSlide();

});

// Close Button
closeBtn.addEventListener("click", closeGallery);

// Click Outside
lightbox.addEventListener("click", function (e) {

    if (e.target === lightbox) {

        closeGallery();

    }

});

// ESC Key
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeGallery();

    }

});

// Close Gallery
function closeGallery() {

    lightbox.style.display = "none";

    clearInterval(autoSlide);

}