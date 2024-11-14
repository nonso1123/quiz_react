import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz-api-66hh.onrender.com/",
});

export default api;
