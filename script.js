// Navigation scroll effect
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Scroll effects
window.addEventListener('scroll', () => {
    // Navigation background
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Statistics counter animation
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateStats();
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Menu tabs
const tabButtons = document.querySelectorAll('.tab-button');
const menuCategories = document.querySelectorAll('.menu-category');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuCategories.forEach(category => category.classList.remove('active'));

        // Add active class to clicked button and corresponding category
        button.classList.add('active');
        const category = document.getElementById(button.getAttribute('data-category'));
        if (category) {
            category.classList.add('active');
        }
    });
});

// Google Maps integration
function initMap() {
    const cafeLocation = { lat: 48.8657, lng: 2.2854 }; // Coordinates for Paris, 16ème
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: cafeLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#2c1810"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#f8f3e9"}]
            }
            // Add more custom styles as needed
        ]
    });

    const marker = new google.maps.Marker({
        position: cafeLocation,
        map: map,
        title: 'Café Hugo'
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="color: #2c1810; margin-bottom: 5px;">Café Hugo</h3>
                <p style="color: #666;">15 Avenue Victor Hugo<br>75016 Paris, France</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Initialize map when the API is loaded
window.initMap = initMap;