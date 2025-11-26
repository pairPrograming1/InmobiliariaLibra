import { sql } from "@/lib/db"
import type { Property, PropertyWithDetails, Room, PropertyImage, Service } from "@/lib/types"
import { PropertyForm } from "@/components/property-form"
import { notFound } from "next/navigation"

async function getProperty(id: string): Promise<PropertyWithDetails | null> {
  try {
    if (!sql) {
      console.log("Database not configured yet")
      return null
    }

    const propertyRows = (await sql<Property[]>`
      SELECT * FROM properties WHERE id = ${id}
    `) as unknown as Property[]
    const property = propertyRows[0]

    if (!property) {
      return null
    }

    const roomsRows = (await sql<Room[]>`
      SELECT * FROM rooms WHERE property_id = ${id}
    `) as unknown as Room[]
    const imagesRows = (await sql<PropertyImage[]>`
      SELECT * FROM property_images WHERE property_id = ${id} ORDER BY display_order
    `) as unknown as PropertyImage[]
    const servicesRows = (await sql<Service[]>`
      SELECT s.* FROM services s
      JOIN property_services ps ON s.id = ps.service_id
      WHERE ps.property_id = ${id}
    `) as unknown as Service[]

    const result: PropertyWithDetails = {
      id: property.id,
      title: property.title,
      description: property.description,
      square_meters: property.square_meters,
      rental_price: property.rental_price,
      expenses: property.expenses,
      created_at: property.created_at,
      updated_at: property.updated_at,
      rooms: roomsRows,
      images: imagesRows,
      services: servicesRows,
    }
    return result
  } catch (error) {
    console.error("[v0] Error fetching property:", error)
    return null
  }
}

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Editar Propiedad
        </h1>
        <PropertyForm property={property} />
      </div>
    </div>
  )
}
