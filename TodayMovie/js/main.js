import {
  searchMovies,
  getPopularMovieList,
  getMovieDetails,
} from "./api/api.js";
import {
  paintMovieList,
  paintModal,
  paintBookmarkList,
} from "./paintHandler.js";
import { deleteBookmark } from "./utils/bookmark/bookmark.js";

const mainContainer = document.getElementById("main-container");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search_btn");
const mainTitle = document.getElementById("title");
const bookmarkBtn = document.getElementById("bookmark_btn");

const main = async () => {
  const movieLists = await getPopularMovieList();
  paintMovieList(movieLists);
  mainContainer.addEventListener("click", handleMovieClick);
};
const handleMovieClick = async (event) => {
  const target = event.target.closest(".movie-list");
  if (
    target &&
    target.dataset.id &&
    !event.target.classList.contains("bookmark__del-btn")
  ) {
    const movieDetails = await getMovieDetails(target.dataset.id);
    paintModal(movieDetails);
  }
};
const handleSearch = async () => {
  const keyword = await searchMovies(search.value);
  paintMovieList(keyword);
};
const handleSearchKeyPress = (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
};
const handleBookmark = () => {
  const movieLists = window.localStorage.getItem("bookmark");
  paintBookmarkList(JSON.parse(movieLists));
};
const handleDeleteBookmark = (event) => {
  if (event.target.classList.value === "bookmark__del-btn") {
    const movieId = event.target.closest(".movie-list").dataset.id;
    deleteBookmark(movieId);
    handleBookmark();
  }
};

mainTitle.addEventListener("click", main);
searchBtn.addEventListener("click", handleSearch);
search.addEventListener("keydown", handleSearchKeyPress);
bookmarkBtn.addEventListener("click", handleBookmark);
mainContainer.addEventListener("click", handleDeleteBookmark);

main();
