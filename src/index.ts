import {ApolloServer} from 'apollo-server';
import {schema} from './api/schema';
import {context} from './api/graphql/context';

export const server = new ApolloServer({
   schema,
   context
});

server.listen(3000,() => {
    console.log("server is up and running")
});