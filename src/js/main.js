import {
  getSearchMovies,
  getTopRatedMovieList,
  getMovieDetails,
} from "./api/api.js";
import {
  paintMovieList,
  paintModal,
  paintBookmarkList,
} from "./paintHandler.js";
import {
  deleteBookmark,
  addBookmark,
  checkBookmark,
} from "./utils/bookmark.js";
import { debounce, throttle } from "./utils/timing.js";
import { infiniteScroll } from "./utils/scroll.js";

let currentPage = 1;
let currentPageType = "main";

const mainContainer = document.getElementById("main-container");
const search = document.getElementById("search");
const mainTitle = document.getElementById("title");
const bookmarkBtn = document.getElementById("bookmark_btn");

// main page 함수
const main = async () => {
  currentPageType = "main";
  // 페이지 상태가 메인 일 때, mainContainer, 현재 페이지 초기화
  if (currentPageType === "main") {
    currentPage = 1;
    mainContainer.innerHTML = "";
  }
  // API의 페이지를 기준으로 평점순으로 영화 리스트 api 호출 및 화면 생성
  const movieLists = await getTopRatedMovieList(currentPage);
  // 페이지를 증가시켜 다음 페이지를 불러올 때 자동으로 증가
  currentPage++;
  paintMovieList(movieLists);
};

// 영화 모달을 관리하는 함수
const movieModalHandler = async (event) => {
  // 현재 클릭한 가장 가까운 class중 movie-list를 탐색
  const target = event.target.closest(".movie-list");
  if (
    target &&
    target.dataset.id &&
    !event.target.classList.contains("bookmark__del-btn")
  ) {
    // 영화 상세정보와 현재 북마크 상태를 매겨변수로 modal 생성함수 실행
    const movieDetails = await getMovieDetails(target.dataset.id);
    const isbooked = checkBookmark(target.dataset.id);
    paintModal(movieDetails, isbooked);
  }
};

// 검색 관리 함수
const searchHandler = async () => {
  const keyword = search.value;
  // 페이지 상태를 search로 변경, mainContainer 초기화
  currentPageType = "search";
  mainContainer.innerHTML = "";
  // 영화 검색 api를
  const searchMovieLists = await getSearchMovies(keyword);
  paintMovieList(searchMovieLists);
};

// 북마크 관리 함수
const bookmarkHandler = () => {
  // 로컬 스토리지 저장 데이터
  const movieLists = JSON.parse(window.localStorage.getItem("bookmark"));

  // 페이지 상태에 따라서 북마크 페이지, 메인 페이지를 생성
  if (currentPageType === "bookmark") {
    currentPageType = "main";
    main();
    bookmarkBtn.textContent = "북마크 보기";
  } else {
    currentPageType = "bookmark";
    mainContainer.innerHTML = "";
    paintBookmarkList(movieLists);
    bookmarkBtn.textContent = "메인 페이지";
  }
};

// 검색에 디바운싱 적용
const searchDedounceHandler = debounce(searchHandler, 200);

// 무한 스크롤 관리 함수
const scrollHandler = infiniteScroll(getTopRatedMovieList, paintMovieList);
// 무한 스크롤에 쓰로틀링 적용
const scrollThrottleHandler = throttle(async () => {
  if (currentPageType === "main") {
    const newPage = await scrollHandler(currentPage);
    if (newPage) currentPage = newPage;
  }
}, 0);

// EventListener

// 타이틀
mainTitle.addEventListener("click", () => {
  if (currentPageType !== "main") {
    currentPageType = "main";
    search.value = "";
    main();
  }
});
// 검색
search.addEventListener("input", () => {
  if (search.value.trim() !== "") searchDedounceHandler();
  else if (search.value === "") main();
});
// 북마크
bookmarkBtn.addEventListener("click", bookmarkHandler);
// 이벤트 위임
mainContainer.addEventListener("click", async (event) => {
  movieModalHandler(event);
  // 북마크 삭제 추가 버튼 이벤트 위임
  if (event.target.classList.contains("bookmark__toggle-btn")) {
    const movieId = event.target.closest(".modal").dataset.id;
    if (checkBookmark(movieId)) {
      deleteBookmark(movieId);
    } else {
      const movieDetails = await getMovieDetails(movieId);
      addBookmark(movieDetails);
    }
    if (currentPageType === "bookmark") {
      paintBookmarkList(JSON.parse(window.localStorage.getItem("bookmark")));
    }
    const movieDetails = await getMovieDetails(movieId);
    const isBookmarked = checkBookmark(movieId);
    paintModal(movieDetails, isBookmarked);
  }
});
// 스크롤
window.addEventListener("scroll", scrollThrottleHandler);

// 초기 실행
main();
