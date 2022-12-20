API_ENDPOINT = "http://www.omdbapi.com/?";
API_KEY = "ba81ecf8";
SEARCH = "Blade Runner";

const title = document.getElementById("title");
const year = document.getElementById("year");
const runtime = document.getElementById("runtime");
const poster = document.getElementById("poster");
const btn = document.getElementById("btn-submit");
const errorWarn = document.getElementById("error-warn");
const errorWarnToggle = false;
const searchBar = document.getElementById("searchbar");

//returns a Promise containing json data about the movie searched
const getMovie = async (search) => {
  const movie = await fetch(
    API_ENDPOINT + "t=" + search + "&apikey=" + API_KEY
  );
  return movie.json();
};

const updateMovie = (movie) => {
  title.textContent = movie.Title;
  year.textContent = movie.Year;
  runtime.textContent = movie.Runtime;
  poster.src = movie.Poster;
};

const handleSubmit = async () => {
  const movie = await getMovie(searchBar.value);
  movie.Response === "False" && !errorWarnToggle
    ? (errorWarn.textContent = "Movie not found. Please try again...")
    : (errorWarn.textContent = "");
  updateMovie(movie);
};

btn.addEventListener("click", handleSubmit);
searchBar.addEventListener("input", handleSubmit);
getMovie(SEARCH).then(
  (res) => updateMovie(res),
  (rej) => console.error(rej)
);
