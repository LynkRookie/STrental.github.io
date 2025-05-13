"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import Image from "next/image"

// Datos de ejemplo para las habitaciones
const roomsData = [
  {
    id: 1,
    number: 1,
    size: "12m²",
    price: 120000,
    status: "available",
    description: "Habitación individual con ventana, escritorio y armario.",
    amenities: ["Cama individual", "Escritorio", "Armario", "Ventana"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    number: 2,
    size: "15m²",
    price: 150000,
    status: "occupied",
    availableDate: "2023-08-15",
    description: "Habitación amplia con baño privado y balcón.",
    amenities: ["Cama doble", "Baño privado", "Armario", "Balcón"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    number: 3,
    size: "10m²",
    price: 100000,
    status: "available",
    description: "Habitación compacta con buena iluminación.",
    amenities: ["Cama individual", "Estantería", "Ventana"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    number: 4,
    size: "18m²",
    price: 180000,
    status: "occupied",
    availableDate: "2023-07-30",
    description: "Habitación master con baño privado y vestidor.",
    amenities: ["Cama queen", "Baño privado", "Vestidor", "Escritorio"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    number: 5,
    size: "14m²",
    price: 140000,
    status: "available",
    description: "Habitación con vista al jardín y escritorio.",
    amenities: ["Cama individual", "Escritorio", "Armario", "Vista al jardín"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

type PropertyType = {
  id: number
  title: string
  address: string
  image: string
  rooms: number
  price: number
  description: string
}

interface RoomModalProps {
  property: PropertyType
  onClose: () => void
}

export function RoomModal({ property, onClose }: RoomModalProps) {
  const [activeTab, setActiveTab] = useState("list")
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property.title} - Habitaciones</DialogTitle>
          <DialogDescription>
            {property.address} - {property.rooms} habitaciones disponibles
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Habitaciones</TabsTrigger>
            <TabsTrigger value="floorplan">Plano Interactivo</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roomsData.map((room) => (
                <Card key={room.id} className="overflow-hidden">
                  <div className="relative h-[150px]">
                    <Image
                      src={room.image || "/placeholder.svg"}
                      alt={`Habitación ${room.number}`}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={room.status === "available" ? "default" : "secondary"}
                    >
                      {room.status === "available" ? "Disponible" : "Ocupada"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold">Habitación {room.number}</h3>
                    <p className="text-sm text-muted-foreground">
                      {room.size} - ${room.price.toLocaleString()}/mes
                    </p>
                    <p className="mt-2 text-sm">{room.description}</p>

                    {room.status === "occupied" && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Disponible desde: {new Date(room.availableDate).toLocaleDateString()}
                      </p>
                    )}

                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-1">Servicios incluidos:</h4>
                      <ul className="text-sm grid grid-cols-2 gap-1">
                        {room.amenities.map((amenity, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      variant={room.status === "available" ? "default" : "secondary"}
                      disabled={room.status !== "available"}
                    >
                      {room.status === "available" ? "Contactar" : "No disponible"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="floorplan" className="mt-4">
            <div className="relative border rounded-lg p-4 h-[500px] bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%] border-2 border-gray-400 bg-white">
                  {/* Habitaciones en el plano */}
                  {roomsData.map((room) => {
                    // Posiciones relativas para cada habitación en el plano
                    const positions = [
                      { top: "10%", left: "10%", width: "25%", height: "40%" },
                      { top: "10%", right: "10%", width: "25%", height: "40%" },
                      { top: "60%", left: "10%", width: "20%", height: "30%" },
                      { top: "60%", left: "40%", width: "30%", height: "30%" },
                      { top: "60%", right: "10%", width: "20%", height: "30%" },
                    ]

                    const pos = positions[room.number - 1]

                    return (
                      <div
                        key={room.id}
                        className={`absolute border-2 ${
                          selectedRoom === room.id ? "border-blue-500" : "border-gray-300"
                        } ${room.status === "available" ? "bg-green-100" : "bg-red-100"}`}
                        style={pos}
                        onClick={() => setSelectedRoom(room.id)}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full ${
                            room.status === "available"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          } text-white`}
                        >
                          {room.number}
                        </Button>

                        {selectedRoom === room.id && (
                          <div className="absolute -bottom-24 left-0 w-48 bg-white border rounded-md shadow-md p-2 z-10">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Habitación {room.number}</span>
                              <Badge variant={room.status === "available" ? "default" : "secondary"}>
                                {room.status === "available" ? "Disponible" : "Ocupada"}
                              </Badge>
                            </div>
                            <p className="text-xs mt-1">
                              {room.size} - ${room.price.toLocaleString()}/mes
                            </p>
                            {room.status === "occupied" && (
                              <p className="text-xs mt-1">
                                Disponible: {new Date(room.availableDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Áreas comunes */}
                  <div className="absolute bottom-2 left-2 text-xs text-gray-500">
                    Verde: Disponible | Rojo: Ocupada
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
