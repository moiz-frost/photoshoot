# photoshoot
A REST API for photoshoot

## Instructions

Get API token using:
curl -d "<any data>" localhost:3000/<any URI> -X POST | jq
  eg; curl -d "title=mois&abc=xyz" localhost:3000/ -X POST | jq 
  
POST/GET Data using:
curl localhost:3000/<URI> -X <POST/GET> -H "Authorization: Bearer <token>" | jq
