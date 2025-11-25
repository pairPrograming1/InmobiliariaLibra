import { PropertyForm } from "@/components/property-form"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Carga una nueva propiedad en alquiler</p>
        </div>

        <PropertyForm />
      </div>
    </div>
  )
}
