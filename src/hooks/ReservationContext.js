import { createContext, useContext, useReducer } from "react";

const ReservationContext = createContext();
const initialState = {
    selectedSlot: null,
    error: null,
    isLoading: false,
    countdown: 0,
    sessionId: null
}
export const RESERVATION_ACTION = {
    SET_SLOT: 'SET_SLOT',
    SET_SESSION_ID: 'SET_SESSION_ID',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    DECREMENT_COUNTDOWN: 'DECREMENT_COUNTDOWN',
}
const ReservationReducer = (state, action) => {
    switch (action.type) {
        case RESERVATION_ACTION.SET_SLOT: {
            return { ...state, selectedSlot: action.payload.selectedSlot }
        }
        case RESERVATION_ACTION.SET_SESSION_ID: {
            return { ...state, sessionId: action.payload.sessionId }
        }
        case RESERVATION_ACTION.SET_LOADING: { break; }
        case RESERVATION_ACTION.SET_ERROR: {
            return { ...state, error: action.payload.error }
        }
        case RESERVATION_ACTION.DECREMENT_COUNTDOWN: {
            const countdown = parseInt(action.payload.countdown)
            return { ...state, countdown: countdown }
        }
    }
}

export const ReservationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReservationReducer, initialState);

    const startCountDown = (TTL) => {
        dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: TTL } })
        let remainingTime = parseInt(TTL);
        const interval = setInterval(() => {
            remainingTime -= 1;
            if (remainingTime > 0) {
                dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: remainingTime } })
            } else {
                clearInterval(interval)
                dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: 0 } })
            }
        }
            , 1000)
    }


    return (
        <ReservationContext.Provider value={{ state, dispatch, startCountDown }}>
            {children}
        </ReservationContext.Provider>
    )
}
export const useReservation = () => useContext(ReservationContext);
