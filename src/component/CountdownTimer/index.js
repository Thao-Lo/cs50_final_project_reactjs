import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { formatCountdownTime } from "../../utils/FormattedDateTime";

function CountdownTimer() {
    const { state: { countdown, sessionId, error }, dispatch } = useReservation();    
    const countdownRef = useRef(null)
    // console.log(typeof ("countdown" + countdown));
    // console.log(countdown);

    useEffect(() => {
        if(!sessionId){
            dispatch({ type: RESERVATION_ACTION.RESET_STATE })
            return;
        }
        countdownRef.current = countdown;
        const interval = setInterval(() => {
            countdownRef.current -= 1;
            if (countdownRef.current > 0) {
                dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: countdownRef.current } })
            } else {
                clearInterval(interval)
                dispatch({ type: RESERVATION_ACTION.RESET_STATE })
            }
        }, 1000)

        // return () => clearInterval(interval)
        return () => {
            clearInterval(interval);
            console.log("Interval cleared");
        };
    }, [sessionId, countdown])

    return (
        <Box> Timer: {formatCountdownTime(parseInt(countdown))} </Box>
    )
}

export default CountdownTimer;

