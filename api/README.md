## Rutas

### Ruta principal
 http:/localhost:8000/api/v1

- /sign-up
    - post: Crear un nuevo usuario

      Tarea: Hay que hashear el password
      
- /login
    - post: Logea al usuario, Devuelve token de inicio de sesion

- /users
    - get: Muestra todos los usuarios. (Opcion unicamente para admins)
- /user
    - /:userId
        - get: Trae información del perfil del usuario
        - delete: elimina usuario
    - /:userId/profiles 
        - put: edita información del perfil
        - get: trae informacion del perfil
