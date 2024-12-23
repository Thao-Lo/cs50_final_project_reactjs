import axios from "axios";
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:8080/api/v1'

const axiosInstance = axios.create({
    baseURL: API_URL, //standard key
    headers: { 'Content-Type': 'application/json' }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config

    },
    (error) => { return Promise.reject(error) }
)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const refreshToken = Cookies.get('refreshToken');
            if (refreshToken) {
                try {
                    const res = axios.post(`${API_URL}/refresh-token`, {
                        request: refreshToken
                    });
                    const accessToken = (await res).data;
                    Cookies.set('accessToken', accessToken, { expires: 1 / 24 });
                    error.config.headers.Authorization = `Bearer ${accessToken}`
                    return axiosInstance(error.config)
                } catch (refreshError) {
                    console.log("Failed refresh Token");
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                    window.location.href = '/login'
                }
            } else {
                Cookies.remove('accessToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error)
    }
)


export const handleError = (error, defaultMessage) => {
    if (error.response) {
        //server error
        const errorMessage = error.response.data.error || defaultMessage
        return { error: true, message: errorMessage }
    } else {
        //client error
        return { error: true, message: error.message };
    }
}

export default axiosInstance;