import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'

import AppNavigation from './src/navigation/AppNavigation'

export default function App() {
  // For memory optimalization (https://reactnavigation.org/docs/react-native-screens/)
  enableScreens()

  return (
    <NavigationContainer>
      <AppNavigation />
      <StatusBar />
    </NavigationContainer>
  )
}
