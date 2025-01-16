// apikey 무료 api라서 감추지않음, 만약 유료였다면 env파일이나 gitignore에 담아 처리
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg5OWZiN2FlMzg3NDZmNmU0NjI2MjllZGQ3NDMzZSIsIm5iZiI6MTczNjI5NjU0NS4xLCJzdWIiOiI2NzdkYzg2MTM0YTRlNzVlNDk3YWY2YmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T3mfeJN9v6bdDsimYDYgD5gIxsObvH4jN4RaPQ6HXdA";

// GET method option 처리
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

// 영화 세부정보 GET API
const getMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  try {
    const response = await fetch(url, options);
    const movieDetails = response.json();
    return movieDetails;
  } catch (err) {
    console.error(err);
  }
};

// 영화 검색 GET API
const getSearchMovies = async (keyword) => {
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

// 인기순으로 평점순 GET API
const getTopRatedMovieList = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const moviesArray = data.results;
    return moviesArray;
  } catch (err) {
    console.error(err);
  }
};

export { getMovieDetails, getSearchMovies, getTopRatedMovieList };
