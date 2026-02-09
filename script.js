// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 1024) {
            nav.classList.remove('active');
        }
    });
});

// Service Card Accordion
const serviceTitles = document.querySelectorAll('.service-title');

serviceTitles.forEach(title => {
    title.addEventListener('click', function() {
        const serviceCard = this.parentElement;
        const isActive = serviceCard.classList.contains('active');
        
        // Close all service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Open clicked card if it wasn't active
        if (!isActive) {
            serviceCard.classList.add('active');
        }
    });
});

// Product Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else {
                const brand = card.getAttribute('data-brand');
                if (brand === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// Booking Form Validation and WhatsApp Redirect
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const serviceType = document.getElementById('serviceType').value;
        const date = document.getElementById('date').value;
        const timeWindow = document.getElementById('timeWindow').value;
        const brand = document.getElementById('brand').value.trim();
        const notes = document.getElementById('notes').value.trim();
        const consent = document.getElementById('consent').checked;
        
        // Validation
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        if (!phone || phone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        
        if (!address) {
            alert('Please enter your address');
            return;
        }
        
        if (!serviceType) {
            alert('Please select a service type');
            return;
        }
        
        if (!date) {
            alert('Please select a preferred date');
            return;
        }
        
        if (!timeWindow) {
            alert('Please select a time window');
            return;
        }
        
        if (!consent) {
            alert('Please agree to be contacted via WhatsApp');
            return;
        }
        
        // Validate date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a date from today onwards');
            return;
        }
        
        // Create WhatsApp message
        let message = `Hello, I want to book ${serviceType} for my RO.\n\n`;
        message += `*Name:* ${name}\n`;
        message += `*Phone:* ${phone}\n`;
        message += `*Address:* ${address}\n`;
        message += `*Preferred Date:* ${date}\n`;
        message += `*Time Window:* ${timeWindow}\n`;
        
        if (brand) {
            message += `*RO Brand/Model:* ${brand}\n`;
        }
        
        if (notes) {
            message += `*Additional Notes:* ${notes}\n`;
        }
        
        message += `\n– Sent from Gupta Trader website`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp URL
        const whatsappURL = `https://wa.me/919852215570?text=${encodedMessage}`;
        
        // Show success message
        successMessage.style.display = 'block';
        bookingForm.style.display = 'none';
        
        // Redirect to WhatsApp after 2 seconds
        setTimeout(function() {
            window.open(whatsappURL, '_blank');
            
            // Reset form and hide success message after 3 seconds
            setTimeout(function() {
                bookingForm.reset();
                bookingForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 3000);
        }, 2000);
    });
}

// Set minimum date for booking form to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    dateInput.setAttribute('min', minDate);
}

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or starts with "#blog-"
        if (href === '#' || href.startsWith('#blog-')) {
            return;
        }
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
});

// Phone number formatting (India format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });
}

// Hide sticky bottom bar on scroll down, show on scroll up (mobile only)
let lastScrollTop = 0;
const stickyBar = document.querySelector('.sticky-bottom-bar');

if (stickyBar && window.innerWidth < 768) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            stickyBar.style.transform = 'translateY(100%)';
        } else {
            // Scrolling up
            stickyBar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, false);
}

// Add loading animation for images (if images are added later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Track clicks for analytics (placeholder - can be connected to analytics)
function trackClick(element, action) {
    console.log(`Click tracked: ${element} - ${action}`);
    // Connect to Google Analytics or other tracking service here
}

// Add click tracking to important CTAs
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        const text = this.textContent.trim();
        trackClick('CTA Button', text);
    });
});

// Service area hover effect enhancement
const serviceCards = document.querySelectorAll('.service-icon-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Form field focus enhancement
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Auto-capitalize name input
const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.addEventListener('blur', function() {
        const words = this.value.split(' ');
        const capitalizedWords = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word;
        });
        this.value = capitalizedWords.join(' ');
    });
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add print functionality
function printPage() {
    window.print();
}

// Emergency contact banner (can be enabled during emergencies)
function showEmergencyBanner(message) {
    const banner = document.createElement('div');
    banner.className = 'emergency-banner';
    banner.innerHTML = `
        <div class="container">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
}

// Lazy load optimization (for future image implementation)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization - defer non-critical CSS
function loadDeferredStyles() {
    const addStylesNode = document.getElementById('deferred-styles');
    if (addStylesNode) {
        const replacement = document.createElement('div');
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement);
        addStylesNode.parentElement.removeChild(addStylesNode);
    }
}

// Load deferred content after page load
window.addEventListener('load', function() {
    loadDeferredStyles();
});

// Add to home screen prompt (PWA-like behavior)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install banner after 30 seconds
    setTimeout(() => {
        if (deferredPrompt) {
            showInstallBanner();
        }
    }, 30000);
});

function showInstallBanner() {
    const banner = document.createElement('div');
    banner.className = 'install-banner';
    banner.innerHTML = `
        <div class="container">
            <p>Add Gupta Trader to your home screen for quick access!</p>
            <button id="installButton">Install</button>
            <button onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    document.body.appendChild(banner);
    
    document.getElementById('installButton').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
            banner.remove();
        }
    });
}

// Detect browser and show compatibility message if needed
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    
    if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browserName = 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browserName = 'Safari';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browserName = 'IE';
        // Show warning for Internet Explorer
        alert('For the best experience, please use a modern browser like Chrome, Firefox, or Safari.');
    }
    
    return browserName;
}

// Initialize
detectBrowser();

// Log page load time (for performance monitoring)
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Accessibility: Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = 'position:absolute;top:-40px;left:0;background:#00796b;color:white;padding:8px;z-index:9999;';
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

console.log('Gupta Trader website initialized successfully!');
