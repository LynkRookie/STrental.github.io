"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Home, User, MapPin, Calendar, Edit, Trash2, Eye } from "lucide-react"

// Datos de ejemplo para las propiedades
const properties = [
  {
    id: 1,
    title: "Casa en Santiago Centro",
    address: "Av. Libertador 1234, Santiago",
    image: "/placeholder.svg?height=200&width=300",
    owner: "Juan Pérez",
    rooms: 5,
    occupiedRooms: 3,
    addedDate: "2023-01-15",
    status: "active",
  },
  {
    id: 2,
    title: "Departamento en Providencia",
    address: "Calle Nueva 567, Providencia",
    image: "/placeholder.svg?height=200&width=300",
    owner: "María González",
    rooms: 3,
    occupiedRooms: 2,
    addedDate: "2023-02-01",
    status: "active",
  },
  {
    id: 3,
    title: "Casa en Las Condes",
    address: "Av. Principal 890, Las Condes",
    image: "/placeholder.svg?height=200&width=300",
    owner: "Carlos Rodríguez",
    rooms: 4,
    occupiedRooms: 4,
    addedDate: "2023-03-10",
    status: "active",
  },
  {
    id: 4,
    title: "Departamento en Ñuñoa",
    address: "Calle Secundaria 123, Ñuñoa",
    image: "/placeholder.svg?height=200&width=300",
    owner: "Carlos Rodríguez",
    rooms: 2,
    occupiedRooms: 0,
    addedDate: "2023-04-05",
    status: "inactive",
  },
]

export function AdminPropertyList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)
  const [showPropertyDetailsDialog, setShowPropertyDetailsDialog] = useState(false)

  // Filtrar por búsqueda
  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewDetails = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setShowPropertyDetailsDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Propiedades Registradas</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar propiedad..."
            className="pl-8 w-full sm:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Propiedades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propiedad</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Habitaciones</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-xs text-muted-foreground">{property.address}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>
                    {property.occupiedRooms}/{property.rooms}
                  </TableCell>
                  <TableCell>{new Date(property.addedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={property.status === "active" ? "default" : "secondary"}>
                      {property.status === "active" ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(property)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showPropertyDetailsDialog} onOpenChange={setShowPropertyDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de la Propiedad</DialogTitle>
            <DialogDescription>Información completa de la propiedad seleccionada.</DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-6">
              <div className="relative h-[200px] w-full rounded-md overflow-hidden">
                <Image
                  src={selectedProperty.image || "/placeholder.svg"}
                  alt={selectedProperty.title}
                  fill
                  className="object-cover"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={selectedProperty.status === "active" ? "default" : "secondary"}
                >
                  {selectedProperty.status === "active" ? "Activa" : "Inactiva"}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">{selectedProperty.title}</h3>
                <p className="text-sm flex items-center">
                  <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  {selectedProperty.address}
                </p>
                <p className="text-sm flex items-center">
                  <User className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  Propietario: {selectedProperty.owner}
                </p>
                <p className="text-sm flex items-center">
                  <Home className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  {selectedProperty.occupiedRooms}/{selectedProperty.rooms} habitaciones ocupadas
                </p>
                <p className="text-sm flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  Registrada el {new Date(selectedProperty.addedDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowPropertyDetailsDialog(false)}>
                  Cerrar
                </Button>
                <Button>Ver Habitaciones</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
