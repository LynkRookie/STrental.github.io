// auth.js - Script para manejar la autenticación en el sistema de arriendo

document.addEventListener("DOMContentLoaded", () => {
  // Referencias a elementos del DOM
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");
  const useProfileButtons = document.querySelectorAll(".use-profile");
  const forgotPasswordLink = document.querySelector(".forgot-password");

  // Agregar botón para mostrar/ocultar contraseña
  if (loginPassword) {
    // Crear contenedor para el campo de contraseña
    const passwordContainer = document.createElement("div");
    passwordContainer.className = "password-container";
    
    // Reemplazar el campo de contraseña con el contenedor
    const passwordParent = loginPassword.parentNode;
    passwordParent.replaceChild(passwordContainer, loginPassword);
    passwordContainer.appendChild(loginPassword);
    
    // Crear botón para mostrar/ocultar contraseña
    const togglePasswordBtn = document.createElement("button");
    togglePasswordBtn.type = "button";
    togglePasswordBtn.className = "toggle-password";
    togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
    passwordContainer.appendChild(togglePasswordBtn);
    
    // Agregar evento para mostrar/ocultar contraseña
    togglePasswordBtn.addEventListener("click", () => {
      if (loginPassword.type === "password") {
        loginPassword.type = "text";
        togglePasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        loginPassword.type = "password";
        togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });

    // Agregar estilos para el contenedor de contraseña
    const style = document.createElement("style");
    style.textContent = `
      .password-container {
        position: relative;
        width: 100%;
      }
      .toggle-password {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
      }
      .toggle-password:hover {
        color: #333;
      }
    `;
    document.head.appendChild(style);
  }

  // Funcionalidad para los perfiles de prueba
  if (useProfileButtons.length > 0) {
    useProfileButtons.forEach(button => {
      button.addEventListener("click", () => {
        const email = button.getAttribute("data-email");
        const password = button.getAttribute("data-password");
        
        if (loginEmail && loginPassword) {
          loginEmail.value = email;
          loginPassword.value = password;
          
          // Mostrar mensaje de éxito
          showToast("Perfil cargado correctamente", "success");
        }
      });
    });
  }

  // Cambio entre pestañas de login y registro
  if (authTabs.length > 0) {
    authTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetTab = tab.getAttribute("data-tab");
        
        // Actualizar pestañas activas
        authTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        // Mostrar formulario correspondiente
        authForms.forEach(form => {
          form.classList.remove("active");
          if (form.id === `${targetTab}-form`) {
            form.classList.add("active");
          }
        });
      });
    });
  }

  // Funcionalidad de olvidar contraseña
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Crear modal para recuperar contraseña
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.id = "forgotPasswordModal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>Recuperar contraseña</h2>
          <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
          <form id="forgotPasswordForm">
            <div class="form-group">
              <label for="recoveryEmail">Correo electrónico</label>
              <input type="email" id="recoveryEmail" name="recoveryEmail" required>
            </div>
            <button type="submit" class="btn-primary btn-block">Enviar enlace</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Mostrar modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      
      // Cerrar modal
      const closeBtn = modal.querySelector(".close-modal");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      });
      
      // Cerrar modal al hacer clic fuera
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
      
      // Procesar formulario de recuperación
      const forgotPasswordForm = document.getElementById("forgotPasswordForm");
      forgotPasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const recoveryEmail = document.getElementById("recoveryEmail").value;
        
        // Simular envío de correo
        showToast(`Se ha enviado un enlace de recuperación a ${recoveryEmail}`, "success");
        
        // Cerrar modal
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    });
  }

  // Procesar formulario de login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const email = loginEmail.value;
      const password = loginPassword.value;
      
      // Validación básica
      if (!email || !password) {
        showToast("Por favor, complete todos los campos", "error");
        return;
      }
      
      // Simular login
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Iniciando sesión...";
      
      setTimeout(() => {
        // Verificar credenciales
        if (email === "admin@rentrooms.com" && password === "admin123") {
          showToast("Inicio de sesión exitoso. Redirigiendo...", "success");
          setTimeout(() => {
            window.location.href = "../Vista/Dashboard Adminnistrador/admin-panel.html";
          }, 1000);
        } else if (email === "arrendador@rentrooms.com" && password === "arriendo123") {
          showToast("Inicio de sesión exitoso. Redirigiendo...", "success");
          setTimeout(() => {
            window.location.href = "../Vista/Dashboard usuario/user-panel.html";
          }, 1000);
        } else {
          showToast("Credenciales incorrectas. Inténtelo de nuevo.", "error");
          submitBtn.disabled = false;
          submitBtn.textContent = "Iniciar Sesión";
        }
      }, 1500);
    });
  }

  // Procesar formulario de registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("registerConfirmPassword").value;
      const agreeTerms = document.getElementById("agreeTerms").checked;
      
      // Validación básica
      if (!name || !email || !password || !confirmPassword) {
        showToast("Por favor, complete todos los campos", "error");
        return;
      }
      
      if (password !== confirmPassword) {
        showToast("Las contraseñas no coinciden", "error");
        return;
      }
      
      if (!agreeTerms) {
        showToast("Debe aceptar los términos y condiciones", "error");
        return;
      }
      
      // Simular registro
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Registrando...";
      
      setTimeout(() => {
        showToast("Registro exitoso. Ahora puede iniciar sesión.", "success");
        
        // Cambiar a pestaña de login
        authTabs.forEach(tab => {
          if (tab.getAttribute("data-tab") === "login") {
            tab.click();
          }
        });
        
        // Limpiar formulario
        registerForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Registrarse";
      }, 1500);
    });
  }

  // Función para mostrar mensajes toast
  function showToast(message, type = "info") {
    // Crear contenedor de toast si no existe
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
      
      // Agregar estilos para los toasts
      const style = document.createElement("style");
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }
        .toast {
          padding: 12px 20px;
          margin-bottom: 10px;
          border-radius: 4px;
          color: white;
          font-weight: 500;
          min-width: 250px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out forwards;
        }
        .toast.success {
          background-color: #28a745;
        }
        .toast.error {
          background-color: #dc3545;
        }
        .toast.info {
          background-color: #17a2b8;
        }
        .toast.warning {
          background-color: #ffc107;
          color: #333;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Crear toast
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Eliminar toast después de 3 segundos
    setTimeout(() => {
      toast.style.animation = "fadeOut 0.3s ease-out forwards";
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 3000);
  }
});