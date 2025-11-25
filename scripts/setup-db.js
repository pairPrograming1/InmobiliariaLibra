const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:Cgt1986!@localhost:5432/imobiliarialibra",
})

async function setupDatabase() {
  try {
    const sqlFile = fs.readFileSync(
      path.join(__dirname, "001-create-properties-schema.sql"),
      "utf8",
    )

    console.log("Executing SQL schema setup...")
    await pool.query(sqlFile)
    console.log("✅ Database schema setup completed successfully!")
  } catch (error) {
    console.error("❌ Error setting up database:", error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

setupDatabase()
