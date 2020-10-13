import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY env var is missing!')
  }
  return {
    ...config,
    extra: {
      TMDBApiKey: process.env.TMDB_API_KEY
    }
  } as any
}