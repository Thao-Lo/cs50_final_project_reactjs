import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { formatCountdownTime } from "../../utils/FormattedDateTime";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";

function CountdownTimer() {
    const { state: { selectedSlot, countdown, sessionId, error }, dispatch } = useReservation();    
    const countdownRef = useRef(null)
    // console.log(typeof ("countdown" + countdown));
    // console.log(countdown);

    useEffect(() => {
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

        return () => clearInterval(interval)
    }, [sessionId])

    return (
        <Box> Timer: {formatCountdownTime(parseInt(countdown))} </Box>
    )
}

export default CountdownTimer;

