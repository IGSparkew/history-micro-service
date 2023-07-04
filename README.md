# history-micro-service

## Description 

- Deux API
- une en entrée qui gère des inputs de personnages ou de contexte
- ensuite elle se connecte à l'autre API via JWT token 
- L'API de gestion génère une histoire zt retourne par JWT token
- Puis Afficher à l'utilisateur

## Description Technique 

- 2 API en NestJS
- GRPC communication
- JWT 
- SSL
- Health check
- Mongo db Base de donnée 

## Inputs
# Input Resources

Tags:

{
    'user_id':<number>,
    'tag':<string>,
    'lore': <string>,
    'sub_tag':<boolean>,
    'is_begin': <boolean>,
    'is_end': <boolean>
}

Character:

{
    'first_name': <string>,
    'last_name': <string>,
    'job': <string>,
    'description': <string>,
    'description_job': <string>,
    'equipement': <List>
}

# Input Histories

{
    hero: <number>,
    secondary: <number>, 
    tags: <List>,        
}

## API Rules

- reserved tags predef in mongo 
- sub_tag don't call tag except reserved tags  
- during story creation we save tag to reused them
- we can used only tags we create 
- can't create tags with name of reserved tags
- input api get charcter and save them in mongo
- gestion api create histories ressources 
- gestion api manage text creation 
- we can't create histories with his tags in lores   

### Routes GRPC

- Login
- Register
- CreateCharacter
- CreateTags
- CreateHistories
