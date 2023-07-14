# history-micro-service

## Description 

# Input Api 
Gestion de la création d'un user avec une route **/register** 

``` 
{
    user_id: <number>,
    username: <string>,
    password: <string>
}
```
Gestion du user_token avec une route **/login**

```
{
    username: <string>,
    password: <string>
}
```
il renvoie :

```
{
    token_user: <string>
}
```

l'utilisateur envoie les messages sur **input-api** via **/messges** POST
``` 
{
    content: <string>,
    user_id: <number>
  
}
```
Authorization : Bearer token_user
si token correct  
**input-api** ->  **gestion-api**
Authorization: token_api
meta-data: token_user

# Gestion Api

création de message **/user/messages** 
``` 
{
    content: <string>,
    owner_id: <number>,
    user_id: <number>
  
}
```

il renvoie:

``` 
{
    id: <number>,
    content: <string>
  
}
```

création de message pour un group **/group/messages** 
``` 
{
    content: <string>,
    owner_id: <number>,
    group_id: <number>
  
}
```

il renvoie:

``` 
{
    id: <number>,
    content: <string>,
    group_id: <number>
  
}
```

création d'un group **/group** 
``` 
{
    name: <string>
}
```

il renvoie:

``` 
{
    id: <number>,
    name: <string>
}
```

récupération d'un group **/group** 
``` 
{
    id: <number>
}
```

il renvoie:

``` 
{
    id: <number>,
    name: <string>
}
```

## Description Technique 

- 2 API en NestJS
- GRPC communication
- JWT 
- SSL
- Health check
- Mongo db Base de donnée avec dockerisation

## Inputs
# Input Auht



### Routes GRPC

- Login
- Register
