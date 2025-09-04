import axios from "axios";
const API = "http://localhost:5000/api/recipes";

export const fetchRecipes = (page, limit) =>
  axios.get(${API}?page=${page}&limit=${limit});

export const searchRecipes = (params) =>
  axios.get(${API}/search, { params });
