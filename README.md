# react-native-movie-catalogue 🎬🍿

## Quickstart
- iOS:
`TMDB_API_KEY=18145e8c7bc21032fc0358eb1f59347f npm run ios` 
 - Android:
`TMDB_API_KEY=18145e8c7bc21032fc0358eb1f59347f npm run android`
- expo: https://expo.io/@apexlab/projects/movie-catalogue
> **Sharing API secrets in a git repo is considered as a bad practice. We did it so you can check out the project more easily.**  

*You can set up your own api key. first register here: https://www.themoviedb.org/signup Then get your api key here: https://www.themoviedb.org/settings/api*


## Wikipedia 
Since wikipedia's rest api isn't sophisticated enough we had to use some black magic to get the right details for a given film. Please see https://github.com/theapexlab/react-native-movie-catalogue/blob/master/src/lib/wikipedia/index.ts for details.

## Testing
We added one POC unit/snapshot test case for the home-screen component. We are checking if the search results are shown correctly. Snapshot testing is might not that appropriate for a "complex" component like this. 

`testing-library/react-native` will emit warnings because of this issue: https://github.com/callstack/react-native-testing-library/issues/379