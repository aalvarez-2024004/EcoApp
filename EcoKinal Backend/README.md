# EcoKinal
Proyecto de reciclaje llamado EcoKinal desarrollado en Node.js || IN6BM

# INTRUCCIONES AUTENTICACION DE USUARIO - AuthEcoKinal
1er paso - Ubicarse dentro de la terminal 1 y situarse en la carpeta AuthEcoKinal por medio del siguiente comando : cd AuthEcoKinal

2do paso - Estando ahi, realizar el comando: pnpm install nodemon

ANTES DE CONTINUAR, IMPORTANTE: 
	ES IMPORTANTE QUE TENGA ABIERTO docker desktop y asi mismo, pgAdmin

3er paso - Ejecutar en la terminal 1 el siguiente comando : pnpm add -D cross-env

4to paso - Ejecutar en la terminal 1 el siguiente comando :  "docker compose up --build" y luego "docker compose up -d"

5to paso - Verificar en docker-desktop que el contenedor se haya inicializado 
correctamente y este activo

6to paso - En pgAdmin, debe crear un servidor llamado AuthEcoKinal, ahi mismo debe irse al apartado de Connection y colocar: 

    6.1 Host name / address: localhost

    6.2 Port / 5436

    6.3  Maintenance database AuthEcoKinal

    6.4 Username / root

    6.5 Password / admin

    6.6 Ingresar al servidor y activar la base de datos llamada AuthEcoKinal (con owner root)

8vo paso - Realizar el siguiente comando para correr el programa: pnpm run dev

7mo paso - Probar las peticiones en PostMan:

Puede abrir postman, e importar el archivo JSON donde se encuentran todos los endpoints, el archivo JSON lo puede encontrar en la ruta:  C:GestorDeOpiniones-main\ArchivoJSONpostMan
Nombre del archivo: EcoKinal Copy.postman_collection.json

# INSTRUCCIONES PARA DETECTAR UNA IMAGEN - DetectorDeReciclaje

1er paso - Abrir una nueva terminal y situarse en la carpeta DetectorDeReciclaje por medio del siguiente comando : cd DetectorDeReciclaje

2do paso - Estando ahi, realizar el comando: pnpm install 

3er paso - Realizar el siguiente comando para correr el programa: pnpm run dev

**IMPORTANTE: El módulo AuthEcoKinal debe estar en ejecución, ya que el sistema requiere autenticación mediante token**

4to paso - Probar las peticiones en Postman que se encuentran en la carpeta llamada ArchivosJSONpostMan
y dirigirse hacia la carpeta llamada: ClasificarImagen 

5to paso - Probar los endpoints desde la documentación interactiva de Swagger.

    Debe dirigirse a su navegador de confianza y pegar esta URL: http://localhost:3007/api-docs
    
    1. Para probar el endpoint debes iniciar sesion en AuthEcoKinal
    2. Copiar el token que se genera al iniciar sesión
    3. En Swagger, presionar el botón Authorize.
    4. Pegar el token en formato: Bearer TU_TOKEN_AQUI
    5. Presionar Try it out para ejecutar la petición.

**Los formatos permitidos son: .JPEG, .JPG y .PNG**

# INSTRUCCIONES DE FOROECOKINAL
1er paso - Abrir una terminal nueva y situarse en la carpeta del proyecto con el comando: "cd ForoEcoKinal"

2do paso - Instalar dependencias del proyecto: pnpm install

3er paso - Iniciar el programa con el siguiente comando: pnpm run dev

**IMPORTANTE: El módulo AuthEcoKinal debe estar en ejecución, ya que el sistema requiere autenticación mediante token**

4to paso - Probar las peticiones en PostMan que se encuentran en la carpeta llamada ArchivosJSONpostMan y dirigirse hacia la carpeta llamada: ForoEcoKinal.

5to paso - Probar los endpoints desde la documentación interactiva de Swagger.

    Debe dirigirse a su navegador de confianza y pegar esta URL: http://localhost:3006/api-docs
    
    1. Para probar el endpoint debes iniciar sesion en AuthEcoKinal
    2. Copiar el token que se genera al iniciar sesión
    3. En Swagger, presionar el botón Authorize.
    4. Pegar el token en formato: Bearer TU_TOKEN_AQUI
    5. Presionar Try it out para ejecutar las peticiones.
    
# INSTRUCCIONES DE GAMIFICACION
Abrir una terminal nueva y entrar en la carpeta del proyecto con el comando: "cd GamificacionEcoKinal"

Instalar dependencias del proyecto: pnpm install

Verificar que tengas tu archivo .env con las configuraciones correctas.

Iniciar servidor de Gamificación: pnpm run dev

Por defecto, corre en http://localhost:3008

Debes ver en la consola:
MongoDB | conectado a MongoDB
GamificationEcoKinal corriendo en puerto 3008

Probar los endpoints desde Swagger:
http://localhost:3008/GamificationEcoKinal/v1/docs

1. Primero inicia AuthEcoKinal y obtén el token JWT.
2. En Swagger, presionar el botón Authorize.
3. Pegar el token en formato: Bearer TU_TOKEN_AQUI
4. Clasifica una imagen en DetectorDeReciclaje para que los puntos se sumen automáticamente.
5. Revisa tu perfil con GET /gamification/me para confirmar que los puntos se sumaron.

# INSTRUCCIÓN MAPEADO - MAPA ECO KINAL
1er paso — Ubicarse en la carpeta del proyecto
Abrir una terminal y situarse en la carpeta MapaEcoKinal con el siguiente comando:
cd MapaEcoKinal

2do paso — Instalar dependencias
Estando dentro de la carpeta, ejecutar:
pnpm install

3er paso — Configurar variables de entorno
Verificar que exista el archivo .env en la raíz del proyecto con el siguiente contenido:
ORS_API_KEY=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImExZmQyYWEwNTA0MzQ4ZWI4NzFkMjAyM2I2YmFiOWE4IiwiaCI6Im11cm11cjY0In0=
PORT=3006
# NOTA: El puerto por defecto es 3006. Puedes modificarlo según necesites.

4to paso — Ejecutar el servidor
Correr el servidor en modo desarrollo con:
pnpm run dev
Deberías ver en consola:
Mapa Eco Kinal (API corriendo en puerto 3006)

# INSTRUCCIONES PARA PROBAR EL ENDPOINT
Endpoint disponible:
POST    /api/recycling-centers     Obtiene los 5 centros de reciclaje más cercanos a las coordenadas enviadas.

Cuerpo de la petición (Body - JSON)
{
  "lat": 14.6349,
  "lon": -90.5069
}

# NOTA: Reemplaza lat y lon con las coordenadas de la ubicación que deseas consultar.
Para obtener lat y lon haz lo siguiente: Desde tu navegador abre la consola del navegador (F12 → Console) y escribe:
navigator.geolocation.getCurrentPosition(console.log)
Te devolverá algo como:
coords: {
  latitude: 14.63,
  longitude: -90.50
}

# ERRORES COMUNES
Al ser una api de libre uso (open source) puede que al momento de que muchos usuarios hagan peticiones, exceda el tiempo de espera:
{
    "message": "Error consultando centros",
    "error": "timeout of 20000ms exceeded"
}

También puede dar este error que significa que el servidor de Overpass recibió la petición pero él a su vez no pudo comunicarse con su propio backend, básicamente el servidor está caído o sobrecargado en ese momento.
{
    "message": "Error consultando centros",
    "error": "Request failed with status code 502"
}