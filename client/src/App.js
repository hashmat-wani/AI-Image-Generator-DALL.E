import "./App.css";
import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import SearchResult from "./scenes/searchResult/SearchResult";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import SingleImage from "./scenes/singleImage/SingleImage";
import SingleImageDashboard from "./scenes/singleImage/SingleImageDashboard";

function App() {
  const state = useSelector((state) => state.formReducer, shallowEqual);
  console.log(state);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/search/single" element={<SingleImageDashboard />}>
            <Route path=":id" element={<SingleImage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
