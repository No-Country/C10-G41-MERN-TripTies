## API TRIP TIES
TRIP-TIES: Social Network focused on travelers 🚗✈🚢 

This database was developed with NodeJS v-18.13. The diagram was created using dbdiagram, then in VSC we started using Express and MongoDB with mongoose to call the database. We also used libraries like bcrypt for password encryption, nodemailer for email sending, multer for file management. The authentication was done with passport JWT. Best practices were also handled with eslint. A challenge for the backend team since it was our first opportunity to work with non-relational databases. We had the opportunity to learn more in depth and thanks to bugs, understand the code better. 


### Routes ↔

#### Main path: http:/localhost:3000/api/v1

- /auth
    - /sign-up
        - post: Create a new user
    - /login
        - post: Log the user in, returns login token
    - /recovery-password
        - post: Password recovery via token and email. 
    - /recovery-password/:id
        - patch: With token sent to email, redirects via link and performs password change. 
- /users
    - get: Displays all users (option only for admins).

- /user
    - /:userId
        - get: Get user profile information
        - delete: delete user // Deletes user, but not the profile.
    - /:userId
        - /following 
            - /followingId
                post: Follow a user
- /profiles 
    - get: Show all profiles, // FIX does not show user info
    - /:profileId 
        - get: Get user by profile id
        - /editProfile
            - put: Edit profile info, //FIX: Do not save changes. 
- /conversations
    - get: Get all conversations
    - post: Create a new conversation 
        - /:conversationId
            - get: Get a conversation by id
            - put: Edit a conversation // Doesn't work yet
            - delete: Delete a conversation 
                - /messages
                    - post: Post new message 

- /follows
    - get: All my followers
    - get: Everyone I follow 