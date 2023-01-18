# Journal App
## Instalacion de Material UI 
Box es como un div y Grid te permite ordernar y contener secciones como bootstrap.<br>
[Pagina Oficial Material UI](https://mui.com/material-ui/getting-started/installation/)

```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

Importar Tipografia Roboto en index.html
```
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Instalacion de Redux Toolkit y React-Redux
[Documentacion e Instalacion de Redux Toolkit y React-Redux](https://redux-toolkit.js.org/introduction/getting-started)
```
npm install @reduxjs/toolkit react-redux
```

## Firebase (version Modular)
* [Como actualizar a Firebase 9 Version Modular](https://firebase.google.com/docs/web/modular-upgrade)
* [Pagina Oficial Firebase](https://firebase.google.com/)

Si se utiliza la autenticacion de firebase, o cualquier servicio de firebase, hay que instalar firebase

1. Ir al a consola de Firebase
2. Crear un proyecto
3. Al finalizar, `escoger que el proyecto será web`
4. Registramos el nombre del proyecto
5. Instalamos Firebase o Agregar el SDK de Firebase: 
```
npm install firebase
```
6. Crear el archivo `firebase/config.js`
   * Pegamos la configuracion de Firebase
   * Añadimos la configuracion necesaria

## Firebase Authentication
[Documentacion de Firebase Authenticaction con Javascript](https://firebase.google.com/docs/auth/web/google-signin)

1. Ir al a consola de Firebase
2. Seleccionar proyecto
3. Ir a `Authentication`
   * Clic en `Comenzar`
4. Marcar los proveedores que se van usar para la autenticacion en la aplicacion
   * Habilitar Correo y contraseña
   * Clic en `Agregar nuevo proveedor`
   * Habilitamos Google y `seleccionamos nuestro correo personal como correo de asistencia`
   * Para agregar más opciones de autenticacion, hacer clic en agregar nuevo proveedor
5. Crear el arcchivo `firebase/providers.js`
   * Configuracion de autenticacion
6. Configuracion en el archivo `store/auth/thunks.js`
   * startGoogleSignIn => SignInWithGoogle
7. Configuracion en el archivo `store/auth/authSlice.js`

## Firestore o Cloud Firestore

1. Ir al a consola de Firebase
2. Seleccionar proyecto
3. Ir a Cloud Firestore
   * Clic en `Comenzar`
   * Iniciar en modo de produccion
   * Seleccionar ubicacion de la base de datos
4. Configuracion en el archivo `store/journal/thunks.js`
5. Configuracion en el archivo `store/journal/journalSlice.js`
6. Configuracion en el archivo `journal/pages/JournalPage.jsx`
7. En las reglas de Firestore modificar/actualizar:
   * `allow read, write: if request.auth != null;`
   * Publicar reglas

## Sweet Alert 2
Mensajes de alerta [Pagina Oficial](https://sweetalert2.github.io/)
```
npm install sweetalert2
```
Añadir libreria de css donde se utilice
```
import 'sweetalert2/dist/sweetalert2.css';
```

## Cloudinary
Es un servicio que permite Alojar imagenes y videos [Pagina Oficial de Cloudinary](https://cloudinary.com/)
1. Crear una cuenta / Iniciar sesion
2. Configuracion
   * Ir a Upload
   * Buscar Upload presets
   * Clic en Add upload preset
   * Colocamos nombre al preset (ej: react-journal)
   * Signing Mode: Unsigned
   * Establecer nombre a Folder: journal
   * Dejar el resto por Default y Guardar
3. En Media Library (biblioteca) se deben subir las imagenes

## Peticiones HTTP - API 
POST
```
https://api.cloudinary.com/v1_1/cloudName/upload

https://api.cloudinary.com/v1_1/app-react-jasr/upload
body {
   file: imagen
   upload_preset: react-journal
}
```
[Eliminar Imagen de Clooudinary al eliminar Nota](https://www.udemy.com/course/react-cero-experto/learn/lecture/20205002#questions/18730056)
## Validar formularios (NO SE APLICO EN ESTE PROYECTO)
[Validar formularios en React](https://www.npmjs.com/package/validator)
```
npm install validator
```