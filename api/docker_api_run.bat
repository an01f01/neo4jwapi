docker build -t neo4jwapi-api .
docker run -d -p 4000:4000 -p 8085:8085 --name neo4jwapi-api-container neo4jwapi-api
