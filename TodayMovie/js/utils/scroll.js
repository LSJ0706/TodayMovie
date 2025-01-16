export const infiniteScroll = (getMovies, paintMovieList) => {
  // 데이터를 로드 중인가 아닌가를 나타냄 flag
  let isLoading = false;

  // 무한 스크롤 처리하는 비동기 함수
  return async (currentPage) => {
    // 데이터 로딩중이면 currentPage return
    if (isLoading) {
      return currentPage;
    }
    // scrollTop: 문서의 스크롤 위치, scrollHeight: 전체 문서 높이, clientHeight: 화면에 표시된 높이
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // scrollTop + clientHeight 화면 하단이 스크롤된 위치
    // scrollHeight - 200 문서 끝에서 200px 위 200px 이하면 스크롤 시작
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      // 데이터 로드 시작 flag
      isLoading = true;

      // await getMovies로 data 로드
      const data = await getMovies(currentPage);

      // data가 존재하면 해당 로직 수행
      if (data) {
        // data에 따라서 paintMovieList 실행
        paintMovieList(data);
        // 데이터 로딩이 끝났으므로 flag, currentPage 증가 시킴
        isLoading = false;
        currentPage++;
        // 페이지 증가
        return currentPage;
      }
      // 데이터 로딩이 끝났으므로 상태 해제
      isLoading = false;
    }
  };
};
