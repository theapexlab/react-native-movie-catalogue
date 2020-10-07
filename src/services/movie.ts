import _ from 'lodash'
import gql from 'graphql-tag'
import apolloClient from '../lib/apolloClient'

// Add your TMDB api key here
const tmdbApiKey = ''

// Queries

export const SEARCH_FOR_MOVIES = gql`
  query SearchForMovies {
    search(query: $query)
      @rest(
        type: "Movies"
        method: "GET"
        endpoint: "tmdb"
        path: "search/movie?api_key=${tmdbApiKey}&query={args.query}"
      ) {
      results @type(name: "Movie") {
        id
        title
        overview
        poster_path
        release_date
        vote_average
      }
    }
  }
`

export const GET_EXTERNAL_IDS = gql`
  query GetExternalIds {
    external(movieId: $movieId)
      @rest(
        type: "Ids"
        method: "GET"
        endpoint: "tmdb"
        path: "movie/{args.movieId}/external_ids?api_key=${tmdbApiKey}"
      ) {
      id
      imdb_id
    }
  }
`

export const GET_SIMILAR_MOVIES = gql`
  query GetSimilarMovies {
    similar(movieId: $movieId)
      @rest(
        type: "SimilarMovies"
        method: "GET"
        endpoint: "tmdb"
        path: "/movie/{args.movie_id}/similar?api_key=${tmdbApiKey}"
      ) {
      results @type(name: "Movie") {
        id
        title
        overview
        poster_path
        vote_average
      }
    }
  }
`
export const SEARCH_FOR_WIKIPEDIA_TITLE = gql`
  query SearchForWikipediaTitle {
    wiki(title: $title)
      @rest(
        type: "Wikipedia"
        method: "GET"
        endpoint: "wikipedia"
        path: "format=json&action=opensearch&search={args.title}"
      )
  }
`

export const GET_WIKIPEDIA_EXTRACT = gql`
  query ExtractDescriptionFromWikipediaPage {
    description(title: $title)
      @rest(
        type: "Wikipedia"
        method: "GET"
        endpoint: "wikipedia"
        path: "format=json&action=query&prop=extracts&explaintext=1&exintro=true&titles={args.title}"
      ) {
      query {
        pages
      }
    }
  }
`

export const getWikipediaTitleOptions = async (movieTitle: string) => {
  const { data: wikipediaOpenSearchData } = await apolloClient.query({
    query: SEARCH_FOR_WIKIPEDIA_TITLE,
    variables: {
      title: movieTitle,
    },
  })
  const wikipediaTitleOptions = _.get(wikipediaOpenSearchData, ['wiki', '1'])

  return wikipediaTitleOptions
}

export const getWikipediaMovieExtract = async (movieTitle: string) => {
  const { data: extractData } = await apolloClient.query({
    query: GET_WIKIPEDIA_EXTRACT,
    variables: {
      title: movieTitle,
    },
  })

  const movieDescriptionExtract = _.chain(extractData)
    .get(['description', 'query', 'pages'])
    // @ts-ignore
    .values()
    .get(['0', 'extract'])
    .value()

  return movieDescriptionExtract
}
