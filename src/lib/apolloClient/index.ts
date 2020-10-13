// polyfill in order to apollo-link-rest work with node.js
import { Headers } from "cross-fetch";
// @ts-ignore
global.Headers = global.Headers || Headers;

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const restLink = new RestLink({
  uri: 'https://api.themoviedb.org/3/',
  endpoints: {
    tmdb: {
      uri: 'https://api.themoviedb.org/3/',
    },
    wikipedia: {
      uri: 'https://en.wikipedia.org/w/api.php?',
    },
  },
})

// setup Apollo client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
})

export default client