import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry: boolean
}

const getCsrfToken = () => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1]
}

const api = axios.create({
    baseURL:BACKEND_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();

    if(csrfToken){
        config.headers["x-csrf-token"] = csrfToken;
    }

    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError ) => {
        console.log("Interceptor caught error:" error.response?.status);
        const originalRequest = error.config as CustomAxiosRequestConfig

        if(!error.response){
            console.error("Network error or server not reachable")
            return Promise.reject(error)
        } 
    }
)