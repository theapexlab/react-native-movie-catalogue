import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

type RootTabParamList = {
  Home: undefined
  Details: DetailsNavigationParams
}
export type TabNavigationProps = BottomTabNavigationProp<RootTabParamList>

export type HomeNavigationProps = {
  navigation: TabNavigationProps
}

export type DetailsNavigationParams = {
  movieId: string
  title: string
}

export type DetailsNavigationProps = {
  navigation: TabNavigationProps
  route: { params: DetailsNavigationParams }
}

export type MovieDetails = {
  id: string
  title: string
  overview?: string
  poster_path?: string
  release_date?: string
  vote_average?: string
}
