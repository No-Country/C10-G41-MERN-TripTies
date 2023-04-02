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
        - delete: elimina usuario //Fix que el usuario unicamente pueda eliminar cuenta
    - /:userId/profiles 
        - put: edita información del perfil // Fix que unicamente el user pueda editar sus datos
        - get: trae informacion del 

- /conversation
    - get: Obtener todas las conversations // Fix todos solo user ve sus conversations
    - post: Crear una nueva conversation // Para probar, unicamente funciona desde conversation.service
        - /:conversationId
            - get: Obtener una conversation por id
            - put: Editar una conversation // Aún no funciona
            - delete: Borrar una conversacion //Fix solo user puede eliminar
                - /messages
                    - post: Postea nuevo mensaje //Fix que solo el user logeado pueda enviar //Revisar validación participantes (service and middleware)

- /follows