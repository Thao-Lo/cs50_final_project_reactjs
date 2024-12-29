import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { formatCountdownTime } from "../../utils/FormattedDateTime";

function CountdownTimer() {
    const [timer, setTimer] = useState(300)

    useEffect(() => {
        const interval = setInterval(
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer -= 1
                } else {
                    clearInterval(interval)
                    return 0
                }
            })
            , 1000)
        return () => { clearInterval(interval) }
    }, [])

    return (
        <Box> Timer: {formatCountdownTime(timer)} </Box>
    )
}

export default CountdownTimer;

