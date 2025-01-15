import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmReservation } from "../../services/reservationService";
import PaymentCompleteComponent from "../../stripe/PaymentCompleteComponent";
import PaymentLayout from "../../stripe/PaymentLayout";
import { useStripeContext } from "../../stripe/StripeContext";

function PaymentCompletePage() {
    const { setClientSecret, paymentIntentId, setPaymentIntentId } = useStripeContext();
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    
    const urlParams = new URLSearchParams(window.location.search);

    const clientSecret = urlParams.get(
        "payment_intent_client_secret"
    );
    const redirectStatus = urlParams.get('redirect_status');

    useEffect(() => {
        if (clientSecret) {
            setClientSecret(clientSecret)
        }
    }, [clientSecret, setClientSecret])


    const fetchConfirmReservation = async () => {
        const storedSessionId = sessionStorage.getItem('sessionId');
        console.log("complete storedSessionId" + storedSessionId);
        if (storedSessionId && paymentIntentId) {
            const result = await confirmReservation(storedSessionId, paymentIntentId);
            if (result.error) {
                setError(result.message)
                return;
            }
            console.log(result);
            setMessage(result.message)
            setError('')
            setClientSecret('');
            setPaymentIntentId('')
            sessionStorage.removeItem('sessionId');
        } else {
            setError("Missing required parameters.")
        }

    }
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchConfirmReservation();
        }, 5000)
        return () => clearInterval(timer)
    }, [paymentIntentId])

    return (
        <>
            <Container maxWidth="lg" sx={{ p: { xs: 1 } }}>
                <Box sx={{ mb: 2 }}>
                    <PaymentLayout>
                        <PaymentCompleteComponent />
                    </PaymentLayout>
                </Box>
                <Box>
                    <Box sx={{ mb: 2 }}>{message ? message : error}</Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <Link to="/user/profile">Click to Check your reservation</Link>
                    </Typography>
                </Box>
            </Container>

        </>
    )
}
export default PaymentCompletePage;