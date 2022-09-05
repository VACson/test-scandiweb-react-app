import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_BASE_URL }),
  cache: new InMemoryCache(),
});
export default client;
