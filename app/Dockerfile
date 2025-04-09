# Establece la imagen base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el proyecto
RUN npm run build

# Expon el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Ejecuta la aplicación
CMD ["npm", "start"]
