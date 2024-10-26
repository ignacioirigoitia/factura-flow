# Descripción



## Correr en dev

1. Clonar el repositorio
2. Crear una copia del archivo ```.env.template``` y renomblarlo a ```.env```
3. Cambiar las variables de entorno
4. Instalacion de dependencias ```npm install```
5. Levantar la base de datos ```docker compose up -d```. verificar que el puerto este libre
6. Correr las migraciones de Prisma ```npx prisma migrate dev```
7. Ejecutar el seed ```npm run seed```
8. Correr el proyecto ```npm run dev```





## Correr en prod