export const infiniteScroll = (getMovies, paintMovieList, currentMovieList) => {
  let isLoading = false;

  return async (currentPage) => {
    if (isLoading) {
      return currentPage;
    }
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      isLoading = true;

      const data = await getMovies(currentPage);
      if (data) {
        paintMovieList(data);
        isLoading = false;
        currentPage++;
        return currentPage; // 페이지 증가
      }
      isLoading = false;
    }
    return currentPage;
  };
};
