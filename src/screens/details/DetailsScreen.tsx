import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import HeaderBar from '../../components/HeaderBar'

const Stack = createStackNavigator()

function DetailsScreen({
  route,
  navigation,
}: {
  route: { params: { title: string } }
  navigation: any
}) {
  return (
    <>
      <HeaderBar
        goBack={navigation.goBack}
        title={route?.params?.title ?? ''}
      />
      <Text
        onPress={() => {
          navigation.push('Movie', {
            title: Math.random().toString(10),
          })
        }}
      >
        {route?.params?.title}
      </Text>
    </>
  )
}

export default function DetailsStack({
  route,
}: {
  route: { params: { title: string } }
}) {
  const title = route?.params?.title

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name={'Movie'}
      >
        {({ route, navigation }: any) => DetailsScreen({ route, navigation })}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
