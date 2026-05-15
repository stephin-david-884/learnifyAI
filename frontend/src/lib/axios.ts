import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "http://localhost:5000/api";

const CSRF_COOKIE = "XSRF-TOKEN";  

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}


let _logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
    _logoutHandler = handler;
};

let blockedHandler: (() => void) | null = null;

export const setBlockedHandler = (handler: () => void) => {
    blockedHandler = handler;
};

function readCookie(name: string): string | null {
    const prefix = `${name}=`;
    const part = document.cookie.split("; ").find((row) => row.startsWith(prefix));
    if (!part) return null;
    return decodeURIComponent(part.slice(prefix.length));
}

function getCsrfTokenForRequest(): string | null {
    return readCookie(CSRF_COOKIE);
}

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
    const csrfToken = getCsrfTokenForRequest();

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

        if (status === 403) {
            if (blockedHandler) {
                blockedHandler();
            }
            return Promise.reject(error);
        }

        const isAuthRoute =
            originalRequest.url?.includes("/user/auth/refresh") ||
            originalRequest.url?.includes("/admin/refresh") ||
            originalRequest.url?.includes("/user/auth/register") ||
            originalRequest.url?.includes("/user/auth/verify") ||
            originalRequest.url?.includes("/user/auth/googleLogin") ||
            originalRequest.url?.includes("/admin/login") ||
            originalRequest.url?.includes("/admin/logout");

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
                const isAdminRoute = originalRequest.url?.includes("/admin");

                const refreshUrl = isAdminRoute
                    ? "/admin/refresh"
                    : "/user/auth/refresh";

                await api.post(refreshUrl);

                processQueue(null);

                return api(originalRequest);
            } catch (error) {
                processQueue(error);

                return Promise.reject(error)
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
)

export default api;