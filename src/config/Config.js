export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "0d1af92421d8661c1bd815a7e316c6a0";
export const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndPoint}/${type}?api_key=${apiKey}`,
  getMovieDetails: (movieId) => `${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovies: (type, nextPage) =>
    `${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${nextPage}`,
  imageSrc: (url, type) => `https://image.tmdb.org/t/p/${type}/${url}`,
};
