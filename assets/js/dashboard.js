// Actualizar la ruta de los archivos en dashboard.js
// Reemplazar todas las referencias a archivos con las nuevas rutas

// Por ejemplo, si hay referencias a imágenes como:
// document.getElementById('userAvatar').src = 'img/user-avatar.jpg';
// Cambiar a:
// document.getElementById('userAvatar').src = '../../../assets/img/user-avatar.jpg';

// Si hay referencias a otros archivos JavaScript:
// import { someFunction } from './utils.js';
// Cambiar a:
// import { someFunction } from '../../../assets/js/utils.js';

// No hay cambios específicos en la lógica del código, solo en las rutas de archivos

// Dashboard JavaScript for user-panel.html

document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  const navLinks = document.querySelectorAll(".sidebar-nav a")
  const sections = document.querySelectorAll(".dashboard-section")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetSection = this.getAttribute("data-section")

      // Update active nav link
      navLinks.forEach((navLink) => {
        navLink.parentElement.classList.remove("active")
      })
      this.parentElement.classList.add("active")

      // Show target section
      sections.forEach((section) => {
        section.classList.remove("active")
        if (section.id === `${targetSection}-section`) {
          section.classList.add("active")
        }
      })
    })
  })

  // Settings navigation
  const settingsNavItems = document.querySelectorAll(".settings-nav li")
  const settingsPanels = document.querySelectorAll(".settings-panel")

  settingsNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetSettings = this.getAttribute("data-settings")

      // Update active settings nav item
      settingsNavItems.forEach((navItem) => {
        navItem.classList.remove("active")
      })
      this.classList.add("active")

      // Show target settings panel
      settingsPanels.forEach((panel) => {
        panel.classList.remove("active")
        if (panel.id === `${targetSettings}-settings`) {
          panel.classList.add("active")
        }
      })
    })
  })

  // Modal functionality
  const modals = document.querySelectorAll(".modal")
  const closeButtons = document.querySelectorAll(".close-modal, .cancel-modal")
  const addPropertyBtn = document.querySelector('.add-new[data-section="properties"]')
  const addRoomBtn = document.querySelector('.add-new[data-section="rooms"]')
  const addTenantBtn = document.querySelector('.add-new[data-section="tenants"]')

  // Open modals
  if (addPropertyBtn) {
    addPropertyBtn.addEventListener("click", () => {
      document.getElementById("addPropertyModal").style.display = "block"
      document.body.style.overflow = "hidden"
    })
  }

  if (addRoomBtn) {
    addRoomBtn.addEventListener("click", () => {
      document.getElementById("addRoomModal").style.display = "block"
      document.body.style.overflow = "hidden"
    })
  }

  if (addTenantBtn) {
    addTenantBtn.addEventListener("click", () => {
      document.getElementById("addTenantModal").style.display = "block"
      document.body.style.overflow = "hidden"
    })
  }

  // Close modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modals.forEach((modal) => {
        modal.style.display = "none"
      })
      document.body.style.overflow = "auto"
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Payment type change in tenant form
  const paymentTypeSelect = document.getElementById("paymentType")
  const dailyRateGroup = document.getElementById("dailyRateGroup")

  if (paymentTypeSelect && dailyRateGroup) {
    paymentTypeSelect.addEventListener("change", function () {
      if (this.value === "daily") {
        dailyRateGroup.style.display = "block"
      } else {
        dailyRateGroup.style.display = "none"
      }
    })
  }

  // Calculate total amount based on dates and rate
  const startDateInput = document.getElementById("startDate")
  const endDateInput = document.getElementById("endDate")
  const dailyRateInput = document.getElementById("dailyRate")
  const totalAmountInput = document.getElementById("totalAmount")

  function calculateTotal() {
    if (!startDateInput || !endDateInput || !totalAmountInput) return

    const startDate = new Date(startDateInput.value)
    const endDate = new Date(endDateInput.value)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return

    // Calculate days difference
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let totalAmount = 0

    if (paymentTypeSelect.value === "monthly") {
      // Calculate months (approximate)
      const months = diffDays / 30
      const roomSelect = document.getElementById("tenantRoom")
      const roomId = roomSelect.value

      // Base price based on room
      const basePrice = roomId ? 150000 + Number.parseInt(roomId) * 10000 : 180000
      totalAmount = Math.ceil(months * basePrice)
    } else {
      // Daily rate
      const dailyRate = Number.parseFloat(dailyRateInput.value) || 0
      totalAmount = diffDays * dailyRate
    }

    totalAmountInput.value = totalAmount
  }

  // Add event listeners for calculation
  if (startDateInput && endDateInput && paymentTypeSelect && dailyRateInput) {
    startDateInput.addEventListener("change", calculateTotal)
    endDateInput.addEventListener("change", calculateTotal)
    paymentTypeSelect.addEventListener("change", calculateTotal)
    dailyRateInput.addEventListener("input", calculateTotal)
  }

  // Form submissions
  const addPropertyForm = document.getElementById("addPropertyForm")
  const addRoomForm = document.getElementById("addRoomForm")
  const addTenantForm = document.getElementById("addTenantForm")

  // Generic form submission handler
  function handleFormSubmit(form, modalId, successMessage) {
    if (!form) return

    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = "Guardando..."

      setTimeout(() => {
        alert(successMessage)
        form.reset()
        submitButton.disabled = false
        submitButton.textContent = "Guardar"
        document.getElementById(modalId).style.display = "none"
        document.body.style.overflow = "auto"
      }, 1500)
    })
  }

  handleFormSubmit(addPropertyForm, "addPropertyModal", "¡Propiedad agregada con éxito!")

  handleFormSubmit(addRoomForm, "addRoomModal", "¡Habitación agregada con éxito!")

  handleFormSubmit(addTenantForm, "addTenantModal", "¡Arrendatario agregado con éxito!")

  // Los gráficos ahora se manejan en el archivo charts.js
  // Se han movido todas las funciones de gráficos al archivo assets/js/charts.js
})
