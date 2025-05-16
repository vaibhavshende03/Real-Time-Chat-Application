import axios from "axios";
export const baseUrl="http://localhost:8080";
export const  httpClient = axios.create({
  baseURL: baseUrl,
    timeout: 10000,

  headers: {
    "Content-Type": "text/plain",
  },
});