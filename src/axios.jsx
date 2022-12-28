import axios from "axios";

const API = axios.create({
    baseURL: "https://backend.testeverything.me/api/v1",
});

export default API;
