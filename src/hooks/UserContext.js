import { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie';

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
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)
    useEffect(() => {
        if (Cookies.get('accessToken')) {
            dispatch({ type: USER_ACTION.LOGIN, payload: { isAuthenticated: true } })
        }
    }, [])

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext); 