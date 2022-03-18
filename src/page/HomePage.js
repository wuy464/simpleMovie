import React from "react";
import MovieList from "components/movies/MovieList";

const HomePage = () => {
  return (
    <div>
      <section className="movie-layout page-container mb-20 ">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movie-layout page-container mb-20  ">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top Rated
        </h2>

        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movie-layout page-container mb-20  ">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Treding
        </h2>

        <MovieList type="popular"></MovieList>
      </section>
    </div>
  );
};

export default HomePage;
