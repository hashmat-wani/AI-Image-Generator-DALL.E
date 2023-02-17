import { store } from "../state/store";
import axios from "axios";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";
import { refreshToken } from "../state/userSlice";
import { toast } from "react-toastify";

const baseURL = MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API;
export const instance = axios.create({
  baseURL,
});

export const privateInstance = axios.create({
  baseURL,
  withCredentials: true,
});

privateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { message } = error?.response?.data || error;
    // if jwt access_token is expired generate new access_token with refreshtoken
    if (message === "jwt expired") {
      return store
        .dispatch(refreshToken())
        .then(() => axios(error.config)) //calling same api back here
        .catch((err) => {
          alert("Your session has timed out. Please login again.");
          window.location.href = `${window.location.origin}/signin`;
          return Promise.reject(err);
        });
    } else {
      return Promise.reject(error);
    }
  }
);
