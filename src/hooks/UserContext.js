import { createContext, useContext, useEffect, useReducer, useState } from "react";
import Cookies from 'js-cookie';
import { getUserbyAccessToken } from "../services/authService";

const UserContext = createContext();
const initialState = {
    isAuthenticated: false,
    user: null,
    message: null,
    error: null
};

export const USER_ACTION = {
    LOGIN: 'LOGIN',
    AUTH_MESSAGE: 'AUTH_MESSAGE',
    AUTH_ERROR: 'AUTH_ERROR',
    LOGOUT: 'LOGOUT'
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserProfile = async () => {
        setIsLoading(true);
        const result = await getUserbyAccessToken();
        if (result.error) {
            dispatch({ type: USER_ACTION.AUTH_ERROR, payload: result.message })
            return;
        }

        dispatch({ type: USER_ACTION.LOGIN, payload: result.user })
        setIsLoading(false);
    }

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            fetchUserProfile();
        } else {
            setIsLoading(false);
        }
    }, [])
    useEffect(() => {
        const handleAccessTokenUpdate = () => {
            console.log('accessToken has been updated in cookies!');
            fetchUserProfile();
        };
        window.addEventListener('accessTokenUpdated', handleAccessTokenUpdate);
        return () => {
            window.removeEventListener('accessTokenUpdated', handleAccessTokenUpdate);
        }

    },[])

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

const UserReducer = (state, action) => {
    switch (action.type) {
        case USER_ACTION.LOGIN: {
            return { ...state, user: action.payload, isAuthenticated: true, error: null }
        }
        case USER_ACTION.AUTH_MESSAGE: {
            return { ...state, message: action.payload, error: null }
        }
        case USER_ACTION.AUTH_ERROR: {
            return { ...state, error: action.payload, isAuthenticated: false }
        }
        case USER_ACTION.LOGOUT: {
            return { ...initialState }
        }

    }
}

export const useUser = () => useContext(UserContext); 