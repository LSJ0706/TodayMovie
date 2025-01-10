import { searchMovies, getPopularMovieList } from "./api/api.js";
import { paintMovieList } from "./paint.js";

const search = document.getElementById("search");
const searchBtn = document.getElementById("search_btn");
const mainTitle = document.getElementById("title");

getPopularMovieList().then((movieLists) => {
  paintMovieList(movieLists);
});

searchBtn.addEventListener("click", async () => {
  const keyword = await searchMovies(search.value);
  paintMovieList(keyword);
});

mainTitle.addEventListener("click", () => {
  location.reload();
});
