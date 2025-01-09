document.addEventListener("DOMContentLoaded", () => {
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg5OWZiN2FlMzg3NDZmNmU0NjI2MjllZGQ3NDMzZSIsIm5iZiI6MTczNjI5NjU0NS4xLCJzdWIiOiI2NzdkYzg2MTM0YTRlNzVlNDk3YWY2YmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T3mfeJN9v6bdDsimYDYgD5gIxsObvH4jN4RaPQ6HXdA";

  // getElement로 html 요소 가져오기
  const mainContainer = document.getElementById("main-container");
  const search = document.getElementById("search");
  const btn = document.getElementById("search_btn");

  // 영화 배열 addEvent 전용
  let movieList;
  // 받아온 영화 배열
  let moviesArray;

  // 영화 세부정보 가져오기 함수
  const getMovieDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      // 동적으로 모달 생성
      const modal = document.createElement("div");
      modal.classList.add("modal");

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close-btn");
      closeBtn.textContent = "×";

      const title = document.createElement("h2");
      title.textContent = data.title;

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;

      const description = document.createElement("p");
      description.textContent = data.overview;

      const releaseDate = document.createElement("p");
      releaseDate.textContent = `개봉일: ${data.release_date}`;

      const rating = document.createElement("p");
      rating.textContent = `평점: ${data.vote_average}`;

      modalContent.appendChild(closeBtn);
      modalContent.appendChild(img);
      modalContent.appendChild(title);
      modalContent.appendChild(description);
      modalContent.appendChild(releaseDate);
      modalContent.appendChild(rating);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modal.remove(); // 모달 제거
      });

      window.addEventListener("click", () => {
        modal.style.display = "none";
        modal.remove();
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 영화 검색 함수
  const searchMovies = async () => {
    const keyword = search.value;
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      moviesArray = data.results;

      paintMovieList(moviesArray);
    } catch (err) {
      console.error(err);
    }
  };

  // 인기순으로 영화 가져오기 함수
  const getPopularMovieList = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    // fetch는 Response promise 객체를 반환함
    // Response http 응답에 대한 정보를 담고있음 (상태코드, 헤더, 응답 본문)
    // res.json은 Response객체의 메서드 HTTP응답 본문을 JSON 데이터 담긴 Promise반환
    // 즉 Promise가 반환되었으므로 .then을 한번더 사용하여 데이터가 준비된 후 처리
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      moviesArray = data.results;

      paintMovieList(moviesArray);
    } catch (err) {
      console.error(err);
    }
  };

  // 영화 content 그리기 함수
  const paintMovieList = () => {
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
    movieList = document.querySelectorAll(".movie-list");
    console.log(movieList);
    for (let item of movieList) {
      item.addEventListener("click", () => {
        getMovieDetails(item.dataset.id);
      });
    }
  };

  const paintModal = () => {};
  // 나중에 쓸 함수
  const getRatedMovieList = () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log("top Rated", json))
      .catch((err) => console.error(err));
  };
  const getPlayingMovieList = () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log("paying", json))
      .catch((err) => console.error(err));
  };

  // EventListener 모음
  btn.addEventListener("click", searchMovies);
  getPopularMovieList();
});
