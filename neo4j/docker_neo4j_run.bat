docker build -t neo4jwapi-neo4j4 .
docker run -d -p 7474:7474 -p 7687:7687 --name neo4jwapi-neo4j4-container neo4jwapi-neo4j4
