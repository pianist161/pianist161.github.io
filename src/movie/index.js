const apiKey = "8f25da898b3eeadfd22e29c26006eaeb";
const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=`;
const main = document.querySelector("main");
const imageUrl = "https://image.tmdb.org/t/p/w500";
async function getPopularMovies() {
  try {
    const {
      data: { results },
    } = await axios(popularMovieUrl + apiKey);
    renderMovies(results);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}
const renderMovies = (movies) => {
  movies.forEach((elemnt) => {
    const cards = ` <div class="card" style="width: 10rem;" id=${elemnt.id}>
    <img src="${imageUrl + elemnt.poster_path}" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="card-title">${elemnt.original_title}</div>
   
    </div>
  </div>`;
    const btns = document.querySelectorAll(".card");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // console.log(this.id);
        location.href = `index.html?movieId=${this.id}`;
      });
    });
    main.insertAdjacentHTML("beforeend", cards);
  });
};
const renderMovieCard = (movieId) => {
  const card = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>`;
};
getPopularMovies();
