import axios from "axios";
import { toast } from "react-toastify";

const port = process.env.PORT || 3001;
const ip = process.env.IP || "localhost";

let url = `http://${ip}:${port}`;

const instance = axios.create({
  baseURL: `${url}/api`,
  timeout: 10000
});

instance.interceptors.response.use(
  config => config,
  error => {
    if (error.code === "ECONNABORTED" || error.response === undefined) {
      toast.error("There was a problem contacting the server");
      return new Promise(() => {});
    }
    return Promise.reject(error);
  }
);

export default instance;
