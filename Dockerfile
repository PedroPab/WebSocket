# Establecer la imagen base
FROM node:14

# Crear el directorio de la aplicación en el contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto que la aplicación utilizará
EXPOSE 3005

# Comando para iniciar la aplicación
CMD [ "npm", "run", "start" ]