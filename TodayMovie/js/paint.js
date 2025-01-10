import { getMovieDetails } from "./api/api.js";
// 영화 content 그리기 함수
const mainContainer = document.getElementById("main-container");

export const paintMovieList = (moviesArray) => {
  mainContainer.innerHTML = ``;
  moviesArray.forEach((item) => {
    mainContainer.innerHTML += `
      <div class="movie-list" data-id = ${item.id}>
        <div class="movie-list__card">
          <img class="movie-list__card-image" src="https://image.tmdb.org/t/p/w300/${
            item.poster_path
          }"></img>
        </div>
        <div class="movie-card__title">
          <h4>${item.title}</h4>
          <p>평점: ${item.vote_average.toFixed(1)}</p>
        </div>
      </div>
  `;
  });

  // 영화 세부 정보 event 위임
  const movieList = document.querySelectorAll(".movie-list");
  for (let item of movieList) {
    item.addEventListener("click", async () => {
      // getMovieDetails 여기서 api를 불러온거면 필요가 없지 않을까?
      const movieDetails = await getMovieDetails(item.dataset.id);
      paintModal(movieDetails);
    });
  }
};

// 동적 모달 생성 및 이벤트 핸들러 장착 함수
export const paintModal = (moiveDetails) => {
  // 동적으로 모달 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");

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
  rating.textContent = `평점: ${moiveDetails.vote_average}`;

  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.classList.add("bookmark-btn");
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

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modal.remove(); // 모달 제거
  });
};
