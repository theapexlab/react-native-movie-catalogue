import React, { useEffect, useState } from 'react'

import * as Linking from 'expo-linking'
import { StyleSheet, Image, View, ScrollView } from 'react-native'
import { useApolloClient, gql, useQuery } from '@apollo/react-hooks'
import { Button, Text, ActivityIndicator } from 'react-native-paper'

import { getWikipediaLinkAndDescription } from '../../lib/wikipedia'
import { DetailsNavigationProps } from '../../types'

import { GET_EXTERNAL_IDS } from '../../services/movie'
import getPosterUri from '../../helpers/getPosterUri'

import HeaderBar from '../../components/HeaderBar'

const Strings = {
  noMovieText: 'No movie selected!',
  imdbButton: 'IMDb',
  wikipediaButton: 'Wikipedia',
}

export default function DetailsScreen({
  route,
  navigation,
}: DetailsNavigationProps) {
  if (!route?.params) {
    return (
      <>
        <HeaderBar goBack={navigation.goBack} title={'Details'} />
        <Text>{Strings.noMovieText}</Text>
      </>
    )
  }
  const { movieId, title } = route?.params

  const client = useApolloClient()
  const movieInfo = client.readFragment({
    id: `Movie:${movieId}`,
    fragment: gql`
      fragment MovieInfo on Movie {
        id
        title
        overview
        poster_path
        release_date
      }
    `,
  })

  const [wikipediaLink, setWikipediaLink] = useState<undefined | string>(
    undefined
  )
  const [movieDescription, setMovieDescription] = useState<undefined | string>(
    undefined
  )

  const clearState = () => {
    setWikipediaLink(undefined)
    setMovieDescription(undefined)
  }

  useEffect(() => {
    const fetchWikipediaLink = async () => {
      const results = await getWikipediaLinkAndDescription(
        movieInfo.title,
        movieInfo.release_date
      )

      const { wikipediaPageLink, wikipediaDescriptionExtract } = results

      setWikipediaLink(wikipediaPageLink)
      setMovieDescription(wikipediaDescriptionExtract ?? movieInfo.overview)
    }

    fetchWikipediaLink()

    return clearState()
  }, [movieInfo])

  const { data: externalIds } = useQuery(GET_EXTERNAL_IDS, {
    variables: {
      movieId: movieId,
    },
  })

  const posterUri = getPosterUri(movieInfo?.poster_path, 'w500')

  const movieImdbId = externalIds?.external?.imdb_id
  const imdbLink = `https://www.imdb.com/title/${movieImdbId}`

  return (
    <>
      <HeaderBar goBack={navigation.goBack} title={title ?? ''} />
      <View style={styles.imageContainer}>
        <Image
          key={movieInfo.id}
          resizeMode={'contain'}
          style={styles.poster}
          source={{
            uri: posterUri,
          }}
        />
      </View>
      <Text style={styles.titile}>{movieInfo.title}</Text>
      <ScrollView style={styles.detailsContainer}>
        {movieDescription !== undefined ? (
          <Text style={styles.text} adjustsFontSizeToFit>
            {movieDescription}
          </Text>
        ) : (
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={'#01b4e4'}
          />
        )}
      </ScrollView>
      <View style={styles.buttonBlock}>
        <Button
          mode="contained"
          color="#F5C518"
          disabled={!movieImdbId}
          labelStyle={{ fontWeight: 'bold' }}
          style={{ width: '45%' }}
          onPress={() => Linking.openURL(imdbLink)}
        >
          {Strings.imdbButton}
        </Button>
        <Button
          color="white"
          mode="contained"
          disabled={!wikipediaLink}
          style={{ width: '45%' }}
          onPress={() => wikipediaLink && Linking.openURL(wikipediaLink)}
        >
          {Strings.wikipediaButton}
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    height: '40%',
    alignItems: 'center',
    marginVertical: '2%',

    shadowColor: 'black',
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  titile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d253f',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    height: '30%',
  },
  buttonBlock: {
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
    justifyContent: 'space-evenly',
  },
})
