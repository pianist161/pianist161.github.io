import movies from "./movies.js";

const myDiv = document.querySelector(".movies");
const myDivfavorites = document.querySelector(".favorites");
const favorites = [];
const renderMovies = (movies) => {
  myDiv.innerHTML = "";
  movies.forEach(({ overview, popularity, poster_path, title }, index) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const movieHTML = `
    
      <div class="movie-card">
      
        <div class="poster" style="background-image: url('${posterUrl}')"></div>
        <div class="text-movie">
        <div class="movie-info-${index}">
          <h3 class="title">${title}</h3>
          <p class="popularity">Popularity: ${popularity}</p>
          <p class="overview">${overview}</p>
          
</div>
        </div>
      </div>
     
    `;
    const button = document.createElement("button");

    myDiv.insertAdjacentHTML("beforeend", movieHTML);
    const movieinfo = document.querySelector(`.movie-info-${index}`);
    button.addEventListener("click", () => {
      addToFavorites(title);
      renderFavorites();
    });
    button.textContent = "Add to favorites ";
    button.classList.add("addButton");
    movieinfo.append(button);
  });
};
const addToFavorites = (movie) => {
  if (!favorites.includes(movie)) {
    favorites.push(movie);
  }
};
const removeMovie = (index) => {
  favorites.splice(index, 1);
  renderFavorites();
};
const renderFavorites = () => {
  myDivfavorites.textContent = "";
  favorites.forEach((item, index) => {
    const titleMovie = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const hr = document.createElement("hr");
    titleMovie.textContent = item;
    titleMovie.classList.add("moviefavorites");
    buttonDelete.textContent = "X";
    buttonDelete.classList.add("buttonDelete");
    titleMovie.append(buttonDelete);
    myDivfavorites.append(titleMovie, hr);
    buttonDelete.addEventListener("click", () => {
      removeMovie(index);
    });
  });
};
const clearFavorites = document.querySelector(".clearFavorites");
clearFavorites.addEventListener("click", () => {
  favorites.splice(0, favorites.length);
  renderFavorites();
});
// Проверка данных в консоли
console.log(movies);
const inputSearch = document.querySelector(".inputSearch");
inputSearch.addEventListener("change", (event) => {
  const filtermovie = movies.filter((movie) =>
    movie.title.toLowerCase().includes(event.target.value.toLowerCase())
  );
  console.log(filtermovie);
  renderMovies(filtermovie);
});

// Отображение фильмов
renderMovies(movies);
// adult,
// backdrop_path,
// genre_ids,
// id,
// original_language,
// original_title,
// overview,
// popularity,
// poster_path,
// release_date,
// title,
// video,
// vote_average,
// vote_count,
