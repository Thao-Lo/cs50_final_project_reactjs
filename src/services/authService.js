import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', //standard key
    headers: { 'Content-Type': 'application/json' }
})

const API_URL = 'http://localhost:8080/api/v1'

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
const handleError = (error, defaultMessage) => {
    if (error.response) {
        //server error
        const errorMessage = error.response.data.error || defaultMessage
        return { error: true, message: errorMessage }
    } else {
        //client error
        return { error: true, message: error.message };
    }
}

export const login = async (data) => {
    try {
        //axios makes data from object -> JSON
        const res = await axios.post(`${API_URL}/login`, data, {
            // method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(data)
        })

        const result = res.data;
        console.log(result.accessToken);
        if (result.accessToken) {
            Cookies.set('accessToken', result.accessToken, { expires: 1 / 24 })
            Cookies.set('refreshToken', result.refreshToken, { expires: 7 })
        }
        return result;
    } catch (error) {
        return handleError(error, "Login Failed")
    }
}

export const register = async (data) => {
    try {
        const res = await axiosInstance.post(`/register`, data)
        return res.data;

    } catch (error) {
        return handleError(error, "Registration Failed")
    }
}

export const verifyEmail = async (email, code) => {
    try {
        const res = await axiosInstance.post(`/verify-email?email=${email}&code=${code}`)
        return res.data;

    } catch (error) {
        return handleError(error, "Validation failed")
    }
}

export const resendValidationCode = async (email) => {
    try {
        const res = await axiosInstance.post(`/resend-verification-code?email=${email}`)
        return res.data;

    } catch (error) {
        return handleError(error, "Validation failed")
    }
}

export const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}