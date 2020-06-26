# foro-app-backend

### Basic routes

FORMAT: 1A

# Encuestas

Encuestas es una API que permite a los clientes ver encuestas y votar en ellas.

# Endpoints

## /api/posts

## /api/users

# Methods

## Get

### /api/posts

- Response 200 (application/json)

      {          data: [
              id: ObjectId,
              content: "text",
              title: "text",
              author: User
          ],
          message:"posts getted"
      }

### /api/posts/:postId

- Response 200 (application/json)

      {
          data: {
              id: ObjectId,
              content: "text",
              title: "text",
              author: User
          },
          message:"post getted"
      }

### /api/comments/post/:postId -> get comments by post

- Response 200 (application/json)

      {
        "message": "comments getted",
        "data": [
          {
              id: ObjectId,
              content: "text",
              title: "text",
              author: User
          },
          ...
        ]
      }

### /api/comments/:commentId -> get comments by post

- Response 200 (application/json)

      {
        "message": "comments getted",
        "data": {
              id: ObjectId,
              content: "text",
              title: "text",
              author: User,
              post: PostId
          },
      }

## Post

### /api/posts

#### You should have a valid JWT in your cookies

- body

      {
        content:"text",
        title:"text"
      }

- Response 201 (application/json)

      {
        "data": {
          "title": "text",
          "id": ObjectId
        },
        "message": "post created"
      }

### /api/comments/post/:postId -> Create a comment into a post

### You should have a JWT

#### if the authentication methods are not implemented, put an author field in the body

- body

      {
        "content": "text",
        "title": "text"
      }

* Response 200 (application/json)

      {
        "message":"post created",
        "data": {
          "content": "text",
          "author": User,
          "title": "text",
          "post": "text",
          "_id": Id
        }
      }

### /api/auth/login -> not implemented yet

### You should send the credentianls by the basic auth

- Response 200 (application/json)

      {
        data:{
          token: JWT
        }
      }

## Put

### /api/comments/:commentId

- Body

      {
        ...content for change
      }

- Response 200 (application/json)

      {
        message: "message updated"
        data:{
              id: ObjectId,
              content: "text",
              title: "text",
              author: User,
              post: PostId
          },
      }

### /api/posts/:postId

- Body

      {
        ...content for change
      }

- Response 200 (application/json)

      {
        message: "post updated"
        data:{
              id: ObjectId,
              content: "text",
              title: "text",
              author: User,
          },
      }

## Delete

### api/comments/:commentId

- Response 200 (application/json)

      {
        message: "comment deleted"
        data: ID
      }

### api/posts/:postId

- Response 200 (application/json)

      {
        message: "post  deleted"
        data: ID
      }
