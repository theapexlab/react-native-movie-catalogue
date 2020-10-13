import React from 'react'

import { useLazyQuery } from '@apollo/client'
import { Searchbar, Button } from 'react-native-paper'
import { StyleSheet, View, Keyboard } from 'react-native'

import { HomeNavigationProps } from '../../types'

import { SEARCH_FOR_MOVIES } from '../../services/movie'
import HeaderBar from '../../components/HeaderBar'
import MovieList from '../../components/MovieList'

const Strings = {
  title: 'Movie Catalogue',
  searchButton: 'Search',
}

export default function HomeScreen({ navigation }: HomeNavigationProps) {
  const [searchQuery, setSearchQuery] = React.useState('')

  const onChangeSearch = (query: string) => setSearchQuery(query)

  const [searchForMovies, { called, loading, data }] = useLazyQuery(SEARCH_FOR_MOVIES)
  const handleSearchButtonPressed = () => {
    searchForMovies({
      variables: {
        query: searchQuery,
      },
    })
    Keyboard.dismiss()
  }

  let movieList = data?.search?.results

  return (
    <>
      <HeaderBar title={Strings.title} />
      <View style={styles.container}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Movie name"
          onChangeText={onChangeSearch}
          onSubmitEditing={() => handleSearchButtonPressed()}
          value={searchQuery}
          autoFocus={false}
          blurOnSubmit={true}
          testID='search-bar'
        />

        <Button
          color="#01b4e4"
          mode="contained"
          loading={called && loading}
          style={styles.searchButton}
          onPress={() => handleSearchButtonPressed()}
        >
          {Strings.searchButton}
        </Button>

        <MovieList
          movieList={movieList}
          onPressItem={({ id, title }: { id: string; title: string }) => {
            navigation.jumpTo('Details', {
              title,
              movieId: id,
            })
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  searchBar: {
    width: '88%',
    marginTop: '5%',
  },
  searchButton: {
    width: '88%',
    marginTop: '3%',
  },
})
