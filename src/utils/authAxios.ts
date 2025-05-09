import axios from "axios";

const authAxios = axios.create({
    baseURL: "http://localhost:8080",
});

authAxios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
        config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
});

authAxios.interceptors.response.use((response) => {
    const newAccessToken = response.headers["x-new-access-token"];
    if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
    }

    return response;
}, (error) => {

    return Promise.reject(error);
});

export default authAxios;
