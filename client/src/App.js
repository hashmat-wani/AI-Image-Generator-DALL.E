import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import SearchResult from "./scenes/searchResult/SearchResult";
import { Navigate, Route, Routes } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SingleImage from "./scenes/singleImage/SingleImage";
import SingleImageDashboard from "./scenes/singleImage/SingleImageDashboard";
import SignIn from "./scenes/auth/SignIn";
import SignUp from "./scenes/auth/SignUp";
import { useEffect, useState } from "react";
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
import VerifyEmail from "./scenes/auth/VerifyEmail";
import VerifyEmailAlert from "./components/verifyEmailAlert";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import UserPosts from "./scenes/UserPosts";
import { useContext } from "react";
import { backdropContext } from "./context/BackdropContext";
import useDebounce from "./hooks/useDebounce";
import Collections from "./scenes/Collections";
import SavedPosts from "./components/SavedPosts";
import ResetPwd from "./scenes/auth/resetPassword/ResetPwd";
import ResetPwdInstructions from "./scenes/auth/resetPassword/ResetPwdInstructions";
import NewPassword from "./scenes/auth/resetPassword/NewPassword";

function App() {
  const [emailVerificationAlert, setEmailVerificationAlert] = useState(false);

  const dispatch = useDispatch();

  const { openBackdrop, toggleBackdrop, backdropMsg } =
    useContext(backdropContext);
  const { searchPost } = useSelector(
    (state) => state.postsReducer,
    shallowEqual
  );

  const { email } = useSelector((state) => state.resetPwdReducer, shallowEqual);

  const debouncedSearch = useDebounce(searchPost);

  useEffect(() => {
    dispatch(fetchPosts({ searchPost }));
  }, [debouncedSearch]);

  const { userReducer, formReducer } = useSelector(
    (state) => state,
    shallowEqual
  );
  const { user } = userReducer;
  const { posts } = formReducer;

  useEffect(() => {
    dispatch(verifyUser({ toggleBackdrop }));
  }, []);

  return (
    <div className="App">
      <Navbar {...{ setEmailVerificationAlert }} />
      <Box flex={1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchResult />
              </PrivateRoute>
            }
          />
          <Route
            path="/search/single"
            element={
              <PrivateRoute>
                {posts.length ? <SingleImageDashboard /> : <Navigate to="/" />}
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
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <SignIn {...{ setEmailVerificationAlert }} />
              )
            }
          />
          <Route
            path="/reset-password"
            element={user ? <Navigate to="/" /> : <ResetPwd />}
          />
          <Route
            path="/reset-password/instructions"
            element={
              user ? (
                <Navigate to="/" />
              ) : email ? (
                <ResetPwdInstructions />
              ) : (
                <Navigate to="/reset-password" />
              )
            }
          />
          <Route
            path="/new-password"
            element={user ? <Navigate to="/" /> : <NewPassword />}
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
          <Route
            path="/verifyemail"
            element={user && !user?.verified ? <VerifyEmail /> : <Home />}
          />
          <Route
            path="/userposts"
            element={
              <PrivateRoute>
                <UserPosts />
              </PrivateRoute>
            }
          />

          <Route
            path="/collections"
            element={
              <PrivateRoute>
                <Collections />
              </PrivateRoute>
            }
          />

          <Route
            path="/collections/:slug/:id"
            element={
              <PrivateRoute>
                <SavedPosts />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
      <VerifyEmailAlert
        {...{ emailVerificationAlert, setEmailVerificationAlert }}
      />
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <Stack alignItems="center" px="10px">
          <CircularProgress color="inherit" />
          {backdropMsg && (
            <Typography textAlign="center" fontSize="18px">
              {backdropMsg}
            </Typography>
          )}
        </Stack>
      </Backdrop>
    </div>
  );
}

export default App;
