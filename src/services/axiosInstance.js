import axios from "axios";
import Cookies from 'js-cookie';

// export const API_URL = 'http://52.63.144.98:8080/api/v1'
export const API_URL = process.env.REACT_APP_API_URL;
// export const API_URL = 'http://localhost:8080/api/v1'                 

const axiosInstance = axios.create({
    baseURL: API_URL, //standard key
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

//add Authorization to headers if accesstoken is present
axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        if (!accessToken && refreshToken) {
            try {
                const res = await axios.post(`${API_URL}/refresh-token`, {
                    refreshToken: refreshToken
                })
                const accessToken = await res.data.accessToken;
                Cookies.set('accessToken', accessToken, { expires: 1 / 24 })
                window.dispatchEvent(new Event('accessTokenUpdated'));
                config.headers.Authorization = `Bearer ${accessToken}`
            } catch (error) {
                console.log("Failed refresh Token");
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
                window.location.href = '/login'
            }
        }
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
        const status = error.response ? error.response.status : null
        if (status === 401 || status === 403) {
            //get refreshToken from cookies
            const refreshToken = Cookies.get('refreshToken');

            if (refreshToken) {
                try {
                    //send api to backend to ask for new accessToken
                    const res = await axios.post(`${API_URL}/refresh-token`, {
                        //"refreshToken" : "hgdsghrngd" in body
                        refreshToken: refreshToken
                    });
                    const accessToken = await res.data.accessToken;

                    Cookies.set('accessToken', accessToken, { expires: 1 / 24 });
                    window.dispatchEvent(new Event('accessTokenUpdated'));
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
        const data = error.response.data
        const errorMessage = data?.message || defaultMessage
        const errorCode = data?.code || 'UNKNOWN'
        return { 
            error: true, 
            message: errorMessage, 
            code: errorCode,
            status: error.response.status,
            path: data?.path
        }
    } else {
        //client error
        return {
            error: true,
            message: error.message || defaultMessage,
            code: 'NETWORK_ERROR',
            status: 0
            };
    }
}

export default axiosInstance;