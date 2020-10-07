import React from 'react'

import { List, Text } from 'react-native-paper'
import { StyleSheet, FlatList, View, Image } from 'react-native'

import { MovieDetails } from '../types'
import getPosterUri from '../helpers/getPosterUri'

type Props = {
  movieList: MovieDetails[]
  onPressItem: ({ id, title }: { id: string; title: string }) => void
}

const Strings = {
  subheaderText: 'Results',
}

export default function MovieList({ movieList, onPressItem }: Props) {
  return (
    <View style={styles.listContainer}>
      {movieList ? (
        <List.Section>
          <List.Subheader style={styles.listSubheader}>
            {Strings.subheaderText}
          </List.Subheader>
          <FlatList
            data={movieList ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const posterUri = getPosterUri(item.poster_path)
              return (
                <List.Item
                  title={item.title}
                  description={item.overview}
                  onPress={() =>
                    onPressItem({ id: item.id, title: item.title })
                  }
                  left={() => (
                    <Image
                      resizeMode={'contain'}
                      style={styles.poster}
                      source={{
                        uri: posterUri,
                      }}
                    />
                  )}
                  right={() => <Text>{`${item.vote_average}/10`}</Text>}
                />
              )
            }}
          />
        </List.Section>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '88%',
    height: '76%',
  },
  listSubheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d253f',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 3,
  },
})
