/**
 * Quba Mobile Premium Website JavaScript
 * Created: May 28, 2025
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // Header scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("scrolled");

      if (scrollTop > lastScrollTop) {
        navbar.classList.add("navbar-hidden");
      } else {
        navbar.classList.remove("navbar-hidden");
      }
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Floating elements parallax effect
  const floatingElements = document.querySelectorAll(".floating-element");
  window.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-speed") || "0.05");
      const x = (mouseX - 0.5) * speed * 100;
      const y = (mouseY - 0.5) * speed * 100;

      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Particles effect for hero section
  createParticles();

  // Button particles effect
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("mouseenter", createButtonParticles);
  });

  // Stats counter animation
  const stats = document.querySelectorAll(".stat");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statElement = entry.target;
        const value = parseInt(statElement.getAttribute("data-value"));
        animateCounter(statElement.querySelector("h3"), value);
        statsObserver.unobserve(statElement);
      }
    });
  }, observerOptions);

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Progress bars animation
  const progressBars = document.querySelectorAll(".progress");
  progressBars.forEach((bar) => {
    const width = bar.style.width || "0%";
    bar.style.setProperty("--percent", width);
  });

  // Gallery image modal
  setupGalleryModal();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();

        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
});

// Function to create particles in the hero section
function createParticles() {
  const particleContainer = document.querySelector(".particles-bg");
  if (!particleContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    const size = Math.random() * 5 + 1;

    particle.classList.add("particle");

    // Random position, size, and animation delay
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const animationDelay = Math.random() * 5;
    const opacity = Math.random() * 0.6 + 0.2;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${posX}%;
      top: ${posY}%;
      opacity: ${opacity};
      animation-duration: ${animationDuration}s;
      animation-delay: ${animationDelay}s;
    `;

    particleContainer.appendChild(particle);
  }
}

// Function to create button particle effect
function createButtonParticles(e) {
  const button = e.currentTarget;
  const buttonRect = button.getBoundingClientRect();
  const particleContainer = button.querySelector(".btn-particles");

  if (!particleContainer) return;

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("span");
    particle.classList.add("btn-particle");

    const size = Math.random() * 10 + 5;
    const x = Math.random() * buttonRect.width;
    const y = Math.random() * buttonRect.height;
    const angle = Math.random() * 360;
    const speed = Math.random() * 100 + 50;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      transform: rotate(${angle}deg) translateY(0);
      animation-duration: ${Math.random() * 0.6 + 0.4}s;
    `;

    particleContainer.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
      if (particle.parentNode === particleContainer) {
        particleContainer.removeChild(particle);
      }
    }, 1000);
  }
}

// Function to animate number counter
function animateCounter(element, target) {
  if (!element) return;

  let current = 0;
  const increment = Math.ceil(target / 50);
  const duration = 1500; // milliseconds
  const interval = Math.floor(duration / (target / increment));

  const counter = setInterval(function () {
    current += increment;

    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = current;
    }
  }, interval);
}

// Function to setup gallery image modal
function setupGalleryModal() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Create modal elements if they don't exist
  let modal = document.querySelector(".gallery-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "gallery-modal";
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-content">
          <img src="" alt="Gallery image" class="modal-image">
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-nav">
          <button class="modal-prev">&lt;</button>
          <button class="modal-next">&gt;</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add modal styling
    const style = document.createElement("style");
    style.textContent = `
      .gallery-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
      }
      
      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 2001;
      }
      
      .modal-container {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2002;
      }
      
      .modal-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-image {
        max-width: 100%;
        max-height: 80vh;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      }
      
      .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: white;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      
      .modal-close:hover {
        transform: rotate(90deg);
      }
      
      .modal-nav {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: -60px;
        right: -60px;
        transform: translateY(-50%);
      }
      
      .modal-prev, .modal-next {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      
      .modal-prev:hover, .modal-next:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .modal-show {
        display: block;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @media (max-width: 768px) {
        .modal-nav {
          left: 0;
          right: 0;
        }
        
        .modal-prev, .modal-next {
          width: 40px;
          height: 40px;
          font-size: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const modalOverlay = modal.querySelector(".modal-overlay");
  const modalClose = modal.querySelector(".modal-close");
  const modalImage = modal.querySelector(".modal-image");
  const modalPrev = modal.querySelector(".modal-prev");
  const modalNext = modal.querySelector(".modal-next");
  let currentIndex = 0;
  const images = Array.from(galleryItems).map((item) => ({
    src: item.querySelector("img").src,
    alt: item.querySelector("img").alt,
  }));

  // Add click event to gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentIndex = index;
      updateModal();
      modal.classList.add("modal-show");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal on overlay or X click
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // Previous and next buttons
  modalPrev.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal();
  });

  modalNext.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateModal();
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("modal-show")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModal();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      updateModal();
    }
  });

  function updateModal() {
    if (!images[currentIndex]) return;

    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;
  }

  function closeModal() {
    modal.classList.remove("modal-show");
    document.body.style.overflow = "";
  }
}

// Add CSS for particles to the stylesheet
(function () {
  const style = document.createElement("style");
  style.textContent = `
    .particle {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(108, 99, 255, 0.3);
      pointer-events: none;
      animation: floatParticle linear infinite;
    }
    
    @keyframes floatParticle {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
      }
    }
    
    .btn-particle {
      position: absolute;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: particleRise ease-out forwards;
    }
    
    @keyframes particleRise {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-100px) scale(0);
      }
    }
    
    .no-scroll {
      overflow: hidden;
    }
    
    .navbar.scrolled {
      padding: 1rem 0;
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .navbar.navbar-hidden {
      transform: translateY(-100%);
    }
    
    @media (prefers-color-scheme: dark) {
      .navbar.scrolled {
        background-color: rgba(24, 26, 32, 0.95);
      }
      
      .particle {
        background-color: rgba(128, 119, 255, 0.3);
      }
    }
  `;
  document.head.appendChild(style);
})();
