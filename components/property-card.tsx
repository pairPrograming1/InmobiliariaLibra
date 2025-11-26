"use client"

import type { PropertyWithDetails } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize2, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

interface PropertyCardProps {
  property: PropertyWithDetails
}

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter()
  const mainImage = property.images[0]?.cloudinary_url || "/departamento.jpg"

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/admin/propiedades/${property.id}/editar`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await Swal.fire({
      title: "¿Eliminar propiedad?",
      text: `Se eliminará "${property.title}" permanentemente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/properties/${property.id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await Swal.fire({
            title: "Eliminada",
            text: "La propiedad se eliminó correctamente",
            icon: "success",
            confirmButtonText: "OK",
          })
          router.refresh()
        } else {
          throw new Error("Error al eliminar")
        }
      } catch (error) {
        await Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la propiedad",
          icon: "error",
          confirmButtonText: "OK",
        })
      }
    }
  }

  return (
    <Link href={`/propiedades/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border h-full">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={mainImage || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {property.images.length > 1 && (
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
              +{property.images.length - 1} fotos
            </div>
          )}
        </div>

        <CardContent className="p-3 md:p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base md:text-xl font-bold text-foreground line-clamp-2 flex-1">{property.title}</h3>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-4">{property.description}</p>

          <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs md:text-sm">
              <Maximize2 className="h-3 w-3" />
              {property.square_meters} m²
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs md:text-sm">
              <MapPin className="h-3 w-3" />
              {property.rooms.length}
            </Badge>
          </div>

          <div className="border-t border-border pt-3 md:pt-4">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Alquiler</p>
                <p className="text-xl md:text-2xl font-bold text-primary">${property.rental_price.toLocaleString("es-AR")}</p>
              </div>
              {property.expenses > 0 && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Expensas</p>
                  <p className="text-xs md:text-sm font-semibold text-foreground">${property.expenses.toLocaleString("es-AR")}</p>
                </div>
              )}
            </div>
          </div>

          {property.services.length > 0 && (
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Servicios</p>
              <div className="flex flex-wrap gap-1">
                {property.services.slice(0, 3).map((service) => (
                  <span key={service.id} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    {service.name}
                  </span>
                ))}
                {property.services.length > 3 && (
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    +{property.services.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
