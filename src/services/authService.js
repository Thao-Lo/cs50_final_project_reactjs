import axios from "axios";
import Cookies from 'js-cookie';
import axiosInstance, { API_URL, handleError } from "./axiosInstance";

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