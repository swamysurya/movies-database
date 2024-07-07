import { Route, Routes } from "react-router-dom";

// imported css file here
import "./App.css";

// imported pages from components directory
import Popular from "./components/Popular";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";

const App = () => (
  // The Routes component acts similar as Switch
  <Routes>
    {/* Route components couples the URL segments to components  */}
    <Route exact path="/" element={<Popular />} />
    <Route exact path="/top-rated" element={<TopRated />} />
    <Route exact path="/upcoming" element={<Upcoming />} />
  </Routes>
);

export default App;
