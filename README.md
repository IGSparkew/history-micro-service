# history-micro-service

## Description 

# Input Api 
Gestion de la création d'un user avec une route **/register** 

``` 
{
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
    token: <string>
}
```

l'utilisateur envoie les messages sur **input-api** via **/chatWithUser** POST
``` 
{
    "chat": {
        "content": <string>,
        "id": <string>,
        "ownerId": <string>
    },
    "userId": <string>
}
```
OU

l'utilisateur envoie les messages sur **input-api** via **/chatWithGroup** POST
``` 
{
    "chat": {
        "content": <string>,
        "id": <string>,
        "ownerId": <string>
    },
    "groupId": <string>
}
```

l'utilisateur récupère les messages sur **input-api** via **/findChatUser** POST
``` 
{
    "userId": <string>
}
```

OU

l'utilisateur récupère les messages sur **input-api** via **/findChatGroup** POST
``` 
{
    "groupId": <string>
}
```

Authorization : Bearer token
si token correct **input-api** renvoie dans un token une clé unique propre à elle-même et le userId
**input-api** ->  **gestion-api**
Authorization: token

ensuite **gestion-api** envoie une requête à **input-api** pour vérifier que le userId récupéré existe bien
puis renvoie le résultat de la requête

Schéma : 

entrée utilisateur -> input-api -> gestion-api
                      input-api   <-
                      gestion-api ->
sortie utilisateur <- input-api <-

# Gestion Api

création de message **/user/messages** 
``` 
{
    "chat": {
        "content": <string>,
        "id": <string>,
        "ownerId": <string>
    },
    "userId": <string>
}
```

il renvoie:

``` 
{
    "chat": {
        "id": "64bd00665c2ba37efec835f4",
        "content": "sed dolore nulla anim",
        "ownerId": "64bbedce8b1c688e8dadfe4e"
    }
}
```

création de message pour un group **/group/messages** 
``` 
{
    "chat": {
        "content": <string>,
        "id": <string>,
        "ownerId": <string>
    },
    "groupId": <string>
}
```

il renvoie:

``` 
{
    "chat": {
        "id": "64bd00665c2ba37efec835f4",
        "content": "sed dolore nulla anim",
        "ownerId": "64bbedce8b1c688e8dadfe4e"
    }
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
    groupId: <string>,
    name: <string>
}
```

récupération d'un group **/group** 
``` 
{
    groupId: <string>
}
```

il renvoie:

``` 
{
    groupId: <string>,
    name: <string>
}
```

## Description Technique 

- 2 API en NestJS
- GRPC communication
- JWT 
- Mongo db Base de donnée avec dockerisation

# Inputs
## Input-api
### Routes GRPC
- Login
- Register
- CheckUser
- chatWithUser
- chatWithGroup
- findChatUser
- findChatGroup

## Gestion-api
### Routes GRPC
- createChatWithUser
- createChatWithGroup
- findChatWithUser
- findChatWithGroup
- createGroup
- findGroup
- findAllGroup
