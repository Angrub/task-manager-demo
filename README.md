# Task manager - REST API
---
Ejemplo de REST API para la gestión de tareas. Sesiones sin autenticación.

---
## Dependencias
### Docker
Por practicidad en el desarrollo del proyecto, se montó la base de datos en un contenedor de docker. Cabe remarcar que no es un requisito obligatorio el uso de [docker](http://https://www.docker.com/get-started/ "docker") para probar la REST API.

### Node.js
La versión de node requerida e la 18.14.0.

## Iniciar proyecto
Para iniciar el proyecto deberá seguir estos sencillos pasos:
1. Instalar dependencias
2. Configurar variables de entorno.
3. Encender base de datos.

### Instalar dependencias

Posiciónese en el directorio raíz del proyecto y ejecute el siguiente comando:

```bash
$ npm install 
```

### Variables de entorno
En la raíz del directorio encontrará un archivo llamado `.env-example`, este contiene todas las variables de entorno necesarias. Basado en ese archivo, genere un archivo `.env` con las mismas variables.
> Si bien no es buena práctica que nuestro backend utilice la contraseña root para conectarse a la base de datos, para mantener sencilla la configuración en este proyecto se usará.

### Iniciar proyecto
Para levantar el backend y la base de datos corra los siguientes comandos en la raíz del proyecto:

```bash
$ sudo docker-compose --env-file .env up 
$ npm start
```
---

## Estructura
El servidor http se inicializa en el archivo  `index.ts` del directorio `api/`. Este es extendido por los módulos en el subdirectorio `modules`.

### Módulos
Únicamente se cuenta con 2 modulos, *tasks* y *sessions*. los cuales están compuestos por tres archivo que se reparten las siguientes resposabilidades: 
- **.routes:** manejo de rutas y validación.
- **.service:** lógica de negocio.
- **.storage:** almacenamiento.
```
modules
└── tasks
    ├── tasks.routes.ts
    ├── tasks.service.ts
    └── tasks.storage.ts
```
### Manejo de errores, librerías e interfaces
Para el manejo de errores se utiliza el middleware `errorHandler.ts` ubicado en el subdirectorio `libs`. También en ese mismo directorio encontrará una pequeña librería para la validación de datos provenientes del *body*, *params* y *query params*.

Las interfaces se encuentran en el subdirectorio con el mismo nombre. Para este proyecto, tienen como ultilidad definir el comportamiento del componente de storage y definir la estructura de las entidades.


---

## Documentación
La documentación de los endpoints de la API REST puede ser consultada desde el mismo proyecto en la ruta:
`/docs`