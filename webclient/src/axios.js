import axios from "axios";
import { toast } from "react-toastify";

const port = process.env.PORT || 3001;
const ip = process.env.IP || "localhost";

let url = `http://${ip}:${port}`;

if (process.env.NODE_ENV === "production") {
  url = "";
}

const instance = axios.create({
  baseURL: `${url}/api`,
  timeout: 5000
});

instance.interceptors.response.use(
  config => config,
  error => {
    if (error.code === "ECONNABORTED" || error.response === undefined) {
      toast.error("There was a problem contacting the server");
    }
    return Promise.reject(error);
  }
);

export default instance;
