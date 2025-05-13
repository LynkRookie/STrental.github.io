"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"

export function FinancialDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Finanzas</h2>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240,000</div>
            <p className="text-xs text-muted-foreground">+$240,000 (24%) desde el mes pasado</p>
            <div className="mt-4 h-[60px]">
              {/* Gráfico simplificado */}
              <div className="flex items-end justify-between h-full">
                {[40, 30, 45, 25, 60, 75, 65].map((height, i) => (
                  <div key={i} className="w-6 bg-primary rounded-sm" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Distribución de Ingresos</CardTitle>
            <CardDescription>Por propiedad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] flex items-center justify-center">
              {/* Gráfico de pastel simplificado */}
              <div className="relative h-32 w-32 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-primary"
                  style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
                />
                <div
                  className="absolute inset-0 bg-blue-500"
                  style={{ clipPath: "polygon(50% 50%, 100% 100%, 0 100%, 0 50%)" }}
                />
                <div
                  className="absolute inset-0 bg-green-500"
                  style={{ clipPath: "polygon(50% 50%, 0 50%, 0 0, 50% 0)" }}
                />
                <div
                  className="absolute inset-0 bg-yellow-500"
                  style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0)" }}
                />
                <div className="absolute inset-0 rounded-full border-4 border-background" />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-primary" />
                <span>Santiago Centro (40%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-blue-500" />
                <span>Providencia (30%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                <span>Las Condes (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500" />
                <span>Otros (10%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ocupación</CardTitle>
            <CardDescription>Habitaciones ocupadas vs. disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[180px]">
              {/* Gráfico de barras simplificado */}
              <div className="flex items-end space-x-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-16 bg-primary rounded-t-md" />
                  <span className="mt-2 text-xs">Ocupadas</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-muted rounded-t-md" />
                  <span className="mt-2 text-xs">Disponibles</span>
                  <span className="font-bold">4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Ingresos Diarios</TabsTrigger>
          <TabsTrigger value="monthly">Ingresos Mensuales</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos Diarios por Habitación</CardTitle>
              <CardDescription>Montos generados por cada habitación en el período actual</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Propiedad</TableHead>
                    <TableHead>Habitación</TableHead>
                    <TableHead>Arrendatario</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(7)].map((_, i) => {
                    const date = new Date()
                    date.setDate(date.getDate() - i)

                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          {["Casa en Santiago Centro", "Departamento en Providencia", "Casa en Las Condes"][i % 3]}
                        </TableCell>
                        <TableCell>Habitación {(i % 5) + 1}</TableCell>
                        <TableCell>
                          {["Juan Pérez", "María González", "Carlos Rodríguez", "Ana Martínez"][i % 4]}
                        </TableCell>
                        <TableCell className="text-right">${(20000 + i * 1000).toLocaleString()}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos Mensuales</CardTitle>
              <CardDescription>Montos totales generados por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Gráfico de barras mensual simplificado */}
                <div className="flex items-end justify-between h-[250px]">
                  {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((month, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-16 bg-primary rounded-t-md" style={{ height: `${150 + i * 20}px` }} />
                      <span className="mt-2 text-xs">{month}</span>
                      <span className="font-bold">${(800000 + i * 100000).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
