import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchMusics = () => API.get("/my-beats");
export const addMusic = (music) =>
  API.post("/my-beats", music, {
    headers: {
      "admin-token": process.env.REACT_APP_SECRET_TOKEN,
    },
  });
export const deleteMusic = (id) =>
  API.delete(`/my-beats/${id}`, {
    headers: {
      "admin-token": process.env.REACT_APP_SECRET_TOKEN,
    },
  });
export const addReview = (review) => API.post("/reviews", review);
