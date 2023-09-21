import { ApolloServer } from '@apollo/server';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import quieres from './gql/queries/queries';
import postResolver from './gql/type-resolvers/post-resolver';
import commentResolver from './gql/type-resolvers/comment-resolver';
import mutationResolvers from './gql/mutations/mutations';
import { PrismaClient } from '@prisma/client';
import { PostModelsDataSource } from './gql/data-loaders/post-data-loader';
import express from 'express';
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import pkg from 'body-parser';
import { sanitazedString } from './gql/types/sanitazed-string';
const { json } = pkg;
const app = express();
const httpServer = http.createServer(app);
const typeDefs = await loadSchema('schema.graphql', { loaders: [new GraphQLFileLoader()] });
const resolvers = {
    Query: quieres,
    Post: postResolver,
    Comment: commentResolver,
    Mutation: mutationResolvers,
    SanitazedString: sanitazedString,
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
server.executeOperation;
const prismaClient = new PrismaClient();
await server.start();
app.use('/graphql', cors({ origin: [process.env.front_url] }), json(), expressMiddleware(server, {
    context: async () => {
        return {
            dataSources: {
                prisma: prismaClient,
                postModelsDataSource: new PostModelsDataSource(prismaClient)
            }
        };
    },
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at :4000/graphql`);
