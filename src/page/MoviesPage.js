import React, { useEffect, useState } from "react";
import MovieCard from "components/movies/MovieCard";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI, tmdbEndPoint } from "config/Config";
import useDebouce from "hooks/useDebouce";
import ReactPaginate from "react-paginate";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import MovieList from "components/movies/MovieList";

const itemsPerPage = 20;
const MoviesPage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [fillter, setFillter] = useState("");
  const fillerDebouce = useDebouce(fillter, 500);
  const [url, setUrl] = useState(tmdbAPI.getMovies("top_rated", nextPage));
  // const handleFillter = (e) => {
  //   setFillter(e.target.value);
  // };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (fillerDebouce) {
      setUrl(
        `${tmdbEndPoint}?api_key=${apiKey}&query=${fillerDebouce}&page=${nextPage}`
      );
    } else {
      setUrl(`${tmdbEndPoint}/top_rated?api_key=${apiKey}&page=${nextPage}`);
    }
  }, [fillerDebouce, nextPage]);
  useEffect(() => {
    if (!data?.total_results) return null;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setNextPage(event.selected + 1);
    setItemOffset(newOffset);
  };
  if (!data) return null;

  const movies = data.results || [];

  console.log(movies);
  return (
    <div className="py-10 page-container">
      <div className="flex mb-20 ">
        {/* <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white  rounded-lg"
            placeholder=" Type here to search..."
            onChange={handleFillter}
          />
        </div> */}
        {/* <button className="p-4 bg-primary text-white rounded-lg">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button> */}
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin"></div>
      )}

      {!loading && movies.length > 0}
      <MovieList></MovieList>
      <MovieList type="popular"></MovieList>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviesPage;
