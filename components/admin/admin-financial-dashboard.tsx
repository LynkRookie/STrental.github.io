"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function AdminFinancialDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Estadísticas del Sistema</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Mes Actual</SelectItem>
              <SelectItem value="last">Mes Anterior</SelectItem>
              <SelectItem value="year">Año Actual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Datos
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Ingresos totales generados por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {/* Gráfico de barras mensual simplificado */}
              <div className="flex items-end justify-between h-[250px]">
                {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((month, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 bg-primary rounded-t-md" style={{ height: `${150 + i * 20}px` }} />
                    <span className="mt-2 text-xs">{month}</span>
                    <span className="font-bold">${(5000000 + i * 500000).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Propiedades por Usuario</CardTitle>
            <CardDescription>Cantidad de propiedades registradas por usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {/* Gráfico de barras horizontal simplificado */}
              <div className="space-y-6 mt-8">
                {[
                  { name: "Juan Pérez", value: 2 },
                  { name: "María González", value: 1 },
                  { name: "Carlos Rodríguez", value: 3 },
                  { name: "Ana Martínez", value: 0 },
                  { name: "Pedro López", value: 0 },
                ].map((user, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{user.name}</span>
                      <span className="font-medium">{user.value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(user.value / 3) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ocupación de Habitaciones</CardTitle>
            <CardDescription>Porcentaje de habitaciones ocupadas vs. disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[250px]">
              {/* Gráfico circular simplificado */}
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {/* Círculo de fondo (disponibles) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="15" />
                  {/* Círculo de progreso (ocupadas) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="15"
                    strokeDasharray="251.2"
                    strokeDashoffset="75.36"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">72%</span>
                  <span className="text-xs text-muted-foreground">Ocupadas</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">72%</div>
                <div className="text-xs text-muted-foreground">Habitaciones Ocupadas</div>
              </div>
              <div>
                <div className="text-xl font-bold">28%</div>
                <div className="text-xs text-muted-foreground">Habitaciones Disponibles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad del Sistema</CardTitle>
            <CardDescription>Estadísticas en tiempo real sobre la actividad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Nuevos Usuarios (Último Mes)</span>
                  <span className="font-bold">+3</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "30%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Nuevas Propiedades (Último Mes)</span>
                  <span className="font-bold">+5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "50%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Nuevos Arrendatarios (Último Mes)</span>
                  <span className="font-bold">+8</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "80%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Crecimiento de Ingresos (Último Mes)</span>
                  <span className="font-bold">+24%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "24%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
