"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Home, Phone } from "lucide-react"
import { RoomModal } from "@/components/room-modal"

// Datos de ejemplo para las propiedades
const properties = [
  {
    id: 1,
    title: "Casa en Santiago Centro",
    address: "Av. Libertador 1234, Santiago",
    image: "/placeholder.svg?height=300&width=500",
    rooms: 5,
    price: 350000,
    description: "Amplia casa con 5 habitaciones, 2 baños, cocina equipada y patio trasero.",
  },
  {
    id: 2,
    title: "Departamento en Providencia",
    address: "Calle Nueva 567, Providencia",
    image: "/placeholder.svg?height=300&width=500",
    rooms: 3,
    price: 280000,
    description: "Moderno departamento con 3 habitaciones, 1 baño, cocina americana y balcón.",
  },
  {
    id: 3,
    title: "Casa en Las Condes",
    address: "Av. Principal 890, Las Condes",
    image: "/placeholder.svg?height=300&width=500",
    rooms: 4,
    price: 420000,
    description: "Elegante casa con 4 habitaciones, 3 baños, cocina equipada y jardín.",
  },
]

export function PropertyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length)
  }

  const handleViewRooms = (property: (typeof properties)[0]) => {
    setSelectedProperty(property)
    setShowRoomModal(true)
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {properties.map((property) => (
            <div key={property.id} className="min-w-full px-4">
              <Card className="overflow-hidden">
                <div className="relative h-[300px] w-full">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{property.title}</h3>
                  <p className="text-muted-foreground">{property.address}</p>
                  <p className="mt-2">{property.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-medium">{property.rooms} habitaciones</span>
                    <span className="font-bold">${property.price.toLocaleString()} /mes</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4 p-6 pt-0">
                  <Button className="flex-1" onClick={() => handleViewRooms(property)}>
                    <Home className="mr-2 h-4 w-4" />
                    Ver habitaciones
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Contactar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {showRoomModal && selectedProperty && (
        <RoomModal property={selectedProperty} onClose={() => setShowRoomModal(false)} />
      )}
    </div>
  )
}
