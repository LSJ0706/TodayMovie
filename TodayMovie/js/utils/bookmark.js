let bookmarkLists = JSON.parse(window.localStorage.getItem("bookmark")) || [];

export const addBookmark = (movieLists) => {
  // local에서 api를 여러번 불러오는것보단 그냥 해당 값을 저장하여 가져온다
  // id, poster_path, title, vote_average의 data를 저장한다.
  const movieData = {
    id: movieLists.id,
    poster_path: movieLists.poster_path,
    title: movieLists.title,
    vote_average: movieLists.vote_average,
  };
  if (bookmarkLists.some((movie) => movie.id === movieData.id)) {
    alert("이미 북마크에 추가된 영화입니다!");
    return;
  }

  const addBookMarkLists = [...bookmarkLists, movieData];
  bookmarkLists = window.localStorage.setItem(
    "bookmark",
    JSON.stringify(addBookMarkLists)
  );
  bookmarkLists = addBookMarkLists;
  alert("북마크에 추가되었습니다!");
};

export const deleteBookmark = (id) => {
  const delBookMarkLists = bookmarkLists.filter(
    (bookmark) => bookmark.id !== Math.floor(id)
  );
  bookmarkLists = window.localStorage.setItem(
    "bookmark",
    JSON.stringify(delBookMarkLists)
  );
  bookmarkLists = delBookMarkLists;
};
