import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import useSWR from "swr";
import MovieCard from "./MovieCard";
import { fetcher, tmdbAPI } from "../../config/Config";
const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  console.log(data);
  const movies = data?.results || [];
  console.log(movies);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item, index) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
