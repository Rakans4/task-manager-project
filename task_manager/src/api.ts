import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getApiClient = (token: string | null) =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
