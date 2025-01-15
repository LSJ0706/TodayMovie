import {
  getSearchMovies,
  getPopularMovieList,
  getMovieDetails,
} from "./api/api.js";
import {
  paintMovieList,
  paintModal,
  paintBookmarkList,
} from "./paintHandler.js";
import { deleteBookmark, addBookmark } from "./utils/bookmark.js";
import { debounce, throttle } from "./utils/debounce.js";
import { infiniteScroll } from "./utils/scroll.js";

let currentPage = 1;
let currentMovieList = [];
const mainContainer = document.getElementById("main-container");
const search = document.getElementById("search");
const mainTitle = document.getElementById("title");
const bookmarkBtn = document.getElementById("bookmark_btn");

const main = async () => {
  const movieLists = await getPopularMovieList();
  currentPage++;
  paintMovieList(movieLists);
};
const movieClickHandler = async (event) => {
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
const searchHandler = async () => {
  const searchMovieLists = await getSearchMovies(search.value);
  if (search.value === "") main();
  else paintMovieList(searchMovieLists);
};
const bookmarkHandler = () => {
  const movieLists = window.localStorage.getItem("bookmark");
  paintBookmarkList(JSON.parse(movieLists));
};
const deleteBookmarkHandler = (event) => {
  if (event.target.classList.value === "bookmark__del-btn") {
    const movieId = event.target.closest(".movie-list").dataset.id;
    deleteBookmark(movieId);
    bookmarkHandler();
  }
};
const addBookmarkHandler = async (event) => {
  if (event.target.classList.value === "bookmark__add-btn") {
    const movieDetails = await getMovieDetails(
      event.target.closest(".modal").dataset.id
    );
    addBookmark(movieDetails);
  }
};

const searchDedounceHandler = debounce(searchHandler, 200);
const scrollHandler = infiniteScroll(
  getPopularMovieList,
  paintMovieList,
  currentMovieList
);
const scrollThrottleHandler = throttle(async () => {
  const newPage = await scrollHandler(currentPage);
  if (newPage) currentPage = newPage;
}, 200);

mainTitle.addEventListener("click", main);
search.addEventListener("input", searchDedounceHandler);
bookmarkBtn.addEventListener("click", bookmarkHandler);
mainContainer.addEventListener("click", (event) => {
  deleteBookmarkHandler(event);
  addBookmarkHandler(event);
  movieClickHandler(event);
});

window.addEventListener("scroll", scrollThrottleHandler);
main();
