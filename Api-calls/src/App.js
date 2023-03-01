import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
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

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get("https://crudcrud.com/api/dd4a533c0f4e4729bf7f6e26bf19011c/movies")
      console.log(res);

      if (!res.status) {
        throw new Error("Something went wrong ....Retrying");
      }
      setMovies(res.data);
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

  const addMovieHandler = async (movie) => {
    try {
      await axios.post('https://crudcrud.com/api/dd4a533c0f4e4729bf7f6e26bf19011c/movies', movie)
      fetchMovieHandler();
    } catch (err) {
      console.log(err);
    }
  }

  const deleteMovieHandler = async (id) => {
    try {
      await axios.delete(`https://crudcrud.com/api/dd4a533c0f4e4729bf7f6e26bf19011c/movies/${id}`)
      fetchMovieHandler();
    } catch (err) {
      console.log(err);
    }
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
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} deleteMovieHandler={deleteMovieHandler}/>}
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
