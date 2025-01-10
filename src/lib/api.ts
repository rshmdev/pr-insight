import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: URL,
});
