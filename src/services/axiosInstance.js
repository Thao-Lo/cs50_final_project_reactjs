import axios from "axios";
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:8080/api/v1'

const axiosInstance = axios.create({
    baseURL: API_URL, //standard key
    headers: { 'Content-Type': 'application/json' }
})

//add Authorization to headers if accesstoken is present
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

//handle unAuthorized status 401 and check for refresh token if accessToken expired
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            //get refreshToken from cookies
            const refreshToken = Cookies.get('refreshToken');
            if (refreshToken) {
                try {
                    //send api to backend to ask for new accessToken
                    const res = axios.post(`${API_URL}/refresh-token`, {
                        request: refreshToken
                    });
                    const accessToken = (await res).data;
                    Cookies.set('accessToken', accessToken, { expires: 1 / 24 });
                    //add new accessToken to error config 
                    error.config.headers.Authorization = `Bearer ${accessToken}`
                    // and send original request back to be with valid authorization
                    return axiosInstance(error.config)
                } catch (refreshError) {
                    console.log("Failed refresh Token");
                    Cookies.remove('accessToken')
                    Cookies.remove('refreshToken')
                    window.location.href = '/login'
                }
            } else {
                // cant find refreshToken will redirect to login page
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