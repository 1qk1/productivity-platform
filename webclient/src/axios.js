import axios from "axios";
import { toast } from "react-toastify";
import qs from "qs";

const port = process.env.REACT_APP_PORT || 3001;
const ip = process.env.REACT_APP_IP || "localhost";
const protocol = process.env.REACT_APP_PROTOCOL || "http";

let url = `${protocol}://${ip}:${port}`;

const instance = axios.create({
  baseURL: `${url}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    console.log(config);
    return { ...config, data: qs.stringify(config.data) };
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    console.log(response);
    return { ...response, data: qs.parse(response.data) };
  },
  error => {
    if (error.code === "ECONNABORTED" || error.response === undefined) {
      toast.error("There was a problem contacting the server");
      return new Promise(() => {});
    }
    return Promise.reject(error);
  }
);

export default instance;
