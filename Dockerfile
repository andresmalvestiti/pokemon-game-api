# Dockerfile
FROM node:20

# Instalar netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Copiar el script de inicialización
COPY init.sh .

# Dar permisos de ejecución al script
RUN chmod +x init.sh

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar el script de inicialización
CMD ["./init.sh"]

