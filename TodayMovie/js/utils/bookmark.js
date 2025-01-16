let bookmarkLists = JSON.parse(window.localStorage.getItem("bookmark")) || [];

// 북마크 추가 함수
const addBookmark = (movieLists) => {
  // local에서 api를 여러 번 불러오는것보단 그냥 해당 값을 저장하여 가져온다
  // id, poster_path, title, vote_average의 data를 저장한다.
  const movieData = {
    id: movieLists.id,
    poster_path: movieLists.poster_path,
    title: movieLists.title,
    vote_average: movieLists.vote_average,
  };
  const addBookMarkLists = [...bookmarkLists, movieData];
  bookmarkLists = window.localStorage.setItem(
    "bookmark",
    JSON.stringify(addBookMarkLists)
  );
  bookmarkLists = addBookMarkLists;
  alert("북마크에 추가되었습니다!");
};

// 북마크 삭제 함수
const deleteBookmark = (id) => {
  const delBookMarkLists = bookmarkLists.filter(
    (bookmark) => bookmark.id !== Math.floor(id)
  );
  bookmarkLists = window.localStorage.setItem(
    "bookmark",
    JSON.stringify(delBookMarkLists)
  );
  bookmarkLists = delBookMarkLists;
  alert("북마크에 삭제되었습니다!");
};

// 북마크 체크함수
const checkBookmark = (id) => {
  console.log(bookmarkLists, id);
  return bookmarkLists.some((movie) => movie.id === Math.floor(id));
};
export { addBookmark, deleteBookmark, checkBookmark };
