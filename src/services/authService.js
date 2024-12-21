import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/v1'

axios.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config

    },
    (error) => { return Promise.reject(error) }
)

export const login = async (data) => {
    try {
        //axios makes data from object -> JSON
        const res = await axios.post(`${API_URL}/login`, data, {
            // method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(data)
        })
        
        const result = await res.data;
        console.log(result.accessToken);
        if (result.accessToken) {
            Cookies.set('accessToken', result.accessToken, { expires: 1 / 24})
            Cookies.set('refreshToken', result.refreshToken, { expires: 7})
        }
        return result;
    } catch (error) {
        if (error.response) {
            //server error
            const errorMessage = error.response.data.error || "Login Failed"
            return { error: true, message: errorMessage }
        }else{
            //client error
            return { error: true, message: error.message };
        }
    }

}

export const register = async (data) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log(res.status);
        if (!res.ok) {
            const error = await res.json();
            console.log(error);

            throw new Error(error.error || "Registration Failed")
        }

        const result = await res.json();

        return result;
    } catch (error) {
        console.log(error.message);
        return { error: true, message: error.message }
    }

}

export const verifyEmail = async (email, code) => {
    try {

        const res = await fetch(`${API_URL}/verify-email?email=${email}&code=${code}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Validation failed")
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.log(error);
        return { error: true, message: error.message }
    }
}
export const resendValidationCode = async (email) => {
    try {

        const res = await fetch(`${API_URL}/resend-verification-code?email=${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Validation failed")
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.log(error);
        return { error: true, message: error.message }
    }
} 