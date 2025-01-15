const mainContainer = document.getElementById("main-container");

// 영화리스트 그리기 함수
export const paintMovieList = (moviesArray) => {
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
export const paintModal = (moiveDetails) => {
  // 동적으로 모달 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.dataset.id = moiveDetails.id;

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "×";

  const title = document.createElement("h2");
  title.textContent = moiveDetails.title;

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w300/${moiveDetails.poster_path}`;

  const description = document.createElement("p");
  description.textContent = moiveDetails.overview;

  const releaseDate = document.createElement("p");
  releaseDate.textContent = `개봉일: ${moiveDetails.release_date}`;

  const rating = document.createElement("p");
  rating.textContent = `평점: ${moiveDetails.vote_average.toFixed(1)}`;

  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.classList.add("bookmark__add-btn");
  bookmarkBtn.textContent = "북마크 추가";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(img);
  modalContent.appendChild(title);
  modalContent.appendChild(description);
  modalContent.appendChild(releaseDate);
  modalContent.appendChild(rating);
  modalContent.appendChild(bookmarkBtn);

  modal.appendChild(modalContent);
  mainContainer.appendChild(modal);

  window.addEventListener("click", () => {
    modal.style.display = "none";
    modal.remove();
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modal.remove(); // 모달 제거
  });
};

// 북마크 리스트 그리기 함수
export const paintBookmarkList = (moviesArray) => {
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
        <button class="bookmark__del-btn">북마크삭제</button>
      </div>
  `;
  });
};
