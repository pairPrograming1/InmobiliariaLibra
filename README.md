# InmobiliariaLibra 🏢

Sistema de gestión de propiedades en alquiler con integración de seguros de caución.

## Características

- 📋 Listado y gestión de propiedades
- 🖼️ Galería de imágenes con Cloudinary
- 📄 Generación de contratos en PDF
- 🛡️ Integración con Libra Seguros (cotización de seguros de caución)
- ✏️ CRUD completo (crear, editar, eliminar propiedades)
- 📱 Diseño responsive
- 🎨 UI moderna con Shadcn/UI y Tailwind CSS

## Stack Tecnológico

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Database**: PostgreSQL (local) / Neon (production)
- **ORM**: SQL template literals con drivers nativos
- **Images**: Cloudinary
- **Deployment**: Vercel

## Configuración Local

### Prerequisitos

- Node.js 18+
- PostgreSQL (local) o cuenta Neon
- Cuenta Cloudinary

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/pairPrograming1/InmobiliariaLibra.git
cd InmobiliariaLibra
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env.local` en la raíz:

```env
# Database (local PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/inmobiliaria

# Cloudinary (para subir imágenes)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Inicializar base de datos:
```bash
# Crear schema (tablas, índices, servicios por defecto)
node scripts/setup-db.js
```

5. (Opcional) Poblar con datos demo:
```bash
node scripts/seed-neon.js
```

6. Iniciar servidor de desarrollo:
```bash
npm run dev
```

Visitar [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

```bash
npm run dev          # Modo desarrollo (Turbopack)
npm run build        # Build de producción
npm start            # Servidor de producción
npm run lint         # Linter
```

## Estructura del Proyecto

```
InmobiliariaLibra/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin UI (crear/editar)
│   ├── api/                 # API routes
│   ├── propiedades/         # Listado y detalle
│   └── layout.tsx           # Layout principal
├── components/              # Componentes React
│   ├── ui/                  # Shadcn/UI components
│   ├── property-card.tsx    # Tarjeta de propiedad
│   ├── property-form.tsx    # Formulario crear/editar
│   └── image-gallery.tsx    # Galería de imágenes
├── lib/                     # Utilidades
│   ├── db.ts                # Cliente de base de datos
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Helpers
├── scripts/                 # Scripts de setup
│   ├── setup-db.js          # Crear schema
│   └── seed-neon.js         # Seed datos demo
└── public/                  # Assets estáticos
```

## Deployment en Vercel

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

Resumen rápido:
1. Crear base de datos en Neon
2. Ejecutar `setup-db.js` con DATABASE_URL de Neon
3. Conectar repo en Vercel
4. Configurar variables de entorno en Vercel
5. Deploy automático

## Licencia

MIT

## Contacto

Desarrollado por [pairPrograming1](https://github.com/pairPrograming1)
