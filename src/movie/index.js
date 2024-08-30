const apiKey = "8f25da898b3eeadfd22e29c26006eaeb";
const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=`;
const movieUrl = `https://api.themoviedb.org/3/movie/`;
const main = document.querySelector("main");
const paginationsDiv = document.querySelector(".paginations");
const moviesDiv = document.querySelector(".movies");
const imageUrl = "https://image.tmdb.org/t/p/w500";

// Получение популярных фильмов
async function getPopularMovies(page = 1) {
  try {
    const {
      data: { results },
    } = await axios(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=` +
        apiKey
    );
    console.log(results);
    renderMovies(results);
  } catch (error) {
    console.log(error);
  }
}

// Получение данных одного фильма по его ID
async function getMovie(movieId) {
  try {
    const { data } = await axios(`${movieUrl}${movieId}?api_key=` + apiKey);
    renderMovieCard(data);
  } catch (error) {
    console.log(error);
  }
}

// Рендеринг карточек популярных фильмов
const renderMovies = (movies) => {
  moviesDiv.innerHTML = ""; // Очищаем контейнер перед добавлением новых элементов
  movies.forEach((element) => {
    const card = `
			<div class="card" style="width: 10rem;" id=${element.id}>
				<img src="${imageUrl + element.poster_path}" class="card-img-top" alt="${
      element.original_title
    }">
				<div class="card-body">
					<div class="card-title">${element.original_title}</div>
				</div>
			</div>`;
    moviesDiv.insertAdjacentHTML("beforeend", card);
  });

  // Привязываем обработчики событий после добавления карточек в DOM
  const btns = document.querySelectorAll(".card");
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      location.href = `index.html?movieId=${this.id}`;
    });
  });
  for (let index = 1; index < 10; index++) {
    const pagButtons = `<nav aria-label="...">
	<ul class="pagination">
	  <li class="page-item disabled">
		<a class="page-link">Previous</a>
	  </li>
	  <li class="page-item"><a class="page-link" href="#">1</a></li>
	  <li class="page-item active" aria-current="page">
		<a class="page-link" href="#">2</a>
	  </li>
	  <li class="page-item"><a class="page-link" href="#">3</a></li>
	  <li class="page-item">
		<a class="page-link" href="#">Next</a>
	  </li>
	</ul>
  </nav>`;
    const paginations = document.createElement("button");
    paginations.textContent = index;

    paginations.addEventListener("click", () => {
      paginationsDiv.innerHTML = "";
      getPopularMovies(index);
    });
    paginationsDiv.append(paginations);
  }
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
						<h5 class="card-title">${movie.original_title || "Название не указано"}</h5>
						<p class="card-text rating">Рейтинг: ${
              movie.vote_average.toFixed(2) || "N/A"
            }</p>
						<p class="card-text"><strong>Жанры:</strong> ${genres(movie.genres)}</p>
						<p class="card-text"><strong>Год:</strong> ${
              movie.release_date ? movie.release_date.split("-")[0] : "N/A"
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
      `${movieUrl}${movieId}/videos?api_key=` + apiKey
    );
    renderVideoMovie(data.results); // Обработка массива results
  } catch (error) {
    console.log(error);
  }
}

const renderVideoMovie = (videos) => {
  const trailer = videos.find((video) => video.type === "Trailer"); // Ищем трейлер
  if (trailer) {
    const video = `
		<div class="video">
			<iframe width="1080px" height="600px" src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe></div>`;
    main.insertAdjacentHTML("beforeend", video);
  } else {
    console.log("Трейлер не найден");
  }
};

// Вызов функции для загрузки популярных фильмов
getPopularMovies();

document.addEventListener("DOMContentLoaded", () => {
  // Получаем параметры из URL
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("movieId");

  // Если в URL присутствует movieId, загружаем данные фильма
  if (movieId) {
    getMovie(movieId);
  }
});
