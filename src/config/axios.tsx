import Axios, { AxiosInstance } from "axios";

const axiosWithoutAuth: AxiosInstance = Axios.create({
    baseURL: "https://idcardapi.brandradiator.in/api/v1"
});

export default axiosWithoutAuth;


