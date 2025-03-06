# Etapa 1: Construcción del proyecto
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./ 

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Eliminar dependencias de desarrollo para optimizar el tamaño final
RUN npm prune --production

# Etapa 2: Configuración del entorno de producción
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios del paso anterior
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Exponer el puerto en el que corre Next.js (por defecto 3000)
# EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
