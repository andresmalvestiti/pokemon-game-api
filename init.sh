#!/bin/sh

# Esperar a que el servicio de la base de datos esté disponible
echo "Waiting for database to be ready..."
while ! nc -z db "$PG_PORT"; do
  sleep 1
done

echo "Database is ready!"

# Aplicar migraciones de Prisma
npx prisma migrate deploy

# Generar el cliente Prisma
npx prisma generate

# Iniciar la aplicación
npm run dev
