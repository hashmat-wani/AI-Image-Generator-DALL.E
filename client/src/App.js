import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/home/Home";
import SearchResult from "./scenes/searchResult/SearchResult";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

// const Test = () => {
//   return (
//     <div style={{ textAlign: "center" }}>
//       <div
//         style={{
//           background: "#0a66c2",
//           padding: "30px",
//           // textAlign: "center",
//           color: "white",
//         }}
//       >
//         <h1>Thankyou for choosing DALL.E</h1>
//         <p>Verify Your E-mail Address</p>
//       </div>
//       <h1>Hi,</h1>
//       <p>You're almost ready to start enjoying DALL.E.</p>
//       <p>
//         Simply confirm that hashmatw555@gmail.com is your e-mail address by
//         using this code:
//       </p>
//       <div style={{ padding: "20px" }}>
//         <h1>2367</h1>
//         <p>This code will expire in 1 hour</p>
//         <p>Thanks</p>
//       </div>
//       <div style={{ background: "lightgray", padding: "30px" }}>
//         <h1>Get in touch</h1>
//         <p>
//           <a href="tel:7006600835">7006600835</a>
//         </p>
//         <p>
//           <a href="mailto:hashmatwani@icloud.com">hashmatwani@icloud.com</a>
//         </p>
//       </div>
//     </div>
//   );
// };

function App() {
  const [emailVerificationAlert, setEmailVerificationAlert] = useState(false);

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
  // console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar {...{ setEmailVerificationAlert }} />
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
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <SignIn {...{ setEmailVerificationAlert }} />
              )
            }
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
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
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
      </BrowserRouter>
      ;
    </div>
  );
}

export default App;
