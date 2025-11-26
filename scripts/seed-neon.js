/**
 * Seed script for Neon database
 * Run with: node scripts/seed-neon.js
 * 
 * Requires DATABASE_URL environment variable pointing to Neon database
 */

const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Create demo services
    console.log('📋 Creating services...');
    const services = [
      'Agua', 'Luz', 'Gas', 'Internet', 'Cable', 'Portero', 
      'Gimnasio', 'Pileta', 'Seguridad 24hs', 'Cochera'
    ];

    for (const serviceName of services) {
      await sql`
        INSERT INTO services (name)
        VALUES (${serviceName})
        ON CONFLICT (name) DO NOTHING
      `;
    }
    console.log('✅ Services created\n');

    // Create demo properties
    console.log('🏢 Creating demo properties...');
    
    const properties = [
      {
        title: 'Departamento 2 Ambientes - Palermo',
        description: 'Hermoso departamento de 2 ambientes en el corazón de Palermo. Excelente ubicación cerca de transporte público, comercios y gastronomía. Ideal para pareja o persona sola.',
        square_meters: 45,
        rental_price: 280000,
        expenses: 35000,
        rooms: [
          { title: 'Living-Comedor', description: 'Amplio ambiente con balcón' },
          { title: 'Dormitorio', description: 'Con placard empotrado' },
          { title: 'Cocina', description: 'Equipada con muebles' },
          { title: 'Baño', description: 'Completo con ducha' }
        ],
        services: ['Agua', 'Luz', 'Gas', 'Internet', 'Portero'],
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
        ]
      },
      {
        title: 'Monoambiente Moderno - Belgrano',
        description: 'Monoambiente totalmente renovado con excelente distribución. Ubicado en zona residencial tranquila con todos los servicios. Perfecto para estudiantes o profesionales.',
        square_meters: 30,
        rental_price: 190000,
        expenses: 25000,
        rooms: [
          { title: 'Ambiente Principal', description: 'Espacio integrado living-dormitorio' },
          { title: 'Kitchenette', description: 'Equipada con heladera y microondas' },
          { title: 'Baño', description: 'Completo reciclado' }
        ],
        services: ['Agua', 'Luz', 'Gas', 'Portero'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'
        ]
      },
      {
        title: 'Departamento 3 Ambientes con Amenities - Recoleta',
        description: 'Espacioso departamento de 3 ambientes en edificio premium con amenities. Gimnasio, pileta, sum y seguridad 24hs. Vista panorámica y mucha luz natural.',
        square_meters: 75,
        rental_price: 450000,
        expenses: 65000,
        rooms: [
          { title: 'Living-Comedor', description: 'Amplio con balcón corrido' },
          { title: 'Dormitorio Principal', description: 'Suite con baño privado y vestidor' },
          { title: 'Segundo Dormitorio', description: 'Con placard empotrado' },
          { title: 'Cocina', description: 'Completa con office' },
          { title: 'Baño Principal', description: 'Completo' },
          { title: 'Baño Secundario', description: 'En suite' }
        ],
        services: ['Agua', 'Luz', 'Gas', 'Internet', 'Cable', 'Portero', 'Gimnasio', 'Pileta', 'Seguridad 24hs', 'Cochera'],
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
        ]
      }
    ];

    for (const prop of properties) {
      // Insert property
      const [property] = await sql`
        INSERT INTO properties (title, description, square_meters, rental_price, expenses)
        VALUES (${prop.title}, ${prop.description}, ${prop.square_meters}, ${prop.rental_price}, ${prop.expenses})
        RETURNING id
      `;

      console.log(`  ✅ Created: ${prop.title}`);

      // Insert rooms
      for (const room of prop.rooms) {
        await sql`
          INSERT INTO rooms (property_id, title, description)
          VALUES (${property.id}, ${room.title}, ${room.description})
        `;
      }

      // Link services
      for (const serviceName of prop.services) {
        const [service] = await sql`
          SELECT id FROM services WHERE name = ${serviceName}
        `;
        if (service) {
          await sql`
            INSERT INTO property_services (property_id, service_id)
            VALUES (${property.id}, ${service.id})
          `;
        }
      }

      // Insert images (using Unsplash demo images)
      for (let i = 0; i < prop.images.length; i++) {
        await sql`
          INSERT INTO property_images (property_id, cloudinary_url, cloudinary_public_id, display_order)
          VALUES (${property.id}, ${prop.images[i]}, ${'demo_' + property.id + '_' + i}, ${i})
        `;
      }
    }

    console.log('\n✨ Database seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - ${services.length} services`);
    console.log(`   - ${properties.length} properties`);
    console.log(`   - ${properties.reduce((acc, p) => acc + p.rooms.length, 0)} rooms`);
    console.log(`   - ${properties.reduce((acc, p) => acc + p.images.length, 0)} images\n`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
