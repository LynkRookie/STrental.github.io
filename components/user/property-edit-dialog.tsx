"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PropertyEditDialogProps {
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
  isNew?: boolean
}

export function PropertyEditDialog({ property, isOpen, onClose, isNew = false }: PropertyEditDialogProps) {
  const [title, setTitle] = useState(property?.title || "")
  const [address, setAddress] = useState(property?.address || "")
  const [description, setDescription] = useState(property?.description || "")
  const [rooms, setRooms] = useState(property?.rooms?.toString() || "1")
  const [price, setPrice] = useState(property?.price?.toString() || "0")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isNew ? "Agregar Nueva Propiedad" : "Editar Propiedad"}</DialogTitle>
          <DialogDescription>
            {isNew
              ? "Ingresa los detalles de la propiedad que deseas agregar al sistema."
              : "Modifica los detalles de la propiedad seleccionada."}
          </DialogDescription>
        </DialogHeader>

        {saveSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {isNew ? "Propiedad agregada correctamente." : "Cambios guardados correctamente."}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms">Número de Habitaciones</Label>
              <Input id="rooms" type="number" min="1" value={rooms} onChange={(e) => setRooms(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio Base (por habitación)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <Input id="image" type="file" />
          </div>

          {!isNew && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Servicios Incluidos</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Agua", "Luz", "Gas", "Internet", "Cable TV", "Limpieza"].map((service, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox id={`service-${i}`} defaultChecked={i < 4} />
                      <label
                        htmlFor={`service-${i}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado de la Propiedad</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="inactive">Inactiva</SelectItem>
                    <SelectItem value="maintenance">En Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>{isNew ? "Agregar Propiedad" : "Guardar Cambios"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
