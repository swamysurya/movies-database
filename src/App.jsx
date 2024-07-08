import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// imported css file here
import "./App.css";

// imported pages from components directory
import Popular from "./components/Popular";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";

import SearchMoviesContext from "./context/searchMovieContext";

const API_KEY = "f32b79895b21468afbdd6d5342cbf3da";
const App = () => {
  const [searchResponse, setSearchResponse] = useState({});
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [searchInput, setSearchInput] = useState("");

  const onChangeSearchInput = (text) => setSearchInput(text);

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

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus("IN_PROGRESS");
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    setSearchResponse(getUpdatedData(data));
    setApiStatus("SUCCESS");
  };

  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      {/* // The Routes component acts similar as Switch */}
      <Routes>
        {/* Route components couples the URL segments to components  */}
        <Route exact path="/" element={<Popular />} />
        <Route exact path="/top-rated" element={<TopRated />} />
        <Route exact path="/upcoming" element={<Upcoming />} />
      </Routes>
    </SearchMoviesContext.Provider>
  );
};

export default App;
