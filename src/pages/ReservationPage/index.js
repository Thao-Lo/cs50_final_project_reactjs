import { useEffect } from "react";
import CountdownTimer from "../../component/CountdownTimer";
import ReservationInfoComponent from "../../component/ReservationInfoComponent";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { retrieveReservationInfo } from "../../services/reservationService";

function ReservationPage() {
    const { state: { selectedSlot, countdown, sessionId, error }, startCountDown, dispatch } = useReservation();
    console.log("selectedSlot", selectedSlot);
    console.log("countdown", countdown);
    const fetchreservationInfo = async () => {
        if(!sessionId){
            return;
        }
        const result = await retrieveReservationInfo(sessionId);
        if (result.error) {
            dispatch({ type: RESERVATION_ACTION.SET_ERROR, payload: { errorMessage: result.message } })
            return;
        }
        console.log("Result reservation",result.reservation)

        dispatch({ type: RESERVATION_ACTION.SET_SLOT, payload: { selectedSlot: result.reservation } });
        dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: result.remainingTime } });
    }

    useEffect(() => {        
            fetchreservationInfo();           
    }, [sessionId])


    if (!selectedSlot) {
        return <div>No Slot Selected {error}</div>; // Xử lý nếu chưa có dữ liệu
    }

    return (
        <>
            <CountdownTimer TTL={countdown} startCountDown={startCountDown} />
            {selectedSlot ? (
                <ReservationInfoComponent key={selectedSlot.id} selectedSlot={selectedSlot} />
            ) : (
                <p>No slot selected</p>
            )}
        </>

    )
}
export default ReservationPage;