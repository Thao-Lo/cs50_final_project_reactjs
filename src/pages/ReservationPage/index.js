import { useEffect, useState } from "react";
import CountdownTimer from "../../component/CountdownTimer";
import ReservationInfoComponent from "../../component/ReservationInfoComponent";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { createPayment, retrieveReservationInfo } from "../../services/reservationService";
import CheckoutForm from "../../stripe/CheckoutForm";
import PaymentLayout from "../../stripe/PaymentLayout";
import { useStripeContext } from "../../stripe/StripeContext";

function ReservationPage() {
    const { state: { selectedSlot, countdown, sessionId, error }, dispatch } = useReservation();
    const { setClientSecret, setPaymentIntentId } = useStripeContext();
    const [paymentError, setPaymentError] = useState(null)
    // console.log("selectedSlot", selectedSlot);
    // console.log("countdown", countdown);
    const fetchReservationInfo = async () => {
        if (!sessionId) {
            return;
        }
        const result = await retrieveReservationInfo(sessionId);
        if (result.error) {
            dispatch({ type: RESERVATION_ACTION.SET_ERROR, payload: { errorMessage: result.message } })
            return;
        }
        console.log("Result reservation", result.reservation)

        dispatch({ type: RESERVATION_ACTION.SET_SLOT, payload: { selectedSlot: result.reservation } });
        dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: result.remainingTime } });
    }
    const fetchCreatePayment = async () => {
        console.log("sessionId payment: " + sessionId);
        if (!sessionId) {
            return;
        }
        const result = await createPayment(sessionId);
        if (result.error) {
            setPaymentError(result.message);
            return;
        }
        console.log("payment", result);
        setClientSecret(result.clientSecret)
        setPaymentIntentId(result.paymentIntentId)
    }
    useEffect(() => {
        fetchReservationInfo();
       
    }, [sessionId])

    useEffect(() => {       
        fetchCreatePayment();
    }, [sessionId])

    if (!selectedSlot) {
        return <div>No Slot Selected {error}</div>; // Xử lý nếu chưa có dữ liệu
    }
    if(paymentError){
        return <div>{paymentError}</div>
    }
    return (
        <>
            <CountdownTimer />
            {selectedSlot ? (
                <>
                    <ReservationInfoComponent key={selectedSlot.id} selectedSlot={selectedSlot} />
                    <PaymentLayout>
                        <CheckoutForm />
                    </PaymentLayout>
                </>
            ) : (
                <p>No slot selected</p>
            )}

        </>

    )
}
export default ReservationPage;