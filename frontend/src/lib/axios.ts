import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "http://localhost:5000/api";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

//Logout handler
let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
    logoutHandler = handler;
};

const getCsrfToken = (): string | null => {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1] || null;
};

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

let isRefreshing = false;

let failedQueue: {
    resolve: () => void;
    reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve();
    });
    failedQueue = [];
}

//Request interceptor
api.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();

    if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
    }

    return config;
})


//Response interceptor
api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (!error.response) {
            return Promise.reject(error);
        }

        const status = error.response.status;

        const isAuthRoute =
            originalRequest.url?.includes("/auth/refresh") ||
            originalRequest.url?.includes("/auth/register") ||
            originalRequest.url?.includes("/auth/verify") ||
            originalRequest.url?.includes("/auth/googleLogin") ||
            originalRequest.url?.includes("/admin/login");

        if (status === 401 && !originalRequest._retry && !isAuthRoute) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve(api(originalRequest)),
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const isAdminRoute = originalRequest.url?.startsWith("/admin");

                const refreshUrl = isAdminRoute
                    ? "/admin/refresh"
                    : "/auth/refresh";

                await api.post(refreshUrl);

                processQueue(null);

                return api(originalRequest);
            } catch (error) {
                processQueue(error);

                if (logoutHandler) {
                    logoutHandler();
                }

                return Promise.reject(error)
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
)

export default api;