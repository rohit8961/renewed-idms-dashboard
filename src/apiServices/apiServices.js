// import config from "@/config";
import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 10000, // optional timeout

});

ApiService.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log('Error status:', error.response.status);
      // console.log('Error data:', error.response.data);
      // console.log('Error headers:', error.response.headers);
      // return error.response

      // Customize the error response using the API response data
      const customError = {
        status: error.response.status,
        message: error.response.data.message || "Unknown error occurred",

      };

      // Throw the customized error
      return Promise.reject(customError);
    } else if (error.request) {
      // The request was made but no response was received
      // console.log("Error request:", error.request);
      // Handle network errors or timeouts here
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error message:", error.message);
    }

    // Return a rejected promise to propagate the error
    return Promise.reject(error);
  }
);

export default ApiService;
