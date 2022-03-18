import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config/Config";
import Button from "components/button/Button";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 select-none ">
      <img
        className="w-full h-[300px] mb-5 rounded-lg object-cover"
        src={tmdbAPI.imageSrc(poster_path, "w500")}
        alt=""
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xl mb-3 movie-title">{title}</h3>
        <div className="flex items-center justify-between text-white text-sm opacity-50 mb-5">
          <span>{release_date}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} bgColor="primary">
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
