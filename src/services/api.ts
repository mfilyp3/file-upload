import axios from "axios";

const api = axios.create({
  baseURL: "https://api.imgur.com/",
});

api.defaults.headers.common["Authorization"] = "Client-ID fc7317ed70abed3";

export { api };
