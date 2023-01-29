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
import {
  clearUser,
  refreshToken,
  setUser,
  verifyUser,
} from "./state/userSlice";
import Policy from "./scenes/Policy";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyUser())
      .then((data) => {
        dispatch(setUser(data.data.user));
      })
      .catch(async (err) => {
        const { message } = err.response?.data || err;
        dispatch(clearUser());
        // if jwt access_token is expired generate new access_token with refreshtoken
        if (message === "jwt expired") {
          dispatch(refreshToken())
            .then(() => dispatch(verifyUser()))
            .then((data) => {
              dispatch(setUser(data.data.user));
            })
            .catch((err) => {
              console.log(err?.response?.data?.message);
            });
        }
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
          <Route path="/policies/content-policy" element={<Policy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
