import axios, { AxiosResponse, AxiosError } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    if (
      error.config &&
      error.config.url === `${backendUrl}/api/user/revalidateAccessToken`
    ) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      try {
        console.log("Revalidating accessToken....");

        await axios.post(`${backendUrl}/api/user/revalidateAccessToken`, null, {
          withCredentials: true,
        });

        if (error.config) {
          return axios(error.config);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
