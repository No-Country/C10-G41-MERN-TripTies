## Rutas

### Ruta principal
 http:/localhost:8000/api/v1

- /sign-up
    - post: Crear un nuevo usuario
      
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
        - get: trae informacion del 

- /conversation
    - get: Obtener todas las conversations
    - post: Crear una nueva conversation
        - /:conversationId
            - get: Obtener una conversation por id
            - put: Editar una conversation (arreglar)
            - delete: Borrar una conversacion
                - /messages
                    - post: 

## Middleware Auth
    Revisar seguridad cuando se busca por email, o arreglar busqueda mediante id.
    Hay un problema a la hora de obtener el _id de un usuario. Hay que arreglar dicho problema. Mientras tanto,
    en el middleware se trabajará encontrando usuarios mediante el email, de igual manera en mensajes
    Esto hasta que se encuentre solucion al error. S