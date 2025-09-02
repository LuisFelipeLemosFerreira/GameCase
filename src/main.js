// Main JavaScript file for GameCase Pro Landing Page

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation()
  initContactForm()
  initSmoothScrolling()
  initAnimations()
  handleCarouselAutoPlay()

  console.log("GameCase Pro Landing Page initialized successfully!")
})

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll(".nav-link")

  // Handle navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update active nav link based on scroll position
    updateActiveNavLink()
  })

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          const offsetTop = target.offsetTop - 80 // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const nome = formData.get("nome")
      const email = formData.get("email")
      const mensagem = formData.get("mensagem")

      // Basic validation
      if (!nome || !email || !mensagem) {
        showAlert("Por favor, preencha todos os campos.", "danger")
        return
      }

      if (!isValidEmail(email)) {
        showAlert("Por favor, insira um e-mail válido.", "danger")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        showAlert("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
        contactForm.reset()

        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Show alert messages
function showAlert(message, type = "info") {
  // Remove existing alerts
  const existingAlert = document.querySelector(".custom-alert")
  if (existingAlert) {
    existingAlert.remove()
  }

  // Create alert element
  const alert = document.createElement("div")
  alert.className = `alert alert-${type} custom-alert position-fixed`
  alert.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `
  alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "danger" ? "exclamation-triangle" : "info-circle"} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `

  document.body.appendChild(alert)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove()
    }
  }, 5000)
}

// Smooth scrolling for all anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      const target = document.querySelector(href)

      if (target && href !== "#") {
        e.preventDefault()

        const offsetTop = target.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Initialize animations and effects
function initAnimations() {
  // Add loading class to elements for fade-in effect
  const animatedElements = document.querySelectorAll(".testimonial-card, .price-card, .contact-form")

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loading")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Add hover effects to cards
  const cards = document.querySelectorAll(".testimonial-card, .price-card")
  cards.forEach((card) => {
    card.classList.add("hover-lift")
  })
}

// Utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top functionality
window.addEventListener("scroll", () => {
  const scrollButton = document.getElementById("scrollToTop")
  if (scrollButton) {
    if (window.scrollY > 300) {
      scrollButton.style.display = "block"
    } else {
      scrollButton.style.display = "none"
    }
  }
})

// Handle carousel auto-play pause on hover
function handleCarouselAutoPlay() {
  const carousel = document.querySelector("#testimonialsCarousel")
  if (carousel) {
    carousel.addEventListener("mouseenter", function () {
      const carouselInstance = window.bootstrap.Carousel.getInstance(this)
      if (carouselInstance) {
        carouselInstance.pause()
      }
    })

    carousel.addEventListener("mouseleave", function () {
      const carouselInstance = window.bootstrap.Carousel.getInstance(this)
      if (carouselInstance) {
        carouselInstance.cycle()
      }
    })
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(updateActiveNavLink, 10)
window.addEventListener("scroll", debouncedScrollHandler)
