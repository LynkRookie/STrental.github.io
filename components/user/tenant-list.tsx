"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, FileText, Calendar, DollarSign, Home, User, Search } from "lucide-react"

// Datos de ejemplo para los arrendatarios
const tenants = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+56 9 1234 5678",
    property: "Casa en Santiago Centro",
    room: 1,
    startDate: "2023-01-15",
    endDate: "2023-12-15",
    paymentType: "Mensual",
    amount: 120000,
    status: "active",
  },
  {
    id: 2,
    name: "María González",
    email: "maria.gonzalez@example.com",
    phone: "+56 9 8765 4321",
    property: "Departamento en Providencia",
    room: 2,
    startDate: "2023-02-01",
    endDate: "2023-08-01",
    paymentType: "Mensual",
    amount: 150000,
    status: "active",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    phone: "+56 9 5555 5555",
    property: "Casa en Las Condes",
    room: 1,
    startDate: "2023-03-10",
    endDate: "2023-09-10",
    paymentType: "Diario",
    amount: 20000,
    status: "active",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    phone: "+56 9 4444 4444",
    property: "Casa en Santiago Centro",
    room: 3,
    startDate: "2023-01-01",
    endDate: "2023-07-01",
    paymentType: "Mensual",
    amount: 130000,
    status: "inactive",
  },
]

export function TenantList() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddTenantDialog, setShowAddTenantDialog] = useState(false)

  // Filtrar por estado y búsqueda
  const filteredTenants = tenants
    .filter(
      (tenant) =>
        activeTab === "all" ||
        (activeTab === "active" && tenant.status === "active") ||
        (activeTab === "inactive" && tenant.status === "inactive"),
    )
    .filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.property.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Arrendatarios</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar arrendatario..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={showAddTenantDialog} onOpenChange={setShowAddTenantDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Arrendatario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Arrendatario</DialogTitle>
                <DialogDescription>
                  Ingresa los datos del nuevo arrendatario y asígnale una habitación.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" placeholder="Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="juan.perez@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+56 9 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="identity">Documento de Identidad</Label>
                    <Input id="identity" type="file" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property">Propiedad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar propiedad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Casa en Santiago Centro</SelectItem>
                        <SelectItem value="2">Departamento en Providencia</SelectItem>
                        <SelectItem value="3">Casa en Las Condes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Habitación</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar habitación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Habitación 1</SelectItem>
                        <SelectItem value="2">Habitación 2</SelectItem>
                        <SelectItem value="3">Habitación 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de Entrada</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de Salida</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentType">Método de Cobro</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Monto</Label>
                    <Input id="amount" type="number" placeholder="120000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract">Contrato de Arriendo</Label>
                  <Input id="contract" type="file" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowAddTenantDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowAddTenantDialog(false)}>Registrar Arrendatario</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="inactive">Inactivos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTenants.map((tenant) => (
              <Card key={tenant.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                      {tenant.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={tenant.name} />
                      <AvatarFallback>
                        {tenant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center">
                        <User className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {tenant.email}
                      </p>
                      <p className="text-sm flex items-center">
                        <Home className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {tenant.property}, Hab. {tenant.room}
                      </p>
                      <p className="text-sm flex items-center">
                        <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {new Date(tenant.startDate).toLocaleDateString()} -{" "}
                        {new Date(tenant.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm flex items-center">
                        <DollarSign className="mr-1 h-3.5 w-3.5 text-muted-foreground" />$
                        {tenant.amount.toLocaleString()} ({tenant.paymentType})
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Contrato
                  </Button>
                  <Button size="sm" className="flex-1">
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
