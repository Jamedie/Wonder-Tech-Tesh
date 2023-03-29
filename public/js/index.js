window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const result = document.getElementById('result');
  const recentResult = document.getElementById('recent-result');
  const loadingScreen = document.querySelector('loading-Screen');

  let search = '';
  //movie stored
  let response;
  let movies = [];
  let URL = `https://europe-west1-movie-api-recruitment.cloudfunctions.net/movies`;

  const fetchMovies = async () => {
    response = await fetch(URL);
    return await response.json();
  };

  displayMovies = async () => {
    movies = await fetchMovies();

    console.log(movies);

    let sorted_movies = movies
      .sort(function (a, b) {
        return a.date - b.date;
      })
      .reverse();
    //Display recent movies
    recentResult.innerHTML = sorted_movies
      .slice(0, 4)
      .map(
        (movie, index) =>
          `
            <ul>
                <li class="card-content">  
                    <img src="${movie.thumbnail}" alt='Image Not Found'>
                    <design-number>${index + 1}</design-number>
                </li>
            </ul>
            `
      )
      .join('');

    result.innerHTML = sorted_movies
      .slice(4)
      .map(
        (movie) =>
          `
            <ul>
                <li class="card-content">  
                    <img src="${movie.thumbnail}" alt='Image Not Found'> </img>              
                </li>
            </ul>
        `
      )
      .join('');

    console.log(movies.results);

    //Hide Loading screen after fetch
    loadingScreen.classList.add('hiden');
  };

  displayMovies();
});

//Result Json
// [
//     {
//           "title": string,
//           "type": string,
//       "date": string,
//       "description": string,
//       "duration": string,
//       "thumbnail": uri,
//           "cover": uri,
//     }
//   ]
