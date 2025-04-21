# TITAN

TITAN es un arquetipo que fue generado sin lógica de negocio por lo que puede aplicarse en cualquier escenario donde se necesite un aplicativo frontend web con Angular.

## Configuración Local

Para realizar la configuración del repositorio e instalación de los paquetes utilizados por el mismo, se deben seguir los siguientes pasos:

- Extraer el repositorio en una ruta adecuada destinada para él.
- Abrir la carpeta con un editor de texto, se recomienda el IDE de Visual Studio Code.
- Ejecutar el comando siguiente comando para descargar los paquetes y dependencias, tal como se visualiza:

```bash
npm install
```

![Audience](/assets/VisualStudioNpmInstall.png)

- Finalizando la instalación de los paquetes, se puede levantar el sitio ejecutando el comando:

```bash
npm start
```

![Audience](/assets/VisualStudioNgServe.png)

- Finalizando el comando, el sitio se encontrará disponible en:

```bash
http://localhost:4200
```

![Audience](/assets/VisualStudioLocalHost.png)

- Al iniciar la aplicación en http://localhost:4200, automáticamente se realiza un redirect al servidor Keycloak Axity, tal como se visualiza:

![Audience](/assets/AplicacionLogin.png)

```bash
Nota: Es importante considerar que la app es dependiente de la conexión servidor Keycloak de Axity, disponible en la siguiente dirección: https://keycloak.axity.com/auth/. O bien realizar la configuración de un servicio Keycloak local, documentado en la sección Configurar Servicio Keycloak
```

- Para poder acceder a la aplicación con el servidor Keycloak Axity, se deben utilizar las siguientes credenciales predeterminadas:

```bash
user: prueba
password: prueba
```

Visualizándose el Home de la Aplicación:

![Audience](/assets/AplicacionLogin.png)

## Configurar servicio Keycloak

Para configurar un servicio local de Keycloak se utiliza Docker para instalarlo. Una vez instalado Docker, abrir una terminal y ejecutar el siguiente comando:

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:20.0.3 start-dev
```

![Audience](/assets/DockerKeycloak.png)

Finalizando la descarga de la imagen con los parámetros indicados, se puede acceder desde el navegador a la consola de administración de keycloak, con los siguientes datos:

```bash
url: http://localhost:8080/admin/master/console/
user: admin
password: admin
```

Se visualizará la siguiente pantalla, de la instancia de Keycloak corriendo de manera local:

![Audience](/assets/KeycloakAdmin.png)

El siguiente paso es crear un Realm

- Dar clic en Create Realm
- Asignar un nombre (para este ejemplo pruebarealm)
- Dar clic en Create

Tal como se visualiza:

![Audience](/assets/KeycloakRealm.png)

Seleccionar el elemento creado Pruebarealm, y realizar los siguientes pasos:

- Dar click en clients -> create client

![Audience](/assets/KeycloakClient.png)

- Se visualiza la siguiente pantalla para la creación del Cliente, se llena la información solicitada y se selecciona la opción Next, tal como se visualiza:

![Audience](/assets/KeycloakAdminInformacion.png)

- Para la configuración local necesitada y para las pruebas que se realizan, se respeta la información mostrada por default en la siguiente pantalla y se selecciona la opción Save

![Audience](/assets/KeycloakClientSave.png)

- Despues de crear el cliente, ir al apartado de Acces settings y en Root URL agregar la siguiente ruta http://localhost:4200/_, en Valid redirect URIs http://localhost:4200/, en Web origins colocar _ y dar click en Save.

![Audience](/assets/KeycloackAccessSettings.png)

- El siguiente paso es ir al apartado de Users y crear un usuario

![Audience](/assets/KeycloackUsers.png)

- Agregamos el nombre del usuario y los demas campos los dejamos por default

![Audience](/assets/KeycloackUserCreate.png)

- Al crear el usuario nos abrira el apartado de configuracion del usuario y nos dirigimos al apartado de Credentials y seleccionamos Set password

![Audience](/assets/KeycloackUserSetPassword.png)

- Agregamos la contraseña que deseemos y le damos click en Save

- En el repositorio de TITAN nos dirigimos al archivo de enviroment.ts dentro de la carpeta situada en src/enviroments, en la constante de keycloak modificamos el url por 'http://localhost:8080/', en realm y en cliente id agregamos los que creamos en keycloack

![Audience](/assets/VisualStudioEnvironments.png)

- Por ultimo levantamos la aplicacion con 'ng serve' y en usuario y contraseña agregamos el que creamos
  en keycloack.

## Páginas de Ejemplo

TITAN incorpora varias páginas ejemplo, que se visualizan a continuación:

## Demo Colores

Pantalla ejemplo que muestra la funcionalidad de invocar un servicio Rest para consulta de información y visualizarla en forma de tabla, tal como se visualiza:

![Audience](/assets/AplicacionColores.png)

Adicional, expone un icono que permite visualizar detalles del elemento seleccionado:

![Audience](/assets/AplicacionColoresDetalle.png)

## Demo SSE

Pantalla que muestra la funcionalidad de consumir un servicio Rest, enviando los valores capturados en el formulario como parámetros, esperando y mostrando el resultado:

![Audience](/assets/AplicacionSse.png)

## Demo Usuario

La pantalla Usuarios, es un DEMO de las operaciones CRUD que se pueden realizar, contiene la estructura de componentes para ejemplificar la funcionalidad

### Consulta, Creación, Edición y Eliminación

![Audience](/assets/AplicacionUsuarioCrud.png)

### Nuevo

Se ejemplifican validaciones de campos del formulario

![Audience](/assets/AplicacionUsuarioNuevo.png)

### Edición

![Audience](/assets/AplicacionUsuarioEdicion.png)

## Demo Panel

Pantalla que muestra la funcionalidad para la visualización de diversos tipos de gráficas

![Audience](/assets/AplicacionGraficas.png)

## Funcionalidades adicionales

### Idiomas

Opción que permite realizar la configuración de textos entre idiomas (Inglés – Español).

### Español

![Audience](/assets/AplicacionIdiomaEspanol.png)

### Inglés

![Audience](/assets/AplicacionIdiomaIngles.png)

## Temas

Opción de elegir el tema previamente configurado

### Default

![Audience](/assets/AplicacionTemaDefault.png)

### Dark

![Audience](/assets/AplicacionTemaDark.png)

### Axity

![Audience](/assets/AplicacionTemaAxity.png)

## Ejecución de pruebas unitarias

TITAN viene preconfigurado con pruebas unitarias realizadas con [Jasmine](https://jasmine.github.io/) y ejecutables con [Karma](https://karma-runner.github.io/latest/index.html), en el archivo llamado karma.conf se encuentran las configuraciones necesarias para su ejecución.

Para ejecutar las pruebas unitarias existentes en el proyecto es necesario ejecutar el comando

```bash
ng test
```

Lo que ejecutara las unitarias en un navegador chromium controlado por karma

Una vez ejecutadas las pruebas unitarias veremos los siguientes resultados

- Consola de ejecución exitosa

![Audience](/assets/AplicacionUnitTests.png)

- Pantalla del navegador con los casos de prueba ejecutados y el reporte de Karma

![Audience](/assets/AplicacionKarmaResultados.png)

## Sonar

Como parte de las certificaciones de calidad TITAN ha pasado por el proceso de análisis de Sonar Qube en el cual se denotan los siguientes resultados:

![Audience](/assets/AplicacionSonar.png)

## User Credentials for Axity Keycloak

User: front-user
Password: Axity2021

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
