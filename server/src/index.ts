import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import quieres from './gql/queries/queries'
import postResolver from './gql/type-resolvers/post-resolver';
import commentResolver from './gql/type-resolvers/comment-resolver';
import mutationResolvers from './gql/mutations/mutations';

const typeDefs = await loadSchema('schema.graphql', { loaders: [new GraphQLFileLoader()] });


const resolvers = {
  Query:quieres,
  Post: postResolver,
  Comment: commentResolver,


  Mutation: mutationResolvers,
};

export interface MishaBlogServerContext{
  dataSources: {
  }
}

const server = new ApolloServer<MishaBlogServerContext>({
  typeDefs,
  resolvers
});


const { url } = await startStandaloneServer(server, {
  context:async () => {
   return {dataSources:{}}
  },
  listen: { port: 4000 },
});

console.log(`Server started at ${url}! Enjoy you slut`)