import React, { FunctionComponent } from 'react'
import { BottomNavigation, Text } from 'react-native-paper'

type Props = {
  icon: string
  color: string
  screen: FunctionComponent
}

const BottomTabNavigator: FunctionComponent<Props> = ({
  icon,
  color,
  screen,
}) => {
  return (
    <Tab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Ionicons name={icon} size={26} color={color} />
        ),
      }}
      name="Home"
      component={screen}
    />
  )
}

export default BottomTabNavigator
