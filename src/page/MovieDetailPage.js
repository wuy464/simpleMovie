import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "components/movies/MovieCard";
import { fetcher, tmdbAPI } from "config/Config";

const MoviesDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { poster_path, title, genres, overview } = data;
  console.log(data);
  return (
    <>
      <div className="h-[550px] w-full page-container relative ">
        <div className="absolute bg-black inset-0 bg-opacity-60"></div>
        <div
          className="w-full h-full bg-no-repeat "
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -translate-y-2/4 select-none -mt-[50px] relative z-10">
        <img
          src={tmdbAPI.imageSrc(poster_path, "original")}
          alt=""
          className=" w-full h-full object-cover rounded-xl object-center"
        />
      </div>
      <h2 className="mx-auto text-3xl text-center -mt-[150px] mb-10">
        {title}
      </h2>
      {genres.length > 0 && (
        <div className=" flex items-center gap-x-5 mb-10 text-primary justify-center">
          {genres.map((item) => (
            <span
              className="border  border-primary p-2 rounded-lg  "
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="mx-auto text-center max-w-[600px] w-full mb-10">
        {overview}
      </p>

      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  console.log(data);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div>
      <h2 className="text-center text-2xl mb-10 ">Cast</h2>
      <div className="movie-details grid grid-cols-4 gap-5 page-container">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageSrc(item.profile_path, "original")}
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              alt=""
            />
            <h3 className="text-center text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieVideo() {
  //
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  console.log(data);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className=" py-10 page-container mt-20 ">
      {results.slice(0, 2).map((item) => (
        <div key={item.id}>
          <h3 className="movie-videos font-medium text-2xl bg-primary p-3 inline-block rounded-lg">
            {item.name}
          </h3>
          <div key={item.id} className="aspect-video w-full mb-20">
            <iframe
              width="900"
              height="506"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-fill"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  console.log(data);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl mb-10 "> Simimar</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MoviesDetailPage;
