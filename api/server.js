import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { Neo4jGraphQL } from "@neo4j/graphql";
import cors from 'cors';
import neo4j from 'neo4j-driver';

const app = express();

const corsOptions = {
	origin: '*',
	credentials: true,
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
};

// Apply CORS middleware to allow all origins
app.use(cors(corsOptions));

// Neo4j connection setup
const uri = process.env.NEO4JWAPI_NEO4J || "bolt://127.0.0.1:7687";  // Adjust with your Neo4j instance URI
const user = process.env.NEO4JWAPI_USER || "neo4j";  // Username
const password = process.env.NEO4JWAPI_PWD || "neo4j";  // Password
const port = process.env.NEO4JWAPI_PORT || 8086

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


// Example type definitions and resolvers using Neo4j
const typeDefs = `#graphql
	type User {
		uuid: ID! @id
		fullName: String
		nickname: String
	}

	###### Custom Queries ######
	type Query {
		me: User
	}
`;

// Pass our GraphQL type definitions and Neo4j driver instance.
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
	schema: await neoSchema.getSchema(),
	cors: corsOptions
});
await server.start()

server.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
