import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import SearchResult from "./scenes/searchResult/SearchResult";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SingleImage from "./scenes/singleImage/SingleImage";
import SingleImageDashboard from "./scenes/singleImage/SingleImageDashboard";
import SignIn from "./scenes/auth/SignIn";
import SignUp from "./scenes/auth/SignUp";
import { useEffect } from "react";
import { verifyUser } from "./state/userSlice";
import Policy from "./scenes/Policy";
import { fetchPosts } from "./state/postsSlice";
import About from "./scenes/About";
import Terms from "./scenes/Terms";
import Profile from "./scenes/profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./scenes/NotFound";
import Footer from "./scenes/global/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { currPage } = useSelector((state) => state.postsReducer, shallowEqual);

  useEffect(() => {
    dispatch(verifyUser());
  }, []);

  useEffect(() => {
    dispatch(fetchPosts(currPage));
  }, [currPage]);

  const { userReducer, formReducer } = useSelector(
    (state) => state,
    shallowEqual
  );
  const { user } = userReducer;
  const { prompt, images } = formReducer;
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route
            path="/search/single"
            element={
              <PrivateRoute>
                {prompt && images.length ? (
                  <SingleImageDashboard />
                ) : (
                  <Navigate to="/" />
                )}
              </PrivateRoute>
            }
          >
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <SingleImage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={user ? <Navigate to="/" /> : <SignIn />}
          />
          <Route path="/policies/content-policy" element={<Policy />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
