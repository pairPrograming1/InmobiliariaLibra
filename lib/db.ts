import { neon } from "@neondatabase/serverless"
import { Pool } from "pg"

// Detect environment: use Neon serverless on Vercel, pg locally
const isVercel = process.env.VERCEL === "1"
const DATABASE_URL = process.env.DATABASE_URL

// Initialize appropriate DB client
let pool: Pool | null = null
let neonSql: ReturnType<typeof neon> | null = null

if (DATABASE_URL) {
  if (isVercel) {
    // Use Neon serverless driver on Vercel
    neonSql = neon(DATABASE_URL)
  } else {
    // Use pg Pool for local development
    pool = new Pool({ connectionString: DATABASE_URL })
  }
}

// Helper function to handle template literals like Neon's sql``
export async function sql<T = any>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  if (!DATABASE_URL) {
    console.warn("DATABASE_URL not configured")
    return []
  }

  try {
    if (isVercel && neonSql) {
      // Neon's sql function returns rows directly (already an array)
      const result = await neonSql(strings, ...values)
      return result as T[]
    } else if (pool) {
      // pg Pool needs parameterized queries
      let query = strings[0]
      const params: any[] = []

      for (let i = 1; i < strings.length; i++) {
        params.push(values[i - 1])
        query += `$${i}${strings[i]}`
      }

      const result = await pool.query(query, params)
      return result.rows as T[]
    }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }

  return []
}
