# prueba-wtw
Sistema de registro y autenticación de usuarios implementando toke JWT 

## Comenzando

Estas instrucciones te permitirán despleguar el proyecto en tu maquina

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (v18.16.0 que incluye npm)
- [Angular CLI](https://angular.io/cli) versión 16.2.0
- [SQL Server](https://dev.mysql.com/downloads/mysql/) (o cualquier base de datos que estés utilizando)

### Instalación

Sigue estos pasos para configurar tu entorno de desarrollo.

# Asegúrate de que SQL Server esté instalado y en funcionamiento
# Crea una nueva base de datos utilizando su amdnistrador SQL  o la línea de comandos
# Ejecuta el script SQL proporcionado o utiliza las migraciones de Entity Framework para crear las tablas


#### Backend (.NET 6.0)

```bash
# Clona el repositorio del backend
git clone https://github.com/JeisonArturoVargas/prueba-wtw.git

# Navega a la carpeta del proyecto backend
cd prueba-wtw/Back-prueba-wtw

# Restaura los paquetes NuGet
dotnet restore

# Actualiza la cadena de conexión a la db en el archivo appsettings.json
nano appsettings.json 

# Ejecuta las migraciones para configurar la base de datos
dotnet ef database update

# Inicia el servidor de desarrollo
dotnet run
```

#### Frontend (Angular 16.2.0)
```bash
# Clona el repositorio del frontend
git clone https://github.com/JeisonArturoVargas/prueba-wtw.git

# Navega a la carpeta del proyecto frontend
cd prueba-wtw/Front-prueba-wtw

# Instala las dependencias con npm
npm install o yarn install

# Configura el archivo environment.ts con la URL del backend
nano src/environments/environment.ts 

# Ejecuta el servidor de desarrollo
npm start o yarn start
```
