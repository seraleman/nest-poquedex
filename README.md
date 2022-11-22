<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo

1.  Clonar el repositorio
2.  Ejecutar

```
yarn install
```

3.  Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4.  Levantar la base de datos

```
docker-compose up -d
```

5. Clonar el archivo `.env.template` y renombrar la copia a `.env`

6. Llenar las variables de entorno definidas en el `.env`

7. Ejecutar la aplicación en desarrollo

```
yarn start:dev
```

8. Reconstruir la base de datos con la semilla  
   **POST**

```
http://localhost/api/v2/seeds
```

## Stack usado

- MongoDB
- Nest
