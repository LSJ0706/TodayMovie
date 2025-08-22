const mainContainer = document.getElementById("main-container");

// 영화리스트 생성 함수
const paintMovieList = (moviesArray) => {
  // moviesArray의 배열을 받아 영화 리스트 화면 구성
  moviesArray.forEach((movie) => {
    const movieList = document.createElement("div");
    movieList.classList.add("movie-list");
    movieList.dataset.id = movie.id;
    movieList.innerHTML = `
        <div class="movie-list__card">
          <img class="movie-list__card-image" src="https://image.tmdb.org/t/p/w300/${
            movie.poster_path
          }"></img>
        </div>
        <div class="movie-card__title">
          <h4>${movie.title}</h4>
          <p>평점: ${movie.vote_average.toFixed(1)}</p>
        </div>
  `;
    mainContainer.appendChild(movieList);
  });
};

// 동적 모달 생성 및 이벤트 핸들러 장착 함수
const paintModal = (movieDetails, isBooked) => {
  // 동적으로 모달 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.dataset.id = movieDetails.id;
  modal.innerHTML = `
      <div class="modal-content">
        <button class="close-btn">X</button>
        <img src="https://image.tmdb.org/t/p/original/${
          movieDetails.backdrop_path
        }" />
        <h2>${movieDetails.title}</h2>
        <p>${movieDetails.overview}</p>
        <p>개봉일: ${movieDetails.release_date}</p>
        <p>평점: ${movieDetails.vote_average.toFixed(1)}</p>
        <button class="bookmark__toggle-btn">${
          isBooked ? "북마크 삭제" : "북마크 추가"
        }</button>
      </div>
      `;
  mainContainer.appendChild(modal);

  // close button 클릭시 modal 삭제
  mainContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-btn")) {
      const modal = event.target.closest(".modal");
      modal.remove();
    }
  });
  // window 객체를 클릭하면 modal 삭제
  window.addEventListener("click", () => {
    modal.remove();
  });
};

// 북마크 리스트 생성 함수
const paintBookmarkList = (moviesArray) => {
  // moviesArray의 배열을 받아 영화 리스트 화면 구성
  mainContainer.innerHTML = "";
  moviesArray.forEach((movie) => {
    mainContainer.innerHTML += `
      <div class="movie-list" data-id = ${movie.id}>
        <div class="movie-list__card">
          <img class="movie-list__card-image" src="https://image.tmdb.org/t/p/w300/${
            movie.poster_path
          }"></img>
        </div>
        <div class="movie-card__title">
          <h4>${movie.title}</h4>
          <p>평점: ${movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
  `;
  });
};

export { paintMovieList, paintModal, paintBookmarkList };
