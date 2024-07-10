import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import MovieCard from "../MovieCard";
import NavBar from "../NavBar";
import Pagination from "../Pagination";

import "./index.css";

const TopRated = () => {
  const [isLoading, setLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState({});

  const getUpdatedData = (responseData) => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map((eachMovie) => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  });

  const getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = "f32b79895b21468afbdd6d5342cbf3da";
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const newData = getUpdatedData(data);
    setLoading(false);
    setApiResponse(newData);
  };

  useEffect(() => {
    getTopRatedMoviesResponse();
  }, []);

  const renderLoadingView = () => (
    <div className="loader-container">
      <TailSpin type="TailSpin" color="#032541" />
    </div>
  );

  const renderPopularMoviesList = () => {
    const { results } = apiResponse;

    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map((movie) => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    );
  };

  return (
    <>
      <NavBar />
      <div className="route-page-body">
        {isLoading ? renderLoadingView() : renderPopularMoviesList()}
      </div>
      <Pagination
        totalPages={apiResponse.totalPages}
        apiCallback={getTopRatedMoviesResponse}
      />
    </>
  );
};

export default TopRated;
