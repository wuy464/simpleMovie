import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config/Config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = ({ item }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  const movies = data?.results || [];
  console.log(movies);

  return (
    <section className="banner h-[500px] mb-20 overflow-hidden page-container">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { original_title, backdrop_path, id } = item;

  const navigate = useNavigate();
  return (
    <div className="w-full h-full  rounded-lg relative  ">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        className="w-full h-full object-cover rounded-lg object-top"
        src={tmdbAPI.imageSrc(backdrop_path, "original")}
        alt=""
      />
      <div className="absolute left-5 bottom-5 w-full text-white ">
        <h2 className="font-bold text-3xl mb-5">{original_title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="p-2 px-4 border border-white rounded-md">
            Avengers
          </span>
          <span className="p-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="p-2 px-4 border border-white rounded-md">Drama</span>
        </div>
        <Button
          className="inline-block w-auto"
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
}
export default Banner;
