# history-micro-service

## Description 

- Deux API
- une pour l'authentification avec jwt
- L'autre API de chat 

## Description Technique 

- 2 API en NestJS
- GRPC communication
- JWT 
- SSL
- Health check
- Mongo db Base de donnée avec dockerisation

## Inputs
# Input Auht

Login {
    user: <string>,
    password: <string>
}

Register {
    user: <string>,
    password: <string>
}

# Input Chat

message {
    message: <string>,
    group_chat: <number>
}

message {
    message: <string>,
    user_id: <number>
}

group_chat: {
    name: <string>
}


### Routes GRPC

- Login
- Register
- GetUserId
- Chat 
- CreateGroupChat
- PostGroupChat 
