import { createContext, useContext, useReducer } from "react";

const ReservationContext = createContext();
const initialState = {
    selectedSlot: null,
    error: null,
    isLoading: false,
    countdown: 0
}
export const RESERVATION_ACTION = {
    SET_SLOT: 'SET_SLOT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    DECREMENT_COUNTDOWN: 'DECREMENT_COUNTDOWN',
}
const ReservationReducer = (state, action) => {
    switch (action.type) {
        case RESERVATION_ACTION.SET_SLOT: {
            return { ...state, selectedSlot: action.payload }
        }
        case RESERVATION_ACTION.SET_LOADING: { break; }
        case RESERVATION_ACTION.SET_ERROR: { break; }
        case RESERVATION_ACTION.DECREMENT_COUNTDOWN: {
            return { ...state, countdown: action.payload }
        }
    }
}

export const ReservationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReservationReducer, initialState);

    const startCountDown = (TTL) => {
        dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: TTL })
        const interval = setInterval(
            () => dispatch((prevState) => {
                const newTime = prevState.countdown - 1;
                if (newTime > 0) {
                    return { type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: newTime }
                } else {
                    clearInterval(interval)
                    return { type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: 0 }
                }
            })
            , 1000)
    }


    return (
        <ReservationContext.Provider value={{ state, dispatch, startCountDown }}>
            {children}
        </ReservationContext.Provider>
    )
}
export const useReservation = () => useContext(ReservationContext);
