"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Plus, Edit, Eye } from "lucide-react"
import { PropertyEditDialog } from "@/components/user/property-edit-dialog"
import { PropertyDetailDialog } from "@/components/user/property-detail-dialog"

// Datos de ejemplo para las propiedades
const properties = [
  {
    id: 1,
    title: "Casa en Santiago Centro",
    address: "Av. Libertador 1234, Santiago",
    image: "/placeholder.svg?height=200&width=300",
    rooms: 5,
    occupiedRooms: 3,
    price: 350000,
    description: "Amplia casa con 5 habitaciones, 2 baños, cocina equipada y patio trasero.",
  },
  {
    id: 2,
    title: "Departamento en Providencia",
    address: "Calle Nueva 567, Providencia",
    image: "/placeholder.svg?height=200&width=300",
    rooms: 3,
    occupiedRooms: 2,
    price: 280000,
    description: "Moderno departamento con 3 habitaciones, 1 baño, cocina americana y balcón.",
  },
  {
    id: 3,
    title: "Casa en Las Condes",
    address: "Av. Principal 890, Las Condes",
    image: "/placeholder.svg?height=200&width=300",
    rooms: 4,
    occupiedRooms: 3,
    price: 420000,
    description: "Elegante casa con 4 habitaciones, 3 baños, cocina equipada y jardín.",
  },
]

export function PropertyList() {
  const [activeTab, setActiveTab] = useState("all")
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false)
  const [showEditPropertyDialog, setShowEditPropertyDialog] = useState(false)
  const [showPropertyDetailDialog, setShowPropertyDetailDialog] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)

  const filteredProperties =
    activeTab === "all"
      ? properties
      : activeTab === "available"
        ? properties.filter((p) => p.occupiedRooms < p.rooms)
        : properties.filter((p) => p.occupiedRooms === p.rooms)

  const handleAddProperty = () => {
    setSelectedProperty(null)
    setShowAddPropertyDialog(true)
  }

  const handleEditProperty = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setShowEditPropertyDialog(true)
  }

  const handleViewDetails = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setShowPropertyDetailDialog(true)
  }

  const handleEditFromDetails = () => {
    setShowPropertyDetailDialog(false)
    setShowEditPropertyDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Mis Propiedades</h2>
        <Button onClick={handleAddProperty}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Propiedad
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="available">Con Disponibilidad</TabsTrigger>
          <TabsTrigger value="full">Completamente Ocupadas</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge
                    className="absolute top-2 right-2"
                    variant={property.occupiedRooms < property.rooms ? "default" : "secondary"}
                  >
                    {property.occupiedRooms < property.rooms
                      ? `${property.rooms - property.occupiedRooms} disponibles`
                      : "Completamente ocupada"}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                  <p className="text-sm">{property.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {property.occupiedRooms}/{property.rooms} habitaciones ocupadas
                      </span>
                    </div>
                    <span className="font-medium">${property.price.toLocaleString()}/mes</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditProperty(property)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleViewDetails(property)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para agregar nueva propiedad */}
      <PropertyEditDialog
        property={null}
        isOpen={showAddPropertyDialog}
        onClose={() => setShowAddPropertyDialog(false)}
        isNew={true}
      />

      {/* Diálogo para editar propiedad existente */}
      <PropertyEditDialog
        property={selectedProperty}
        isOpen={showEditPropertyDialog}
        onClose={() => setShowEditPropertyDialog(false)}
      />

      {/* Diálogo para ver detalles de la propiedad */}
      <PropertyDetailDialog
        property={selectedProperty}
        isOpen={showPropertyDetailDialog}
        onClose={() => setShowPropertyDetailDialog(false)}
        onEdit={handleEditFromDetails}
      />
    </div>
  )
}
