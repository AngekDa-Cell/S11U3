# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Habilita el caché para .next y node_modules para optimizar la construcción en futuras ejecuciones
RUN --mount=type=cache,id=s/2d3deff7-5ad0-4947-8505-2fff4b814211-next/cache,target=/app/.next/cache \
    --mount=type=cache,id=s/2d3deff7-5ad0-4947-8505-2fff4b814211-node_modules/cache,target=/app/node_modules/.cache \
    npm run build

# Expón el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]