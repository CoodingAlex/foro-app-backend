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

      [
          data: {
              id: ObjectId,
              content: "text",
              title: "text",
              author: User
          },
          message:"posts getted"
      ]

## Post

### /api/post

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

### /api/auth/login

### You should send the credentianls by the basic auth

- Response 200 (application/json)

      {
        data:{
          token: JWT
        }
      }
