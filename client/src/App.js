import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import SearchResult from "./scenes/searchResult/SearchResult";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import SingleImage from "./scenes/singleImage/SingleImage";
import SingleImageDashboard from "./scenes/singleImage/SingleImageDashboard";
import SignIn from "./scenes/auth/SignIn";
import SignUp from "./scenes/auth/SignUp";
import { useEffect } from "react";
import { clearUser, setUser, verifyUser } from "./state/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUser())
      .then((data) => {
        dispatch(setUser(data.data.user));
      })
      .catch((err) => {
        dispatch(clearUser());
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/search/single" element={<SingleImageDashboard />}>
            <Route path=":id" element={<SingleImage />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
