const apiKey = "8f25da898b3eeadfd22e29c26006eaeb";
const movieUrl = `https://api.themoviedb.org/3/movie/`;
const imageUrl = "https://image.tmdb.org/t/p/w500";
const main = document.querySelector("main");
const paginationsDiv = document.querySelector(".paginations");
const moviesDiv = document.querySelector(".movies");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const topRated = document.querySelector("#top-rated");

// Функция для выполнения API запросов
async function fetchMovies(url, page = 1) {
  try {
    const response = await axios.get(`${url}&page=${page}&api_key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

// Получение популярных фильмов
async function getPopularMovies(page = 1) {
  const movies = await fetchMovies(
    "https://api.themoviedb.org/3/movie/popular?language=en-US",
    page
  );
  renderMovies(movies);
  createPaginations(getPopularMovies, page);
}

// Получение фильмов с высоким рейтингом
async function getTopRatedMovies(page = 1) {
  const movies = await fetchMovies(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
    page
  );
  renderMovies(movies);
  createPaginations(getTopRatedMovies, page); // Создание пагинации для фильмов с высоким рейтингом
}

// Поиск фильмов по названию
async function searchMovies(titleMovie, page = 1) {
  const movies = await fetchMovies(
    `https://api.themoviedb.org/3/search/movie?query=${titleMovie}&language=en-US`,
    page
  );
  renderMovies(movies);
  createPaginations((page) => searchMovies(titleMovie, page), page);
}

// Получение данных одного фильма по его ID
async function getMovie(movieId) {
  try {
    const { data } = await axios(`${movieUrl}${movieId}?api_key=${apiKey}`);
    renderMovieCard(data);
  } catch (error) {
    console.log(error);
  }
}

// Рендеринг карточек фильмов
const renderMovies = (movies) => {
  moviesDiv.innerHTML = ""; // Очищаем контейнер перед добавлением новых элементов

  movies.forEach((element) => {
    if (element.poster_path) {
      const card = `
        <div class="card" style="width: 10rem;" id=${element.id}>
            <img src="${
              imageUrl + element.poster_path
            }" class="card-img-top" alt="${element.original_title}">
            <div class="card-body">
                <div class="card-title">${element.original_title}</div>
            </div>
        </div>`;
      moviesDiv.insertAdjacentHTML("beforeend", card);
    }
  });

  // Привязываем обработчики событий после добавления карточек в DOM
  const btns = document.querySelectorAll(".card");
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      location.href = `index.html?movieId=${this.id}`;
    });
  });
};

// Рендеринг детальной информации о фильме
const renderMovieCard = (movie) => {
  main.innerHTML = ""; // Очищаем контейнер перед добавлением нового элемента
  const card = `
        <div class="card movie-card mt-5">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${
                      imageUrl + (movie.poster_path || "placeholder.jpg")
                    }" class="card-img" alt="Movie Poster">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${
                          movie.original_title || "Название не указано"
                        }</h5>
                        <p class="card-text rating">Рейтинг: ${
                          movie.vote_average.toFixed(2) || "N/A"
                        }</p>
                        <p class="card-text"><strong>Жанры:</strong> ${genres(
                          movie.genres
                        )}</p>
                        <p class="card-text"><strong>Год:</strong> ${
                          movie.release_date
                            ? movie.release_date.split("-")[0]
                            : "N/A"
                        }</p>
                        <p class="card-text"><strong>Описание:</strong> ${
                          movie.overview || "Описание недоступно"
                        }</p>
                        <div class="play-btn">
                            <button class="btn btn-primary" id="btnWatch">ТРЕЙЛЕР</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

  main.insertAdjacentHTML("beforeend", card);

  const btnWatchFilm = document.querySelector("#btnWatch");
  btnWatchFilm.addEventListener("click", () => {
    getVideoMovie(movie.id);
  });
};

// Функция для отображения жанров
const genres = (genres) => {
  if (!genres || genres.length === 0) return "Жанры не указаны";
  return genres.map((genre) => genre.name).join(", ");
};

// Получение и отображение трейлера фильма
async function getVideoMovie(movieId) {
  try {
    const { data } = await axios(
      `${movieUrl}${movieId}/videos?api_key=${apiKey}`
    );
    renderVideoMovie(data.results); // Обработка массива results
  } catch (error) {
    console.log(error);
  }
}

const renderVideoMovie = (videos) => {
  const trailer = videos.find((video) => video.type === "Trailer"); // Ищем трейлер
  if (trailer) {
    // Проверяем, существует ли контейнер для трейлера
    const existingVideo = document.querySelector(".video");
    if (existingVideo) {
      existingVideo.remove(); // Удаляем предыдущий трейлер
    }

    const element = document.createElement("div");
    const video = `
        <div class="video">
            <iframe width="1080px" height="600px" src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>
        </div>`;

    element.insertAdjacentHTML("beforeend", video);
    main.appendChild(element); // Предполагается, что main уже определен
  } else {
    console.log("Трейлер не найден");
  }
};

// Функция для создания кнопок пагинации
const createPaginations = (callback, page = 1) => {
  paginationsDiv.innerHTML = ""; // Очищаем блок пагинации перед добавлением новых кнопок
  for (let index = 1; index <= 10; index++) {
    const paginations = document.createElement("button");
    paginations.textContent = index;
    paginations.classList.add("pagination-button");
    if (index === page) {
      paginations.classList.add("active");
    }

    paginations.addEventListener("click", () => {
      callback(index);
    });

    paginationsDiv.append(paginations);
  }
};

// Обработка событий загрузки страницы и поиска
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("movieId");
  const pageId = parseInt(params.get("page")) || 1;
  const search = params.get("search");
  const topRatedFlag = params.get("top-rated");

  if (movieId) {
    getMovie(movieId);
  } else if (search) {
    searchMovies(search, pageId);
  } else if (topRatedFlag) {
    getTopRatedMovies(pageId);
  } else {
    getPopularMovies(pageId);
  }
});

// Обработка поиска
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    location.href = `index.html?search=${searchQuery}`;
  }
});

// Обработка клика по кнопке для фильмов с высоким рейтингом
topRated.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = `index.html?top-rated=true&page=1`;
});
