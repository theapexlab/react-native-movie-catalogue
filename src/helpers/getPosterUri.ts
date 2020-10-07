const getPosterUri = (posterPath?: string, size = 'w154') => {
  return posterPath
    ? `https://image.tmdb.org/t/p/${size}${posterPath}`
    : 'https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png'
}

export default getPosterUri