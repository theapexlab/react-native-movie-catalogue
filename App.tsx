import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'

import { ApolloProvider } from '@apollo/react-hooks'
import apolloClient from './src/lib/apolloClient'

import AppNavigation from './src/navigation/AppNavigation'

export default function App() {
  // NOTE: For memory optimalization purposes (https://reactnavigation.org/docs/react-native-screens/)
  enableScreens()

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <AppNavigation />
        <StatusBar />
      </NavigationContainer>
    </ApolloProvider>
  )
}
