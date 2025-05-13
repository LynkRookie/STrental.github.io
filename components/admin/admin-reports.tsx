"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Users, Home, DollarSign } from "lucide-react"

export function AdminReports() {
  const [reportType, setReportType] = useState("users")
  const [period, setPeriod] = useState("current")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Reportes y Estadísticas</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Mes Actual</SelectItem>
              <SelectItem value="last">Mes Anterior</SelectItem>
              <SelectItem value="year">Año Actual</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Descargar CSV
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Propiedades
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Finanzas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Usuarios</CardTitle>
              <CardDescription>Información detallada sobre los usuarios registrados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead>Propiedades</TableHead>
                    <TableHead>Arrendatarios</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Juan Pérez",
                      email: "juan.perez@example.com",
                      role: "landlord",
                      joinDate: "2023-01-15",
                      properties: 2,
                      tenants: 5,
                      status: "active",
                    },
                    {
                      name: "María González",
                      email: "maria.gonzalez@example.com",
                      role: "landlord",
                      joinDate: "2023-02-01",
                      properties: 1,
                      tenants: 3,
                      status: "active",
                    },
                    {
                      name: "Carlos Rodríguez",
                      email: "carlos.rodriguez@example.com",
                      role: "landlord",
                      joinDate: "2023-03-10",
                      properties: 3,
                      tenants: 8,
                      status: "active",
                    },
                    {
                      name: "Ana Martínez",
                      email: "ana.martinez@example.com",
                      role: "landlord",
                      joinDate: "2023-04-05",
                      properties: 0,
                      tenants: 0,
                      status: "inactive",
                    },
                    {
                      name: "Pedro López",
                      email: "pedro.lopez@example.com",
                      role: "admin",
                      joinDate: "2023-01-01",
                      properties: 0,
                      tenants: 0,
                      status: "active",
                    },
                  ].map((user, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role === "admin" ? "Administrador" : "Arrendador"}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{user.properties}</TableCell>
                      <TableCell>{user.tenants}</TableCell>
                      <TableCell>{user.status === "active" ? "Activo" : "Inactivo"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Propiedades</CardTitle>
              <CardDescription>Información detallada sobre las propiedades registradas en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Propietario</TableHead>
                    <TableHead>Habitaciones</TableHead>
                    <TableHead>Ocupación</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      title: "Casa en Santiago Centro",
                      address: "Av. Libertador 1234, Santiago",
                      owner: "Juan Pérez",
                      rooms: 5,
                      occupiedRooms: 3,
                      addedDate: "2023-01-15",
                      status: "active",
                    },
                    {
                      title: "Departamento en Providencia",
                      address: "Calle Nueva 567, Providencia",
                      owner: "María González",
                      rooms: 3,
                      occupiedRooms: 2,
                      addedDate: "2023-02-01",
                      status: "active",
                    },
                    {
                      title: "Casa en Las Condes",
                      address: "Av. Principal 890, Las Condes",
                      owner: "Carlos Rodríguez",
                      rooms: 4,
                      occupiedRooms: 4,
                      addedDate: "2023-03-10",
                      status: "active",
                    },
                    {
                      title: "Departamento en Ñuñoa",
                      address: "Calle Secundaria 123, Ñuñoa",
                      owner: "Carlos Rodríguez",
                      rooms: 2,
                      occupiedRooms: 0,
                      addedDate: "2023-04-05",
                      status: "inactive",
                    },
                  ].map((property, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>{property.owner}</TableCell>
                      <TableCell>{property.rooms}</TableCell>
                      <TableCell>
                        {property.occupiedRooms}/{property.rooms}
                      </TableCell>
                      <TableCell>{new Date(property.addedDate).toLocaleDateString()}</TableCell>
                      <TableCell>{property.status === "active" ? "Activa" : "Inactiva"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporte Financiero</CardTitle>
              <CardDescription>Información detallada sobre los ingresos generados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Propiedad</TableHead>
                    <TableHead>Propietario</TableHead>
                    <TableHead>Habitaciones Ocupadas</TableHead>
                    <TableHead>Ingresos Mensuales</TableHead>
                    <TableHead>Ingresos Anuales</TableHead>
                    <TableHead>Crecimiento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      property: "Casa en Santiago Centro",
                      owner: "Juan Pérez",
                      occupiedRooms: "3/5",
                      monthlyIncome: 360000,
                      yearlyIncome: 4320000,
                      growth: "+15%",
                    },
                    {
                      property: "Departamento en Providencia",
                      owner: "María González",
                      occupiedRooms: "2/3",
                      monthlyIncome: 300000,
                      yearlyIncome: 3600000,
                      growth: "+8%",
                    },
                    {
                      property: "Casa en Las Condes",
                      owner: "Carlos Rodríguez",
                      occupiedRooms: "4/4",
                      monthlyIncome: 480000,
                      yearlyIncome: 5760000,
                      growth: "+20%",
                    },
                    {
                      property: "Departamento en Ñuñoa",
                      owner: "Carlos Rodríguez",
                      occupiedRooms: "0/2",
                      monthlyIncome: 0,
                      yearlyIncome: 0,
                      growth: "0%",
                    },
                  ].map((finance, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{finance.property}</TableCell>
                      <TableCell>{finance.owner}</TableCell>
                      <TableCell>{finance.occupiedRooms}</TableCell>
                      <TableCell>${finance.monthlyIncome.toLocaleString()}</TableCell>
                      <TableCell>${finance.yearlyIncome.toLocaleString()}</TableCell>
                      <TableCell>{finance.growth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Resumen Financiero</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Ingresos Totales (Mes)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$8,540,000</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Ingresos Totales (Año)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$102,480,000</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Crecimiento Anual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+18%</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Exportar Datos Completos
          </CardTitle>
          <CardDescription>
            Genera un archivo CSV con todos los datos del sistema para análisis detallado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Exportar Datos de Usuarios
            </Button>
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Exportar Datos de Propiedades
            </Button>
            <Button className="w-full">
              <DollarSign className="mr-2 h-4 w-4" />
              Exportar Datos Financieros
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
