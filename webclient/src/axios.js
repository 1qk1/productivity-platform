import axios from "axios";

const port = process.env.PORT || 3001;
const ip = process.env.IP || "localhost";

let url = `${ip}:${port}`;

if (process.env.NODE_ENV === "production") {
  url = "";
}

const instance = axios.create({
  baseURL: `${url}/api`
});

export default instance;
