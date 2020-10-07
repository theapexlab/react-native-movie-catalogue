import _ from 'lodash'
import dayjs from 'dayjs'

import {
  getWikipediaTitleOptions,
  getWikipediaMovieExtract,
} from '../../services/movie'

const toSnakeCase = (string: string) => {
  return string.split(' ').join('_')
}

export const getWikipediaLinkAndDescription = async (
  movieTitle: string,
  movieReleaseDate: string
) => {
  const wikipediaTitleOptions = await getWikipediaTitleOptions(movieTitle)

  const releaseYear = dayjs(movieReleaseDate).year()

  let wikipediaMovieTitle

  // NOTE: The logic is based on these conventions: https://en.wikipedia.org/wiki/Wikipedia:Naming_conventions_(films)
  if (
    _.includes(wikipediaTitleOptions, `${movieTitle} (${releaseYear} film)`)
  ) {
    wikipediaMovieTitle = `${movieTitle} (${releaseYear} film)`
  } else if (_.includes(wikipediaTitleOptions, `${movieTitle} (film)`)) {
    wikipediaMovieTitle = `${movieTitle} (film)`
  } else if (_.includes(wikipediaTitleOptions, movieTitle)) {
    wikipediaMovieTitle = wikipediaTitleOptions[0]
  }

  if (!wikipediaMovieTitle) {
    return {
      wikipediaPageLink: undefined,
      wikipediaDescriptionExtract: undefined,
    }
  }

  const wikipediaMovieTitleSnakeCase = toSnakeCase(wikipediaMovieTitle)

  const wikipediaPageLink = `https://en.wikipedia.org/wiki/${wikipediaMovieTitleSnakeCase}`
  const wikipediaDescriptionExtract = await getWikipediaMovieExtract(
    wikipediaMovieTitleSnakeCase
  )

  return { wikipediaPageLink, wikipediaDescriptionExtract }
}
