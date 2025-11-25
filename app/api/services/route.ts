import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import type { Service } from "@/lib/types"

// GET all services
export async function GET() {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const services = await sql<Service[]>`
      SELECT * FROM services ORDER BY name
    `

    return NextResponse.json(services)
  } catch (error) {
    console.error("[v0] Error fetching services:", error)
    return NextResponse.json({ error: "Error fetching services" }, { status: 500 })
  }
}

// POST create new service
export async function POST(request: Request) {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { name } = await request.json()

    const [service] = await sql<Service[]>`
      INSERT INTO services (name)
      VALUES (${name})
      RETURNING *
    `

    return NextResponse.json(service)
  } catch (error) {
    console.error("[v0] Error creating service:", error)
    return NextResponse.json({ error: "Error creating service" }, { status: 500 })
  }
}
