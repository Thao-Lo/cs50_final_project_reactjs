import { createContext, useContext, useReducer, useRef } from "react";

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
    RESET_STATE: 'RESET_STATE'
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
        case RESERVATION_ACTION.RESET_STATE: {
            return initialState;
        }      
         default:
            return state;
    }
}

export const ReservationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReservationReducer, initialState);
    const countdownRef = useRef(null);

    const startCountDown = (TTL) => {
        // // dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: TTL } })
        // countdownRef.current = TTL;
        // const interval = setInterval(() => {
        //     countdownRef.current -= 1;
        //     if (countdownRef.current > 0) {
        //         dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: countdownRef.current } })
        //     } else {
        //         clearInterval(interval)
        //         dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: 0 } })
        //     }
        // }
        //     , 1000)
        // return interval;
    }


    return (
        <ReservationContext.Provider value={{ state, dispatch, startCountDown }}>
            {children}
        </ReservationContext.Provider>
    )
}
export const useReservation = () => useContext(ReservationContext);
