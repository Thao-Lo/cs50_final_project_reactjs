import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { formatCountdownTime } from "../../utils/FormattedDateTime";
import { useReservation } from "../../hooks/ReservationContext";

function CountdownTimer({countdown, startCountDown}) {   

    console.log(typeof("countdown" + countdown));
    console.log(countdown);

    useEffect(() => {
      let interval = startCountDown(countdown)
      return () => clearInterval(interval)
    }, [countdown])

    return (
        <Box> Timer: {formatCountdownTime(parseInt(countdown))} </Box>
    )
}

export default CountdownTimer;

