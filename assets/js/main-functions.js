// Archivo principal de funciones para el Sistema de Arriendo
// Este archivo implementa todas las funcionalidades faltantes

document.addEventListener("DOMContentLoaded", () => {
  // ===== FUNCIONALIDADES GENERALES =====
  
  // Inicializar todos los gráficos
  initializeCharts();
  
  // Inicializar carrusel en la página principal
  initializeCarousel();
  
  // Inicializar modales y botones
  initializeModals();
  
  // Inicializar formularios
  initializeForms();
  
  // Inicializar funcionalidades de login
  initializeLogin();
  
  // ===== FUNCIONES ESPECÍFICAS =====
  
  // Función para inicializar todos los gráficos
  function initializeCharts() {
    if (typeof Chart === "undefined") return;
    
    // Gráficos del panel de administrador
    initializeAdminCharts();
    
    // Gráficos del panel de usuario
    initializeUserCharts();
  }
  
  // Inicializar gráficos del panel de administrador
  function initializeAdminCharts() {
    // Gráfico de actividad del sistema
    const activityChart = document.getElementById("activityChart");
    if (activityChart) {
      const activityPeriod = document.getElementById("activityPeriod");
      
      // Función para actualizar el gráfico según el período seleccionado
      function updateActivityChart() {
        const period = activityPeriod.value;
        let data = [];
        let labels = [];
        
        if (period === "week") {
          labels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
          data = [25, 30, 35, 40, 38, 32, 28];
        } else if (period === "month") {
          labels = Array.from({length: 30}, (_, i) => i + 1);
          data = Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 20);
        } else if (period === "year") {
          labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          data = [120, 150, 180, 210, 250, 280, 310, 340, 370, 400, 430, 450];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.activityChartInstance) {
          window.activityChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.activityChartInstance = new Chart(activityChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: [{
              label: "Usuarios activos",
              data: data,
              borderColor: "rgba(74, 107, 255, 1)",
              backgroundColor: "rgba(74, 107, 255, 0.1)",
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      
      // Actualizar gráfico al cambiar el período
      if (activityPeriod) {
        activityPeriod.addEventListener("change", updateActivityChart);
      }
      
      // Inicializar gráfico
      updateActivityChart();
    }
    
    // Gráfico de estado de habitaciones
    const roomStatusChart = document.getElementById("roomStatusChart");
    if (roomStatusChart) {
      new Chart(roomStatusChart, {
        type: "doughnut",
        data: {
          labels: ["Ocupadas", "Disponibles"],
          datasets: [{
            data: [75, 25],
            backgroundColor: ["rgba(255, 107, 107, 0.7)", "rgba(40, 167, 69, 0.7)"],
            borderColor: ["rgba(255, 107, 107, 1)", "rgba(40, 167, 69, 1)"],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${value}%`;
                }
              }
            }
          }
        }
      });
    }
    
    // Gráfico de propiedades por usuario
    const propertiesPerUserChart = document.getElementById("propertiesPerUserChart");
    if (propertiesPerUserChart) {
      new Chart(propertiesPerUserChart, {
        type: "bar",
        data: {
          labels: ["Juan Pérez", "María González", "Carlos Rodríguez", "Ana López", "Roberto Méndez"],
          datasets: [{
            label: "Número de propiedades",
            data: [3, 2, 5, 1, 4],
            backgroundColor: "rgba(74, 107, 255, 0.7)",
            borderColor: "rgba(74, 107, 255, 1)",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
    
    // Gráfico de ingresos mensuales
    const monthlyIncomeChart = document.getElementById("monthlyIncomeChart");
    if (monthlyIncomeChart) {
      const incomeYear = document.getElementById("incomeYear");
      
      // Función para actualizar el gráfico según el año seleccionado
      function updateMonthlyIncomeChart() {
        const year = incomeYear.value;
        let data = [];
        
        if (year === "2025") {
          data = [9500000, 10000000, 10500000, 11000000, 12500000, 13000000, 13500000, 14000000, 14500000, 15000000, 15500000, 16000000];
        } else if (year === "2024") {
          data = [8000000, 8500000, 9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 12000000, 12500000, 13000000, 13500000];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.monthlyIncomeChartInstance) {
          window.monthlyIncomeChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.monthlyIncomeChartInstance = new Chart(monthlyIncomeChart, {
          type: "bar",
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
              label: "Ingresos mensuales (CLP)",
              data: data,
              backgroundColor: "rgba(40, 167, 69, 0.7)",
              borderColor: "rgba(40, 167, 69, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + (value / 1000000).toFixed(1) + "M"
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => "$" + context.raw.toLocaleString()
                }
              }
            }
          }
        });
      }
      
      // Actualizar gráfico al cambiar el año
      if (incomeYear) {
        incomeYear.addEventListener("change", updateMonthlyIncomeChart);
      }
      
      // Inicializar gráfico
      updateMonthlyIncomeChart();
    }
    
    // Gráficos de finanzas
    const userIncomeChart = document.getElementById("userIncomeChart");
    if (userIncomeChart) {
      new Chart(userIncomeChart, {
        type: "bar",
        data: {
          labels: ["Juan Pérez", "María González", "Carlos Rodríguez", "Ana López", "Roberto Méndez"],
          datasets: [{
            label: "Ingresos por usuario (CLP)",
            data: [3500000, 2200000, 4100000, 1200000, 1500000],
            backgroundColor: "rgba(74, 107, 255, 0.7)",
            borderColor: "rgba(74, 107, 255, 1)",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + (value / 1000000).toFixed(1) + "M"
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString()
              }
            }
          }
        }
      });
    }
    
    const locationIncomeChart = document.getElementById("locationIncomeChart");
    if (locationIncomeChart) {
      new Chart(locationIncomeChart, {
        type: "pie",
        data: {
          labels: ["Santiago Centro", "Providencia", "Las Condes", "Ñuñoa", "Otras ubicaciones"],
          datasets: [{
            data: [4500000, 3200000, 2800000, 1500000, 500000],
            backgroundColor: [
              "rgba(74, 107, 255, 0.7)",
              "rgba(255, 107, 107, 0.7)",
              "rgba(40, 167, 69, 0.7)",
              "rgba(255, 193, 7, 0.7)",
              "rgba(108, 117, 125, 0.7)"
            ],
            borderColor: [
              "rgba(74, 107, 255, 1)",
              "rgba(255, 107, 107, 1)",
              "rgba(40, 167, 69, 1)",
              "rgba(255, 193, 7, 1)",
              "rgba(108, 117, 125, 1)"
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
    
    // Gráficos de estadísticas
    initializeStatisticsCharts();
  }
  
  // Inicializar gráficos de estadísticas
  function initializeStatisticsCharts() {
    const statsPeriod = document.getElementById("statsPeriod");
    
    // Función para actualizar todos los gráficos de estadísticas
    function updateStatisticsCharts() {
      const period = statsPeriod ? statsPeriod.value : "month";
      
      // Gráfico de crecimiento de usuarios
      const userGrowthChart = document.getElementById("userGrowthChart");
      if (userGrowthChart) {
        let data = [];
        let labels = [];
        
        if (period === "month") {
          labels = Array.from({length: 30}, (_, i) => i + 1);
          data = Array.from({length: 30}, (_, i) => 5 + i * 0.5);
        } else if (period === "quarter") {
          labels = ["Ene", "Feb", "Mar"];
          data = [10, 15, 20];
        } else if (period === "year") {
          labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          data = [5, 7, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30];
        } else {
          labels = ["2020", "2021", "2022", "2023", "2024", "2025"];
          data = [5, 10, 15, 20, 25, 30];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.userGrowthChartInstance) {
          window.userGrowthChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.userGrowthChartInstance = new Chart(userGrowthChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: [{
              label: "Usuarios",
              data: data,
              borderColor: "rgba(74, 107, 255, 1)",
              backgroundColor: "rgba(74, 107, 255, 0.1)",
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      
      // Gráfico de propiedades por ubicación
      const propertiesLocationChart = document.getElementById("propertiesLocationChart");
      if (propertiesLocationChart) {
        // Destruir gráfico existente si hay uno
        if (window.propertiesLocationChartInstance) {
          window.propertiesLocationChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.propertiesLocationChartInstance = new Chart(propertiesLocationChart, {
          type: "pie",
          data: {
            labels: ["Santiago Centro", "Providencia", "Las Condes", "Ñuñoa", "Otras ubicaciones"],
            datasets: [{
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                "rgba(74, 107, 255, 0.7)",
                "rgba(255, 107, 107, 0.7)",
                "rgba(40, 167, 69, 0.7)",
                "rgba(255, 193, 7, 0.7)",
                "rgba(108, 117, 125, 0.7)"
              ],
              borderColor: [
                "rgba(74, 107, 255, 1)",
                "rgba(255, 107, 107, 1)",
                "rgba(40, 167, 69, 1)",
                "rgba(255, 193, 7, 1)",
                "rgba(108, 117, 125, 1)"
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || "";
                    const value = context.raw || 0;
                    return `${label}: ${value}%`;
                  }
                }
              }
            }
          }
        });
      }
      
      // Gráfico de ocupación de habitaciones
      const roomOccupancyChart = document.getElementById("roomOccupancyChart");
      if (roomOccupancyChart) {
        let data = [];
        let labels = [];
        
        if (period === "month") {
          labels = Array.from({length: 30}, (_, i) => i + 1);
          data = Array.from({length: 30}, () => Math.floor(Math.random() * 10) + 70);
        } else if (period === "quarter") {
          labels = ["Ene", "Feb", "Mar"];
          data = [72, 75, 78];
        } else if (period === "year") {
          labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          data = [65, 68, 70, 72, 75, 78, 80, 82, 80, 78, 76, 75];
        } else {
          labels = ["2020", "2021", "2022", "2023", "2024", "2025"];
          data = [50, 55, 60, 65, 70, 75];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.roomOccupancyChartInstance) {
          window.roomOccupancyChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.roomOccupancyChartInstance = new Chart(roomOccupancyChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: [{
              label: "Tasa de ocupación (%)",
              data: data,
              borderColor: "rgba(40, 167, 69, 1)",
              backgroundColor: "rgba(40, 167, 69, 0.1)",
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value) => value + "%"
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => context.dataset.label + ": " + context.raw + "%"
                }
              }
            }
          }
        });
      }
      
      // Gráfico de ingresos vs proyección
      const incomeProjectionChart = document.getElementById("incomeProjectionChart");
      if (incomeProjectionChart) {
        let realData = [];
        let projectionData = [];
        let labels = [];
        
        if (period === "month") {
          labels = Array.from({length: 30}, (_, i) => i + 1);
          realData = Array.from({length: 30}, (_, i) => 400000 + i * 10000);
          projectionData = Array.from({length: 30}, (_, i) => 380000 + i * 9000);
        } else if (period === "quarter") {
          labels = ["Ene", "Feb", "Mar"];
          realData = [9500000, 10000000, 10500000];
          projectionData = [9000000, 9500000, 10000000];
        } else if (period === "year") {
          labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          realData = [9500000, 10000000, 10500000, 11000000, 12500000, 13000000, 13500000, 14000000, 14500000, 15000000, 15500000, 16000000];
          projectionData = [9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 12000000, 12500000, 13000000, 13500000, 14000000, 14500000];
        } else {
          labels = ["2020", "2021", "2022", "2023", "2024", "2025"];
          realData = [5000000, 7000000, 9000000, 11000000, 13000000, 16000000];
          projectionData = [4500000, 6500000, 8500000, 10500000, 12500000, 15000000];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.incomeProjectionChartInstance) {
          window.incomeProjectionChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.incomeProjectionChartInstance = new Chart(incomeProjectionChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Ingresos reales",
                data: realData,
                borderColor: "rgba(74, 107, 255, 1)",
                backgroundColor: "rgba(74, 107, 255, 0.1)",
                tension: 0.3,
                fill: true
              },
              {
                label: "Proyección",
                data: projectionData,
                borderColor: "rgba(108, 117, 125, 1)",
                borderDash: [5, 5],
                backgroundColor: "rgba(108, 117, 125, 0)",
                tension: 0.3,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + (value / 1000000).toFixed(1) + "M"
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => context.dataset.label + ": $" + context.raw.toLocaleString()
                }
              }
            }
          }
        });
      }
    }
    
    // Actualizar gráficos al cambiar el período
    if (statsPeriod) {
      statsPeriod.addEventListener("change", updateStatisticsCharts);
    }
    
    // Inicializar gráficos
    updateStatisticsCharts();
  }
  
  // Inicializar gráficos del panel de usuario
  function initializeUserCharts() {
    // Gráfico de ingresos mensuales
    const incomeChart = document.getElementById("incomeChart");
    if (incomeChart) {
      const incomeChartYear = document.getElementById("incomeChartYear");
      
      // Función para actualizar el gráfico según el año seleccionado
      function updateIncomeChart() {
        const year = incomeChartYear.value;
        let data = [];
        
        if (year === "2025") {
          data = [950000, 1050000, 1100000, 1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000, 1600000];
        } else if (year === "2024") {
          data = [800000, 850000, 900000, 950000, 1000000, 1050000, 1100000, 1150000, 1200000, 1250000, 1300000, 1350000];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.incomeChartInstance) {
          window.incomeChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.incomeChartInstance = new Chart(incomeChart, {
          type: "bar",
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [{
              label: "Ingresos mensuales (CLP)",
              data: data,
              backgroundColor: "rgba(74, 107, 255, 0.7)",
              borderColor: "rgba(74, 107, 255, 1)",
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value.toLocaleString()
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => "$" + context.raw.toLocaleString()
                }
              }
            }
          }
        });
      }
      
      // Actualizar gráfico al cambiar el año
      if (incomeChartYear) {
        incomeChartYear.addEventListener("change", updateIncomeChart);
      }
      
      // Inicializar gráfico
      updateIncomeChart();
    }
    
    // Gráfico de distribución de ingresos
    const distributionChart = document.getElementById("distributionChart");
    if (distributionChart) {
      const distributionChartProperty = document.getElementById("distributionChartProperty");
      
      // Función para actualizar el gráfico según la propiedad seleccionada
      function updateDistributionChart() {
        const property = distributionChartProperty.value;
        let data = [];
        let labels = [];
        
        if (property === "all") {
          labels = ["Casa en Santiago Centro", "Departamento en Providencia", "Casa en Las Condes"];
          data = [750000, 500000, 650000];
        } else if (property === "1") {
          labels = ["Habitación 1", "Habitación 2", "Habitación 3", "Habitación 4", "Habitación 5"];
          data = [180000, 200000, 190000, 150000, 160000];
        } else if (property === "2") {
          labels = ["Habitación 1", "Habitación 2", "Habitación 3"];
          data = [170000, 180000, 150000];
        } else if (property === "3") {
          labels = ["Habitación 1", "Habitación 2", "Habitación 3", "Habitación 4"];
          data = [160000, 170000, 180000, 140000];
        }
        
        // Destruir gráfico existente si hay uno
        if (window.distributionChartInstance) {
          window.distributionChartInstance.destroy();
        }
        
        // Crear nuevo gráfico
        window.distributionChartInstance = new Chart(distributionChart, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                "rgba(74, 107, 255, 0.7)",
                "rgba(255, 107, 107, 0.7)",
                "rgba(40, 167, 69, 0.7)",
                "rgba(255, 193, 7, 0.7)",
                "rgba(108, 117, 125, 0.7)"
              ],
              borderColor: [
                "rgba(74, 107, 255, 1)",
                "rgba(255, 107, 107, 1)",
                "rgba(40, 167, 69, 1)",
                "rgba(255, 193, 7, 1)",
                "rgba(108, 117, 125, 1)"
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || "";
                    const value = context.raw || 0;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            }
          }
        });
      }
      
      // Actualizar gráfico al cambiar la propiedad
      if (distributionChartProperty) {
        distributionChartProperty.addEventListener("change", updateDistributionChart);
      }
      
      // Inicializar gráfico
      updateDistributionChart();
    }
    
    // Gráficos de finanzas
    const propertyIncomeChart = document.getElementById("propertyIncomeChart");
    if (propertyIncomeChart) {
      new Chart(propertyIncomeChart, {
        type: "bar",
        data: {
          labels: ["Casa en Santiago Centro", "Departamento en Providencia", "Casa en Las Condes"],
          datasets: [{
            label: "Ingresos por propiedad (CLP)",
            data: [750000, 500000, 650000],
            backgroundColor: ["rgba(74, 107, 255, 0.7)", "rgba(255, 107, 107, 0.7)", "rgba(40, 167, 69, 0.7)"],
            borderColor: ["rgba(74, 107, 255, 1)", "rgba(255, 107, 107, 1)", "rgba(40, 167, 69, 1)"],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + value.toLocaleString()
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString()
              }
            }
          }
        }
      });
    }
    
    const dailyIncomeChart = document.getElementById("dailyIncomeChart");
    if (dailyIncomeChart) {
      // Generar días del mes
      const days = Array.from({length: 31}, (_, i) => i + 1);
      
      // Generar datos aleatorios para ingresos diarios
      const dailyData = days.map(() => Math.floor(Math.random() * 50000) + 10000);
      
      new Chart(dailyIncomeChart, {
        type: "line",
        data: {
          labels: days,
          datasets: [{
            label: "Ingresos diarios (CLP)",
            data: dailyData,
            backgroundColor: "rgba(74, 107, 255, 0.2)",
            borderColor: "rgba(74, 107, 255, 1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + value.toLocaleString()
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString()
              }
            }
          }
        }
      });
    }
  }
  
  // Inicializar carrusel en la página principal
  function initializeCarousel() {
    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    if (carousel && carouselItems.length > 0 && prevBtn && nextBtn) {
      let currentIndex = 0;
      
      // Función para mostrar el elemento actual
      function showCurrentItem() {
        carouselItems.forEach((item, index) => {
          item.classList.remove("active");
          if (index === currentIndex) {
            item.classList.add("active");
          }
        });
      }
      
      // Evento para el botón anterior
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showCurrentItem();
      });
      
      // Evento para el botón siguiente
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showCurrentItem();
      });
      
      // Inicializar carrusel
      showCurrentItem();
      
      // Rotación automática cada 5 segundos
      setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showCurrentItem();
      }, 5000);
    }
  }
  
  // Inicializar modales y botones
  function initializeModals() {
    // Botones para ver habitaciones
    const viewRoomsButtons = document.querySelectorAll(".view-rooms");
    const roomsModal = document.getElementById("roomsModal");
    
    if (viewRoomsButtons.length > 0 && roomsModal) {
      viewRoomsButtons.forEach(button => {
        button.addEventListener("click", () => {
          roomsModal.style.display = "block";
          document.body.style.overflow = "hidden";
        });
      });
    }
    
    // Botones para contactar
    const contactButtons = document.querySelectorAll(".contact-owner");
    const contactModal = document.getElementById("contactModal");
    
    if (contactButtons.length > 0 && contactModal) {
      contactButtons.forEach(button => {
        button.addEventListener("click", () => {
          contactModal.style.display = "block";
          document.body.style.overflow = "hidden";
        });
      });
    }
    
    // Botones para cerrar modales
    const closeButtons = document.querySelectorAll(".close-modal, .cancel-modal");
    const modals = document.querySelectorAll(".modal");
    
    if (closeButtons.length > 0 && modals.length > 0) {
      closeButtons.forEach(button => {
        button.addEventListener("click", () => {
          modals.forEach(modal => {
            modal.style.display = "none";
          });
          document.body.style.overflow = "auto";
        });
      });
      
      // Cerrar modal al hacer clic fuera
      window.addEventListener("click", (event) => {
        modals.forEach(modal => {
          if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      });
    }
    
    // Botones para ver detalles de habitación en el plano
    const roomButtons = document.querySelectorAll(".room-btn");
    const roomDetails = document.getElementById("roomDetails");
    
    if (roomButtons.length > 0 && roomDetails) {
      roomButtons.forEach(button => {
        button.addEventListener("click", () => {
          const roomNumber = button.getAttribute("data-room");
          const isAvailable = button.classList.contains("available");
          
          let roomInfo = "";
          
          if (isAvailable) {
            roomInfo = `
              <h3>Habitación ${roomNumber}</h3>
              <p><strong>Estado:</strong> Disponible</p>
              <p><strong>Tamaño:</strong> ${10 + parseInt(roomNumber) * 2} m²</p>
              <p><strong>Precio:</strong> $${150000 + parseInt(roomNumber) * 10000} / mes</p>
              <p><strong>Características:</strong> Baño ${roomNumber % 2 === 0 ? 'privado' : 'compartido'}, Wi-Fi, Closet</p>
              <button class="btn-primary">Reservar ahora</button>
            `;
          } else {
            roomInfo = `
              <h3>Habitación ${roomNumber}</h3>
              <p><strong>Estado:</strong> Ocupada</p>
              <p><strong>Tamaño:</strong> ${10 + parseInt(roomNumber) * 2} m²</p>
              <p><strong>Precio:</strong> $${150000 + parseInt(roomNumber) * 10000} / mes</p>
              <p><strong>Arrendatario:</strong> ${roomNumber === "2" ? "Carlos Gómez" : "Ana Martínez"}</p>
              <p><strong>Contrato hasta:</strong> ${roomNumber === "2" ? "15/12/2025" : "30/09/2025"}</p>
            `;
          }
          
          roomDetails.innerHTML = roomInfo;
        });
      });
    }
    
    // Botones para ver todos
    const viewAllButtons = document.querySelectorAll(".view-all");
    
    if (viewAllButtons.length > 0) {
      viewAllButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          alert("Esta funcionalidad mostraría una vista completa de todos los elementos.");
        });
      });
    }
    
    // Botones para editar, eliminar, etc.
    const actionButtons = document.querySelectorAll(".property-actions button, .room-actions button, .table-actions button");
    
    if (actionButtons.length > 0) {
      actionButtons.forEach(button => {
        button.addEventListener("click", () => {
          const action = button.textContent.trim();
          alert(`Acción "${action}" iniciada. Esta funcionalidad está en desarrollo.`);
        });
      });
    }
    
    // Botones para agregar
    const addButtons = document.querySelectorAll(".add-new");
    
    if (addButtons.length > 0) {
      addButtons.forEach(button => {
        button.addEventListener("click", () => {
          const buttonText = button.textContent.trim();
          const modalId = buttonText.includes("propiedad") ? "addPropertyModal" : 
                          buttonText.includes("habitación") ? "addRoomModal" : 
                          buttonText.includes("arrendatario") ? "addTenantModal" : 
                          buttonText.includes("usuario") ? "addUserModal" : null;
          
          if (modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
              modal.style.display = "block";
              document.body.style.overflow = "hidden";
            }
          }
        });
      });
    }
    
    // Botones para generar reportes
    const reportButtons = document.querySelectorAll("button:contains('Ver reporte'), button:contains('Descargar CSV')");
    
    if (reportButtons.length > 0) {
      reportButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          alert("Generando reporte... Esta funcionalidad está en desarrollo.");
        });
      });
    }
    
    // Formulario de reporte personalizado
    const reportForm = document.querySelector("form:contains('Generar reporte')");
    
    if (reportForm) {
      reportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Generando reporte personalizado... Esta funcionalidad está en desarrollo.");
      });
      
      // Mostrar/ocultar selector de fechas personalizadas
      const reportPeriod = document.getElementById("reportPeriod");
      const dateRange = document.querySelector(".date-range");
      
      if (reportPeriod && dateRange) {
        reportPeriod.addEventListener("change", () => {
          if (reportPeriod.value === "custom") {
            dateRange.style.display = "flex";
          } else {
            dateRange.style.display = "none";
          }
        });
      }
    }
    
    // Configuración de pestañas de configuración
    const settingsNavItems = document.querySelectorAll(".settings-nav li");
    const settingsPanels = document.querySelectorAll(".settings-panel");
    
    if (settingsNavItems.length > 0 && settingsPanels.length > 0) {
      settingsNavItems.forEach(item => {
        item.addEventListener("click", () => {
          const targetSettings = item.getAttribute("data-settings");
          
          // Actualizar elemento activo en la navegación
          settingsNavItems.forEach(navItem => {
            navItem.classList.remove("active");
          });
          item.classList.add("active");
          
          // Mostrar panel de configuración correspondiente
          settingsPanels.forEach(panel => {
            panel.classList.remove("active");
            if (panel.id === `${targetSettings}-settings`) {
              panel.classList.add("active");
            }
          });
        });
      });
    }
    
    // Formularios de configuración
    const settingsForms = document.querySelectorAll(".settings-form");
    
    if (settingsForms.length > 0) {
      settingsForms.forEach(form => {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          alert("Configuración guardada con éxito.");
        });
      });
    }
    
    // Notificaciones y menú de usuario
    const notificationBell = document.querySelector(".notification-bell");
    const notificationsDropdown = document.getElementById("notificationsDropdown");
    const headerUser = document.querySelector(".header-user");
    const userDropdown = document.getElementById("userDropdown");
    
    if (notificationBell && notificationsDropdown) {
      notificationBell.addEventListener("click", (e) => {
        e.stopPropagation();
        notificationsDropdown.style.display = notificationsDropdown.style.display === "block" ? "none" : "block";
        if (userDropdown) userDropdown.style.display = "none";
      });
    }
    
    if (headerUser && userDropdown) {
      headerUser.addEventListener("click", (e) => {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
        if (notificationsDropdown) notificationsDropdown.style.display = "none";
      });
    }
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener("click", () => {
      if (notificationsDropdown) notificationsDropdown.style.display = "none";
      if (userDropdown) userDropdown.style.display = "none";
    });
  }
  
  // Inicializar formularios
  function initializeForms() {
    // Formulario de contacto
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
        contactForm.reset();
      });
    }
    
    // Formularios de agregar (propiedad, habitación, arrendatario, usuario)
    const addForms = document.querySelectorAll("#addPropertyForm, #addRoomForm, #addTenantForm, #addUserForm");
    
    if (addForms.length > 0) {
      addForms.forEach(form => {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          
          const formId = form.id;
          let successMessage = "";
          
          if (formId === "addPropertyForm") {
            successMessage = "Propiedad agregada con éxito.";
          } else if (formId === "addRoomForm") {
            successMessage = "Habitación agregada con éxito.";
          } else if (formId === "addTenantForm") {
            successMessage = "Arrendatario agregado con éxito.";
          } else if (formId === "addUserForm") {
            successMessage = "Usuario agregado con éxito.";
          }
          
          alert(successMessage);
          form.reset();
          
          // Cerrar modal
          const modal = form.closest(".modal");
          if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      });
    }
    
    // Filtros
    const filterSelects = document.querySelectorAll("#propertyFilter, #statusFilter, #userRoleFilter, #userStatusFilter, #propertyOwnerFilter, #propertyLocationFilter");
    
    if (filterSelects.length > 0) {
      filterSelects.forEach(select => {
        select.addEventListener("change", () => {
          alert("Filtro aplicado. Esta funcionalidad está en desarrollo.");
        });
      });
    }
    
    // Botones de filtro
    const filterButtons = document.querySelectorAll("button:contains('Filtrar')");
    
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener("click", () => {
          alert("Filtros aplicados. Esta funcionalidad está en desarrollo.");
        });
      });
    }
    
    // Selector de período financiero
    const financeMonth = document.getElementById("financeMonth");
    
    if (financeMonth) {
      financeMonth.addEventListener("change", () => {
        alert("Cambiando período financiero. Esta funcionalidad está en desarrollo.");
      });
    }
    
    // Cálculo de monto total en formulario de arrendatario
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const paymentType = document.getElementById("paymentType");
    const dailyRate = document.getElementById("dailyRate");
    const totalAmount = document.getElementById("totalAmount");
    const dailyRateGroup = document.getElementById("dailyRateGroup");
    
    if (paymentType && dailyRateGroup) {
      paymentType.addEventListener("change", () => {
        if (paymentType.value === "daily") {
          dailyRateGroup.style.display = "block";
        } else {
          dailyRateGroup.style.display = "none";
        }
        
        // Calcular monto total si es posible
        calculateTotal();
      });
    }
    
    function calculateTotal() {
      if (!startDate || !endDate || !totalAmount) return;
      
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
      
      // Calcular diferencia en días
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let total = 0;
      
      if (paymentType.value === "monthly") {
        // Calcular meses (aproximado)
        const months = diffDays / 30;
        const roomSelect = document.getElementById("tenantRoom");
        const roomId = roomSelect ? roomSelect.value : "";
        
        // Precio base según habitación
        const basePrice = roomId ? 150000 + parseInt(roomId) * 10000 : 180000;
        total = Math.ceil(months * basePrice);
      } else {
        // Tarifa diaria
        const rate = parseFloat(dailyRate.value) || 0;
        total = diffDays * rate;
      }
      
      totalAmount.value = total;
    }
    
    if (startDate && endDate) {
      startDate.addEventListener("change", calculateTotal);
      endDate.addEventListener("change", calculateTotal);
    }
    
    if (dailyRate) {
      dailyRate.addEventListener("input", calculateTotal);
    }
  }
  
  // Inicializar funcionalidades de login
  function initializeLogin() {
    // Cambiar entre pestañas de login y registro
    const authTabs = document.querySelectorAll(".auth-tab");
    const authForms = document.querySelectorAll(".auth-form");
    
    if (authTabs.length > 0 && authForms.length > 0) {
      authTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          const targetTab = tab.getAttribute("data-tab");
          
          // Actualizar pestaña activa
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
    
    // Botones para usar perfiles de prueba
    const useProfileButtons = document.querySelectorAll(".use-profile");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    
    if (useProfileButtons.length > 0 && loginEmail && loginPassword) {
      useProfileButtons.forEach(button => {
        button.addEventListener("click", () => {
          const email = button.getAttribute("data-email");
          const password = button.getAttribute("data-password");
          
          loginEmail.value = email;
          loginPassword.value = password;
          
          // Asegurarse de que el formulario de login esté visible
          authTabs.forEach(tab => {
            if (tab.getAttribute("data-tab") === "login") {
              tab.click();
            }
          });
        });
      });
    }
    
    // Agregar botón de mostrar/ocultar contraseña
    const passwordFields = document.querySelectorAll("input[type='password']");
    
    if (passwordFields.length > 0) {
      passwordFields.forEach(field => {
        // Crear contenedor para el campo y el botón
        const container = document.createElement("div");
        container.className = "password-container";
        container.style.position = "relative";
        
        // Reemplazar el campo con el contenedor
        field.parentNode.insertBefore(container, field);
        container.appendChild(field);
        
        // Crear botón de mostrar/ocultar
        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.className = "password-toggle";
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
        toggleButton.style.position = "absolute";
        toggleButton.style.right = "10px";
        toggleButton.style.top = "50%";
        toggleButton.style.transform = "translateY(-50%)";
        toggleButton.style.border = "none";
        toggleButton.style.background = "none";
        toggleButton.style.cursor = "pointer";
        toggleButton.style.color = "#6c757d";
        
        container.appendChild(toggleButton);
        
        // Evento para mostrar/ocultar contraseña
        toggleButton.addEventListener("click", () => {
          if (field.type === "password") {
            field.type = "text";
            toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
          } else {
            field.type = "password";
            toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
          }
        });
      });
    }
    
    // Formulario de login
    const loginForm = document.getElementById("loginForm");
    
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = loginEmail.value;
        const password = loginPassword.value;
        
        if (!email || !password) {
          alert("Por favor, complete todos los campos.");
          return;
        }
        
        // Redireccionar según el tipo de usuario
        if (email === "admin@rentrooms.com") {
          window.location.href = "../../../assets/Vista/Dashboard Admin/admin-panel.html";
        } else {
          window.location.href = "../../../assets/Vista/Dashboard Usuario/user-panel.html";
        }
      });
    }
    
    // Formulario de registro
    const registerForm = document.getElementById("registerForm");
    
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;
        
        if (!name || !email || !password || !confirmPassword) {
          alert("Por favor, complete todos los campos.");
          return;
        }
        
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden.");
          return;
        }
        
        alert("Registro exitoso. Ahora puede iniciar sesión.");
        
        // Cambiar a la pestaña de login
        authTabs.forEach(tab => {
          if (tab.getAttribute("data-tab") === "login") {
            tab.click();
          }
        });
        
        registerForm.reset();
      });
    }
    
    // Enlace de olvidé mi contraseña
    const forgotPasswordLink = document.querySelector(".forgot-password");
    
    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        
        const email = prompt("Ingrese su correo electrónico para recuperar su contraseña:");
        
        if (email) {
          alert(`Se ha enviado un enlace de recuperación a ${email}. Por favor, revise su bandeja de entrada.`);
        }
      });
    }
  }
});