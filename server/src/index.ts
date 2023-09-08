import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import quieres from './gql/queries/queries'
import postResolver from './gql/type-resolvers/post-resolver';
import commentResolver from './gql/type-resolvers/comment-resolver';
import mutationResolvers from './gql/mutations/mutations';
import { PrismaClient } from '@prisma/client'
import { PostModelsDataSource } from './gql/data-loaders/post-data-loader';

const typeDefs = await loadSchema('schema.graphql', { loaders: [new GraphQLFileLoader()] });


const resolvers = {
  Query: quieres,
  Post: postResolver,
  Comment: commentResolver,


  Mutation: mutationResolvers,
};

export interface MishaBlogServerContext {
  dataSources: {
    prisma: PrismaClient,
    postModelsDataSource: PostModelsDataSource
  }
}

const server = new ApolloServer<MishaBlogServerContext>({
  typeDefs,
  resolvers,
});

const prismaClient = new PrismaClient();

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      dataSources: {
        prisma: prismaClient,
        postModelsDataSource: new PostModelsDataSource(prismaClient)
      }
    }
  },
  listen: { port: 4000 },
});

console.log(`Server started at ${url}! Enjoy you slut`)