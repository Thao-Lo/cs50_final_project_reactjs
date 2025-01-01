import { useEffect, useState } from "react";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import PaymentCompleteComponent from "../../stripe/PaymentCompleteComponent";
import PaymentLayout from "../../stripe/PaymentLayout";
import { useStripeContext } from "../../stripe/StripeContext";
import { confirmReservation } from "../../services/reservationService";
import { Box } from "@mui/material";

function PaymentCompletePage() {
    const { setClientSecret, paymentIntentId } = useStripeContext();
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    const sessionIdParam = new URLSearchParams(window.location.search).get(
        "sessionId"
    );
    console.log(sessionIdParam);

    useEffect(() => {
        if (clientSecret) {
            setClientSecret(clientSecret)
        }
    }, [clientSecret, setClientSecret])


    const fetchConfirmReservation = async () => {
        if (sessionIdParam && paymentIntentId) {
            const result = await confirmReservation(sessionIdParam, paymentIntentId);
            if (result.error) {
                setError(result.message)
                return;
            }
            console.log(result);
            setMessage(result)
        }else{
            setError("Missing required parameters.")
        }

    }
    useEffect(() => {       
            fetchConfirmReservation();        
    }, [paymentIntentId,sessionIdParam])

    return (
        <>
            <PaymentLayout>
                <PaymentCompleteComponent />
            </PaymentLayout>


        </>
    )
}
export default PaymentCompletePage;