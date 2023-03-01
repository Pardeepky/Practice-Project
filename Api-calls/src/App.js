import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';
import AddMovie from './components/AddMovie';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const retry = () => {
    setRetryCount(retryCount + 1);
    setTimeout(fetchMovieHandler, 5000 * retryCount);
  };

  const fetchMovieHandler =  useCallback(async() => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("https://swapi.dev/api/films")

      if (!res.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await res.json()
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies);
    } catch (err) {
      console.log(err)
      setError(err.message);
      setRetrying(true);
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler])

  function addMovieHandler(movie) {
    console.log(movie);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <h3>Found no movies</h3>}
        {!isLoading && error && !retrying && <h3>{error}</h3>}
        {!isLoading && error && retrying && (
          <React.Fragment>
            <h3>{error}</h3>
            <button onClick={retry}>Retry</button>
            <button onClick={() => {
              setRetrying(false)
              setRetryCount(0)
            }}>Cancel</button>
          </React.Fragment>
        )}
        {isLoading && <Loader />}
      </section>
    </React.Fragment>
  );
}

export default App;
