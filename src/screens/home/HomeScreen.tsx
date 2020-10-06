import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

import HeaderBar from '../../components/HeaderBar'

export default function HomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = React.useState('')

  const onChangeSearch = (query: string) => setSearchQuery(query)

  return (
    <>
      <HeaderBar title={'Movie Catalogue'} />
      <View style={styles.container}>
        <Text
          onPress={() => {
            navigation.jumpTo('Details', { title: 'Michaś' })
          }}
        >
          Home Bicc
        </Text>
        <Searchbar
          style={{ width: '80%' }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          autoFocus={false}
          blurOnSubmit={true}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
