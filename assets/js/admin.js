// Admin Panel JavaScript for admin-panel.html

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
  const addUserBtn = document.querySelector('.add-new[data-section="users"]')

  // Open modals
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      document.getElementById("addUserModal").style.display = "block"
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

  // Custom report period selection
  const reportPeriod = document.getElementById("reportPeriod")
  const dateRange = document.querySelector(".date-range")

  if (reportPeriod && dateRange) {
    reportPeriod.addEventListener("change", function () {
      if (this.value === "custom") {
        dateRange.style.display = "flex"
      } else {
        dateRange.style.display = "none"
      }
    })
  }

  // Form submissions
  const addUserForm = document.getElementById("addUserForm")

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

  handleFormSubmit(addUserForm, "addUserModal", "¡Usuario agregado con éxito!")

  // Export CSV functionality
  const exportButtons = document.querySelectorAll('.export-btn, button:contains("Descargar CSV")')

  exportButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Descargando archivo CSV... Esta funcionalidad es simulada en esta demo.")
    })
  })

  // Los gráficos ahora se manejan en el archivo charts.js
  // Se han movido todas las funciones de gráficos al archivo assets/js/charts.js
})
