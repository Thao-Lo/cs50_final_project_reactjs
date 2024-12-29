import CountdownTimer from "../../component/CountdownTimer";
import ReservationInfoComponent from "../../component/ReservationInfoComponent";
import { useReservation } from "../../hooks/ReservationContext";

function ReservationPage() {
    const { state: { selectedSlot, countdown }, startCountDown } = useReservation();
    console.log("selectedSlot", selectedSlot);
    return (
        <>
            <CountdownTimer TTL={countdown} startCountDown={startCountDown}/>
            {selectedSlot ? (
                <ReservationInfoComponent key={selectedSlot.id} selectedSlot={selectedSlot} />
            ) : (
                <p>No slot selected</p>
            )}
        </>

    )
}
export default ReservationPage;