import CountdownTimer from "../../component/CountdownTimer";
import ReservationInfoComponent from "../../component/ReservationInfoComponent";
import { useReservation } from "../../hooks/ReservationContext";

function ReservationPage() {
    const { state: { selectedSlot }, dispatch } = useReservation();
    console.log("selectedSlot", selectedSlot);
    return (
        <>
            <CountdownTimer />
            <ReservationInfoComponent key={selectedSlot.id} selectedSlot={selectedSlot} />
        </>

    )
}
export default ReservationPage;