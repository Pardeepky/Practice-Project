import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieHandler = async() => {
    try{
      setIsLoading(true);
    await fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.results.map(movieData=> {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        })
        setMovies(transformedMovies);
      });
    } catch (err) {
      console.log(err);
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <Loader />}
        {!isLoading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
