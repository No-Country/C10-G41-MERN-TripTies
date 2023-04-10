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
        - patch: With token sent to email, redirects via link and performs password change. //FIX

- /users
    - get: Displays all users (option only for admins).

    - /:userId
        - get: Get user profile information
        - delete: delete user // Deletes user, but not the profile.

    - 
- /profiles 
    - get: Show all profiles,

    - /:userId 
        - get: Get user by profile id
        - put: Edit profile info

    - /:userId/following/:followingId
        post: Follow a user
 

- /conversations
    - get: Get all conversations
    - post: Create a new conversation 
        - /:conversationId
            - get: Get a conversation by id
            - put: Edit a conversation // FIX Doesn't work yet
            - delete: Delete a conversation 
                - /messages
                    - post: Post new message 

- /follow //FIX GET FOLLOWS
    - /:userId/followers  
        - get: All my followers
    - /:userId/following
        - get: Everyone I follow 


- /posts
    - post: Create new post
    - get: Get all posts
    
    - /postId: 
        - get: get a post by id
        - put: Edit a post by Id //FIX
        
        - /like
            - post: Like a post