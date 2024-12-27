import { createContext, useContext, useReducer } from "react";

const ReservationContext = createContext();
const initialState = {
    selectedSlot: null,
    error: null,
    isLoading: false,
    countdown: 300
}
export const RESERVATION_ACTION = {
    SET_SLOT: 'SET_SLOT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    DECREMENT_COUNTDOWN: 'DECREMENT_COUNTDOWN',
}
const ReservationReducer = (state, action) => {
    switch (action.type) {
        case RESERVATION_ACTION.SET_SLOT:{
            return {...state, selectedSlot: action.payload}
        }
        case RESERVATION_ACTION.SET_LOADING: { break; }
        case RESERVATION_ACTION.SET_ERROR: { break; }
        case RESERVATION_ACTION.DECREMENT_COUNTDOWN: { break; }
    }
}

export const ReservationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReservationReducer, initialState);
    return (
        <ReservationContext.Provider value={{ state, dispatch }}>
            {children}
        </ReservationContext.Provider>
    )
}
export const useReservation = () => useContext(ReservationContext);
