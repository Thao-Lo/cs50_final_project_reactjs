import { useEffect, useState } from "react";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import PaymentCompleteComponent from "../../stripe/PaymentCompleteComponent";
import PaymentLayout from "../../stripe/PaymentLayout";
import { useStripeContext } from "../../stripe/StripeContext";
import { confirmReservation } from "../../services/reservationService";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PaymentCompletePage() {
    const { setClientSecret, paymentIntentId, setPaymentIntentId } = useStripeContext();
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
            setMessage(result.message)
            setError(null)
            setClientSecret('');
            setPaymentIntentId('')

        } else {
            setError("Missing required parameters.")
        }

    }
    useEffect(() => {
        fetchConfirmReservation();
    }, [paymentIntentId, sessionIdParam])

    return (
        <>
            <Container maxWidth="lg" sx={{ p: { xs: 1  } }}>
                <Box sx={{mb: 2}}>
                    <PaymentLayout>
                        <PaymentCompleteComponent />
                    </PaymentLayout>
                </Box>
                <Box>
                    <Box sx={{mb: 2}}>{message ? message : error}</Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <Link to="/user/profile">Click to Check your reservation</Link>
                    </Typography>
                </Box>
            </Container>

        </>
    )
}
export default PaymentCompletePage;