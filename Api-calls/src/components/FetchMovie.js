import React, { useState } from "react";
import MovieList from "./MoviesList";
import styled from "styled-components";
const FetchMovie = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovieHandler = async() => {
    try{
    await fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        console.log("data", data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <section>
        <Button onClick={fetchMovieHandler}>Fetch Movies</Button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </div>
  );
};

export default FetchMovie;

const Button = styled.button`
  width: 20%;
  background: purple;
  color: white;
  border: none;
  padding: 7px;
  border-radius: 5px;
  font-weight: 700;
`;