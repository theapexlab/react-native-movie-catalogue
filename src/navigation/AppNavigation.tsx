import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/home/HomeScreen'
import DetailsScreen from '../screens/details/DetailsScreen'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

function AppNavigation() {
  return (
    <Tab.Navigator
      activeColor="#0d253f"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: '#01b4e4' }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-search" size={26} color={color} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-film" size={26} color={color} />
          ),
        }}
        name="Details"
        component={DetailsScreen}
      />
    </Tab.Navigator>
  )
}

export default AppNavigation
