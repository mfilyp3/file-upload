import axios from "axios";

const api = axios.create({
  baseURL: "https://api.imgur.com/",
});

api.defaults.headers.common["Authorization"] = "Client-ID 769e6429728b214";

export { api };
