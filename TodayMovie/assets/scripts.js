const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg5OWZiN2FlMzg3NDZmNmU0NjI2MjllZGQ3NDMzZSIsIm5iZiI6MTczNjI5NjU0NS4xLCJzdWIiOiI2NzdkYzg2MTM0YTRlNzVlNDk3YWY2YmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T3mfeJN9v6bdDsimYDYgD5gIxsObvH4jN4RaPQ6HXdA";

const getMovieDetails = () => {
  const movieId = 220176; // test 관상 id
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log("movieDetails", json))
    .catch((err) => console.error(err));
};

const searchMovies = () => {
  const keyword = "관상"; // test 관상 키워드
  const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=true&language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log("search", json))
    .catch((err) => console.error(err));
};

const getPlayingMovieList = () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log("paying", json))
    .catch((err) => console.error(err));
};

const getPopularMovieList = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log("popular", json))
    .catch((err) => console.error(err));
};

const getRatedMovieList = () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log("top Rated", json))
    .catch((err) => console.error(err));
};

getMovieDetails();
searchMovies();
getPlayingMovieList();
getPopularMovieList();
getRatedMovieList();
