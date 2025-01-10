const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg5OWZiN2FlMzg3NDZmNmU0NjI2MjllZGQ3NDMzZSIsIm5iZiI6MTczNjI5NjU0NS4xLCJzdWIiOiI2NzdkYzg2MTM0YTRlNzVlNDk3YWY2YmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T3mfeJN9v6bdDsimYDYgD5gIxsObvH4jN4RaPQ6HXdA";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

// 영화 세부정보 가져오기 함수
export const getMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  try {
    const response = await fetch(url, options);
    const movieDetails = response.json();
    return movieDetails;
  } catch (err) {
    console.error(err);
  }
};

// 영화 검색 함수
export const searchMovies = async (keyword) => {
  keyword = keyword.toLowerCase();
  const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const moviesArray = data.results;
    return moviesArray;
  } catch (err) {
    console.error(err);
  }
};

// 인기순으로 영화 가져오기 함수
export const getPopularMovieList = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const moviesArray = data.results;
    return moviesArray;
  } catch (err) {
    console.error(err);
  }
};

// 나중에 쓸 함수
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
