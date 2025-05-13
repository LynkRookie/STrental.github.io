"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Home, DollarSign, Edit, Plus } from "lucide-react"

interface PropertyDetailDialogProps {
  property: {
    id: number
    title: string
    address: string
    image: string
    rooms: number
    occupiedRooms: number
    price: number
    description: string
  } | null
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
}

export function PropertyDetailDialog({ property, isOpen, onClose, onEdit }: PropertyDetailDialogProps) {
  if (!property) return null

  // Datos de ejemplo para las habitaciones
  const rooms = [
    {
      number: 1,
      size: "12m²",
      price: 120000,
      status: "occupied",
      tenant: "Juan Pérez",
      startDate: "2023-01-15",
      endDate: "2023-12-15",
    },
    {
      number: 2,
      size: "15m²",
      price: 150000,
      status: "occupied",
      tenant: "María González",
      startDate: "2023-02-01",
      endDate: "2023-08-01",
    },
    {
      number: 3,
      size: "10m²",
      price: 100000,
      status: "available",
      tenant: null,
      startDate: null,
      endDate: null,
    },
    {
      number: 4,
      size: "18m²",
      price: 180000,
      status: "occupied",
      tenant: "Carlos Rodríguez",
      startDate: "2023-03-10",
      endDate: "2023-09-10",
    },
    {
      number: 5,
      size: "14m²",
      price: 140000,
      status: "available",
      tenant: null,
      startDate: null,
      endDate: null,
    },
  ]

  // Datos de ejemplo para los ingresos
  const incomes = [
    { month: "Enero", amount: 450000 },
    { month: "Febrero", amount: 600000 },
    { month: "Marzo", amount: 600000 },
    { month: "Abril", amount: 600000 },
    { month: "Mayo", amount: 600000 },
    { month: "Junio", amount: 600000 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{property.title}</span>
            <Badge variant={property.occupiedRooms < property.rooms ? "default" : "secondary"}>
              {property.occupiedRooms < property.rooms
                ? `${property.rooms - property.occupiedRooms} habitaciones disponibles`
                : "Completamente ocupada"}
            </Badge>
          </DialogTitle>
          <DialogDescription>{property.address}</DialogDescription>
        </DialogHeader>

        <div className="relative h-[200px] w-full rounded-md overflow-hidden mb-4">
          <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>

        <div className="space-y-2 mb-4">
          <p>{property.description}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <Home className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {property.occupiedRooms}/{property.rooms} habitaciones ocupadas
              </span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>${property.price.toLocaleString()}/mes (precio base)</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="rooms">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">Habitaciones</TabsTrigger>
            <TabsTrigger value="finances">Finanzas</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Listado de Habitaciones</h3>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Habitación
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Arrendatario</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.number}>
                    <TableCell className="font-medium">{room.number}</TableCell>
                    <TableCell>{room.size}</TableCell>
                    <TableCell>${room.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={room.status === "available" ? "default" : "secondary"}>
                        {room.status === "available" ? "Disponible" : "Ocupada"}
                      </Badge>
                    </TableCell>
                    <TableCell>{room.tenant || "-"}</TableCell>
                    <TableCell>
                      {room.startDate && room.endDate
                        ? `${new Date(room.startDate).toLocaleDateString()} - ${new Date(
                            room.endDate,
                          ).toLocaleDateString()}`
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="finances" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {/* Gráfico de barras simplificado */}
                  <div className="flex items-end justify-between h-[150px]">
                    {incomes.map((income, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-12 bg-primary rounded-t-md"
                          style={{ height: `${(income.amount / 600000) * 100}%` }}
                        />
                        <span className="mt-2 text-xs">{income.month}</span>
                        <span className="text-xs font-medium">${income.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Ingreso Total (6 meses):</span>
                    <span className="font-bold">${incomes.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Promedio Mensual:</span>
                    <span className="font-bold">
                      ${Math.round(incomes.reduce((sum, i) => sum + i.amount, 0) / incomes.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ocupación Promedio:</span>
                    <span className="font-bold">{Math.round((property.occupiedRooms / property.rooms) * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Propiedad
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
