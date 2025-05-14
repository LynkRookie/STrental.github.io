// Main JavaScript para index.html y páginas principales

document.addEventListener("DOMContentLoaded", () => {
  // Navegación principal
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle del menú móvil
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })
  }

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Slider de propiedades destacadas
  const featuredSlider = document.querySelector(".featured-slider")
  const prevButton = document.querySelector(".slider-prev")
  const nextButton = document.querySelector(".slider-next")

  if (featuredSlider && prevButton && nextButton) {
    let slideIndex = 0
    const slides = featuredSlider.querySelectorAll(".property-card")
    const totalSlides = slides.length
    const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3

    // Función para mostrar slides
    function showSlides() {
      slides.forEach((slide, index) => {
        slide.style.display = "none"
      })

      for (let i = slideIndex; i < slideIndex + slidesToShow; i++) {
        if (i < totalSlides) {
          slides[i].style.display = "block"
        }
      }
    }

    // Inicializar slider
    showSlides()

    // Botones de navegación
    prevButton.addEventListener("click", () => {
      slideIndex = Math.max(0, slideIndex - 1)
      showSlides()
    })

    nextButton.addEventListener("click", () => {
      slideIndex = Math.min(totalSlides - slidesToShow, slideIndex + 1)
      showSlides()
    })

    // Actualizar slider en cambio de tamaño de ventana
    window.addEventListener("resize", () => {
      const newSlidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
      if (newSlidesToShow !== slidesToShow) {
        slideIndex = 0
        showSlides()
      }
    })
  }

  // Formulario de búsqueda
  const searchForm = document.getElementById("searchForm")
  const locationSelect = document.getElementById("locationSelect")
  const priceRange = document.getElementById("priceRange")
  const priceValue = document.getElementById("priceValue")

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulación de búsqueda
      const location = locationSelect ? locationSelect.value : ""
      const price = priceRange ? priceRange.value : ""
      const roomType = document.querySelector('input[name="roomType"]:checked')?.value || ""

      alert(`Búsqueda realizada: Ubicación: ${location}, Precio máximo: $${price}, Tipo: ${roomType}`)

      // Aquí se implementaría la redirección a resultados de búsqueda
      // window.location.href = `search-results.html?location=${location}&price=${price}&type=${roomType}`;
    })

    // Actualizar valor de precio en tiempo real
    if (priceRange && priceValue) {
      priceRange.addEventListener("input", () => {
        priceValue.textContent = Number(priceRange.value).toLocaleString()
      })

      // Inicializar valor
      priceValue.textContent = Number(priceRange.value).toLocaleString()
    }
  }

  // Formularios de login y registro
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")
  const loginModal = document.getElementById("loginModal")
  const registerModal = document.getElementById("registerModal")
  const modalToggles = document.querySelectorAll("[data-toggle='modal']")
  const modalCloses = document.querySelectorAll(".modal-close, .cancel-modal")

  // Abrir modales
  modalToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()
      const target = toggle.getAttribute("data-target")
      document.getElementById(target).style.display = "block"
      document.body.style.overflow = "hidden"
    })
  })

  // Cerrar modales
  modalCloses.forEach((close) => {
    close.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none"
      })
      document.body.style.overflow = "auto"
    })
  })

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Procesar formulario de login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value

      // Simulación de login
      if (email && password) {
        // Verificar si es admin
        if (email === "admin@rentrooms.com" && password === "admin") {
          window.location.href = "assets/Vista/Dashboard Admin/admin-panel.html"
        } else {
          window.location.href = "assets/Vista/Dashboard Usuario/user-panel.html"
        }
      } else {
        alert("Por favor, complete todos los campos.")
      }
    })
  }

  // Procesar formulario de registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("registerName").value
      const email = document.getElementById("registerEmail").value
      const password = document.getElementById("registerPassword").value
      const confirmPassword = document.getElementById("confirmPassword").value
      const userType = document.querySelector('input[name="userType"]:checked')?.value

      // Validación básica
      if (!name || !email || !password || !confirmPassword || !userType) {
        alert("Por favor, complete todos los campos.")
        return
      }

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.")
        return
      }

      // Simulación de registro exitoso
      alert("¡Registro exitoso! Ahora puede iniciar sesión.")

      // Cerrar modal de registro y abrir modal de login
      if (registerModal && loginModal) {
        registerModal.style.display = "none"
        loginModal.style.display = "block"
      }

      // Limpiar formulario
      registerForm.reset()
    })
  }

  // Testimonios carrusel
  const testimonialsContainer = document.querySelector(".testimonials-container")
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")

  if (testimonialsContainer && testimonialItems.length > 0) {
    let currentTestimonial = 0

    // Función para mostrar testimonial actual
    function showTestimonial() {
      testimonialItems.forEach((item, index) => {
        item.style.display = index === currentTestimonial ? "block" : "none"
      })

      // Actualizar dots
      if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentTestimonial)
        })
      }
    }

    // Inicializar
    showTestimonial()

    // Cambiar testimonial cada 5 segundos
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
      showTestimonial()
    }, 5000)

    // Navegación por dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentTestimonial = index
        showTestimonial()
      })
    })
  }

  // Animación de contador para estadísticas
  const statCounters = document.querySelectorAll(".stat-counter")

  function animateCounter(counter, target) {
    let count = 0
    const duration = 2000 // 2 segundos
    const interval = 50 // 50ms entre actualizaciones
    const steps = duration / interval
    const increment = target / steps

    const timer = setInterval(() => {
      count += increment
      if (count >= target) {
        clearInterval(timer)
        counter.textContent = target.toLocaleString()
      } else {
        counter.textContent = Math.floor(count).toLocaleString()
      }
    }, interval)
  }

  // Iniciar animación cuando los elementos son visibles
  function checkVisibility() {
    statCounters.forEach((counter) => {
      const rect = counter.getBoundingClientRect()
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      if (isVisible && !counter.classList.contains("animated")) {
        counter.classList.add("animated")
        const target = Number.parseInt(counter.getAttribute("data-target"), 10)
        animateCounter(counter, target)
      }
    })
  }

  // Verificar visibilidad al cargar y al hacer scroll
  if (statCounters.length > 0) {
    window.addEventListener("scroll", checkVisibility)
    checkVisibility() // Verificar al cargar
  }

  // Botón de volver arriba
  const scrollTopBtn = document.getElementById("scrollTopBtn")

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block"
      } else {
        scrollTopBtn.style.display = "none"
      }
    })

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Inicialización de mapa (si existe)
  const mapContainer = document.getElementById("contactMap")

  if (mapContainer) {
    // Check if google maps is loaded
    if (typeof google === "undefined" || typeof google.maps === "undefined") {
      console.error("Google Maps API not loaded. Please check your API key and network connection.")
    } else {
      const mapOptions = {
        center: { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile
        zoom: 13,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9c9c9" }],
          },
        ],
      }

      const map = new google.maps.Map(mapContainer, mapOptions)

      // Marcador de oficina
      new google.maps.Marker({
        position: { lat: -33.4489, lng: -70.6693 },
        map: map,
        title: "Oficina RentRooms",
        icon: {
          url: "../../../assets/img/marker.png",
          scaledSize: new google.maps.Size(40, 40),
        },
      })
    }
  }

  // Formulario de contacto
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("contactName").value
      const email = document.getElementById("contactEmail").value
      const message = document.getElementById("contactMessage").value

      if (!name || !email || !message) {
        alert("Por favor, complete todos los campos.")
        return
      }

      // Simulación de envío
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.textContent = "Enviando..."

      setTimeout(() => {
        alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.")
        contactForm.reset()
        submitBtn.disabled = false
        submitBtn.textContent = "Enviar mensaje"
      }, 1500)
    })
  }

  // Inicialización de tooltips
  const tooltips = document.querySelectorAll("[data-tooltip]")

  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", () => {
      const text = tooltip.getAttribute("data-tooltip")
      const tooltipElement = document.createElement("div")
      tooltipElement.className = "tooltip"
      tooltipElement.textContent = text
      document.body.appendChild(tooltipElement)

      const rect = tooltip.getBoundingClientRect()
      tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`
      tooltipElement.style.left = `${rect.left + (rect.width / 2) - tooltipElement.offsetWidth / 2}px`
      tooltipElement.style.opacity = "1"

      tooltip.addEventListener("mouseleave", () => {
        tooltipElement.remove()
      })
    })
  })

  // Lazy loading de imágenes
  const lazyImages = document.querySelectorAll(".lazy-image")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy-image")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src
      img.classList.remove("lazy-image")
    })
  }
})
