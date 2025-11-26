"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

interface DeleteButtonProps {
  propertyId: string
  propertyTitle: string
}

export function DeleteButton({ propertyId, propertyTitle }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar propiedad?",
      text: `Se eliminará "${propertyTitle}" permanentemente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/properties/${propertyId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await Swal.fire({
            title: "Eliminada",
            text: "La propiedad se eliminó correctamente",
            icon: "success",
            confirmButtonText: "OK",
          })
          router.push("/propiedades")
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
    <Button variant="outline" size="sm" className="gap-2 hover:bg-destructive/10 hover:text-destructive" onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
      Eliminar
    </Button>
  )
}
