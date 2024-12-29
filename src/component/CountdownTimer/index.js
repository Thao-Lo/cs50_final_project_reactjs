import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { formatCountdownTime } from "../../utils/FormattedDateTime";
import { useReservation } from "../../hooks/ReservationContext";

function CountdownTimer({countdown, startCountDown}) {   

    useEffect(() => {
       startCountDown(countdown)
    }, [])

    return (
        <Box> Timer: {formatCountdownTime(countdown)} </Box>
    )
}

export default CountdownTimer;

