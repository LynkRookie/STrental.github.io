import { Chart } from "@/components/ui/chart"
// Charts JavaScript para gráficos en user-panel.html y admin-panel.html

document.addEventListener("DOMContentLoaded", () => {
  // Charts
  if (typeof Chart !== "undefined") {
    // Monthly Income Chart
    const incomeChartCtx = document.getElementById("incomeChart")
    if (incomeChartCtx) {
      new Chart(incomeChartCtx, {
        type: "bar",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          datasets: [
            {
              label: "Ingresos mensuales (CLP)",
              data: [
                950000, 1050000, 1100000, 1200000, 1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000,
                1600000,
              ],
              backgroundColor: "rgba(74, 107, 255, 0.7)",
              borderColor: "rgba(74, 107, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + value.toLocaleString(),
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString(),
              },
            },
          },
        },
      })
    }

    // Income Distribution Chart
    const distributionChartCtx = document.getElementById("distributionChart")
    if (distributionChartCtx) {
      new Chart(distributionChartCtx, {
        type: "pie",
        data: {
          labels: ["Casa en Santiago Centro", "Departamento en Providencia", "Casa en Las Condes"],
          datasets: [
            {
              data: [750000, 500000, 650000],
              backgroundColor: ["rgba(74, 107, 255, 0.7)", "rgba(255, 107, 107, 0.7)", "rgba(40, 167, 69, 0.7)"],
              borderColor: ["rgba(74, 107, 255, 1)", "rgba(255, 107, 107, 1)", "rgba(40, 167, 69, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw || 0
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`
                },
              },
            },
          },
        },
      })
    }

    // Property Income Chart
    const propertyIncomeChartCtx = document.getElementById("propertyIncomeChart")
    if (propertyIncomeChartCtx) {
      new Chart(propertyIncomeChartCtx, {
        type: "bar",
        data: {
          labels: ["Casa en Santiago Centro", "Departamento en Providencia", "Casa en Las Condes"],
          datasets: [
            {
              label: "Ingresos por propiedad (CLP)",
              data: [750000, 500000, 650000],
              backgroundColor: ["rgba(74, 107, 255, 0.7)", "rgba(255, 107, 107, 0.7)", "rgba(40, 167, 69, 0.7)"],
              borderColor: ["rgba(74, 107, 255, 1)", "rgba(255, 107, 107, 1)", "rgba(40, 167, 69, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + value.toLocaleString(),
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString(),
              },
            },
          },
        },
      })
    }

    // Daily Income Chart
    const dailyIncomeChartCtx = document.getElementById("dailyIncomeChart")
    if (dailyIncomeChartCtx) {
      // Generate days of the month
      const days = Array.from({ length: 31 }, (_, i) => i + 1)

      // Generate random data for daily income
      const dailyData = days.map(() => Math.floor(Math.random() * 50000) + 10000)

      new Chart(dailyIncomeChartCtx, {
        type: "line",
        data: {
          labels: days,
          datasets: [
            {
              label: "Ingresos diarios (CLP)",
              data: dailyData,
              backgroundColor: "rgba(74, 107, 255, 0.2)",
              borderColor: "rgba(74, 107, 255, 1)",
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + value.toLocaleString(),
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString(),
              },
            },
          },
        },
      })
    }

    // System Activity Chart
    const activityChartCtx = document.getElementById("activityChart")
    if (activityChartCtx) {
      new Chart(activityChartCtx, {
        type: "line",
        data: {
          labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
          datasets: [
            {
              label: "Usuarios activos",
              data: [25, 30, 35, 40, 38, 32, 28],
              borderColor: "rgba(74, 107, 255, 1)",
              backgroundColor: "rgba(74, 107, 255, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Nuevas propiedades",
              data: [5, 7, 4, 6, 8, 3, 2],
              borderColor: "rgba(255, 107, 107, 1)",
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Transacciones",
              data: [15, 18, 20, 22, 25, 19, 17],
              borderColor: "rgba(40, 167, 69, 1)",
              backgroundColor: "rgba(40, 167, 69, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }

    // Room Status Chart
    const roomStatusChartCtx = document.getElementById("roomStatusChart")
    if (roomStatusChartCtx) {
      new Chart(roomStatusChartCtx, {
        type: "doughnut",
        data: {
          labels: ["Ocupadas", "Disponibles"],
          datasets: [
            {
              data: [75, 25],
              backgroundColor: ["rgba(255, 107, 107, 0.7)", "rgba(40, 167, 69, 0.7)"],
              borderColor: ["rgba(255, 107, 107, 1)", "rgba(40, 167, 69, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw || 0
                  return `${label}: ${value}%`
                },
              },
            },
          },
        },
      })
    }

    // Properties Per User Chart
    const propertiesPerUserChartCtx = document.getElementById("propertiesPerUserChart")
    if (propertiesPerUserChartCtx) {
      new Chart(propertiesPerUserChartCtx, {
        type: "bar",
        data: {
          labels: ["Juan Pérez", "María González", "Carlos Rodríguez", "Ana López", "Roberto Méndez"],
          datasets: [
            {
              label: "Número de propiedades",
              data: [3, 2, 5, 1, 4],
              backgroundColor: "rgba(74, 107, 255, 0.7)",
              borderColor: "rgba(74, 107, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      })
    }

    // Monthly Income Chart
    const monthlyIncomeChartCtx = document.getElementById("monthlyIncomeChart")
    if (monthlyIncomeChartCtx) {
      new Chart(monthlyIncomeChartCtx, {
        type: "bar",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          datasets: [
            {
              label: "Ingresos mensuales (CLP)",
              data: [
                9500000, 10000000, 10500000, 11000000, 12500000, 13000000, 13500000, 14000000, 14500000, 15000000,
                15500000, 16000000,
              ],
              backgroundColor: "rgba(40, 167, 69, 0.7)",
              borderColor: "rgba(40, 167, 69, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + (value / 1000000).toFixed(1) + "M",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString(),
              },
            },
          },
        },
      })
    }

    // User Income Chart
    const userIncomeChartCtx = document.getElementById("userIncomeChart")
    if (userIncomeChartCtx) {
      new Chart(userIncomeChartCtx, {
        type: "bar",
        data: {
          labels: ["Juan Pérez", "María González", "Carlos Rodríguez", "Ana López", "Roberto Méndez"],
          datasets: [
            {
              label: "Ingresos por usuario (CLP)",
              data: [3500000, 2200000, 4100000, 1200000, 1500000],
              backgroundColor: "rgba(74, 107, 255, 0.7)",
              borderColor: "rgba(74, 107, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + (value / 1000000).toFixed(1) + "M",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => "$" + context.raw.toLocaleString(),
              },
            },
          },
        },
      })
    }

    // Location Income Chart
    const locationIncomeChartCtx = document.getElementById("locationIncomeChart")
    if (locationIncomeChartCtx) {
      new Chart(locationIncomeChartCtx, {
        type: "pie",
        data: {
          labels: ["Santiago Centro", "Providencia", "Las Condes", "Ñuñoa", "Otras ubicaciones"],
          datasets: [
            {
              data: [4500000, 3200000, 2800000, 1500000, 500000],
              backgroundColor: [
                "rgba(74, 107, 255, 0.7)",
                "rgba(255, 107, 107, 0.7)",
                "rgba(40, 167, 69, 0.7)",
                "rgba(255, 193, 7, 0.7)",
                "rgba(108, 117, 125, 0.7)",
              ],
              borderColor: [
                "rgba(74, 107, 255, 1)",
                "rgba(255, 107, 107, 1)",
                "rgba(40, 167, 69, 1)",
                "rgba(255, 193, 7, 1)",
                "rgba(108, 117, 125, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw || 0
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: $${value.toLocaleString()} (${percentage}%)`
                },
              },
            },
          },
        },
      })
    }

    // Statistics Charts
    const userGrowthChartCtx = document.getElementById("userGrowthChart")
    if (userGrowthChartCtx) {
      new Chart(userGrowthChartCtx, {
        type: "line",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          datasets: [
            {
              label: "Usuarios",
              data: [5, 7, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30],
              borderColor: "rgba(74, 107, 255, 1)",
              backgroundColor: "rgba(74, 107, 255, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }

    const propertiesLocationChartCtx = document.getElementById("propertiesLocationChart")
    if (propertiesLocationChartCtx) {
      new Chart(propertiesLocationChartCtx, {
        type: "pie",
        data: {
          labels: ["Santiago Centro", "Providencia", "Las Condes", "Ñuñoa", "Otras ubicaciones"],
          datasets: [
            {
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                "rgba(74, 107, 255, 0.7)",
                "rgba(255, 107, 107, 0.7)",
                "rgba(40, 167, 69, 0.7)",
                "rgba(255, 193, 7, 0.7)",
                "rgba(108, 117, 125, 0.7)",
              ],
              borderColor: [
                "rgba(74, 107, 255, 1)",
                "rgba(255, 107, 107, 1)",
                "rgba(40, 167, 69, 1)",
                "rgba(255, 193, 7, 1)",
                "rgba(108, 117, 125, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw || 0
                  return `${label}: ${value}%`
                },
              },
            },
          },
        },
      })
    }

    const roomOccupancyChartCtx = document.getElementById("roomOccupancyChart")
    if (roomOccupancyChartCtx) {
      new Chart(roomOccupancyChartCtx, {
        type: "line",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          datasets: [
            {
              label: "Tasa de ocupación (%)",
              data: [65, 68, 70, 72, 75, 78, 80, 82, 80, 78, 76, 75],
              borderColor: "rgba(40, 167, 69, 1)",
              backgroundColor: "rgba(40, 167, 69, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => value + "%",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => context.dataset.label + ": " + context.raw + "%",
              },
            },
          },
        },
      })
    }

    const incomeProjectionChartCtx = document.getElementById("incomeProjectionChart")
    if (incomeProjectionChartCtx) {
      new Chart(incomeProjectionChartCtx, {
        type: "line",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          datasets: [
            {
              label: "Ingresos reales",
              data: [
                9500000, 10000000, 10500000, 11000000, 12500000, 13000000, 13500000, 14000000, 14500000, 15000000,
                15500000, 16000000,
              ],
              borderColor: "rgba(74, 107, 255, 1)",
              backgroundColor: "rgba(74, 107, 255, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Proyección",
              data: [
                9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 12000000, 12500000, 13000000, 13500000,
                14000000, 14500000,
              ],
              borderColor: "rgba(108, 117, 125, 1)",
              borderDash: [5, 5],
              backgroundColor: "rgba(108, 117, 125, 0)",
              tension: 0.3,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => "$" + (value / 1000000).toFixed(1) + "M",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => context.dataset.label + ": $" + context.raw.toLocaleString(),
              },
            },
          },
        },
      })
    }
  }
})
