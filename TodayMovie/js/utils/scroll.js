export const infiniteScroll = (getMovies, paintMovieList) => {
  // 데이터 로딩 flag
  let isLoading = false;

  return async (currentPage) => {
    // 데이터 로딩중
    if (isLoading) {
      return currentPage;
    }
    // scrollTop: 문서의 스크롤 위치, scrollHeight: 전체 문서 높이, clientHeight: 화면에 표시된 높이
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // scrollTop + clientHeight 화면 하단이 스크롤된 위치
    // scrollHeight - 200 문서 끝에서 200px 위 200px 이하면 로직 수행
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      isLoading = true;
      const data = await getMovies(currentPage);

      if (data) {
        paintMovieList(data);
        // 데이터 로딩 종료
        isLoading = false;
        currentPage++;
        return currentPage;
      }
      // 데이터 로딩 종료
      isLoading = false;
    }
  };
};
