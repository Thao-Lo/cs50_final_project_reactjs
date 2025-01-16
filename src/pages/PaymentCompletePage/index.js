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
    const [isLoading, setIsLoading] = useState(true);

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


    // Call API to send confirmation email if payment successfully, or send error message
    const fetchConfirmReservation = async (retryCount = 3, retryDelay = 2000) => {
        const storedSessionId = sessionStorage.getItem('sessionId');
        console.log("complete storedSessionId" + storedSessionId);
        if (!storedSessionId || !paymentIntentId) {
            setError("Missing required parameters.");
            return;
        }
        //try 3 times, gap 2 secs
        for (let attempt = 1; attempt <= retryCount; attempt++) {
            const result = await confirmReservation(storedSessionId, paymentIntentId);
            console.log(`Attempt ${attempt}/${retryCount}: Fetching reservation...`);
            if (result.error) {
                if (attempt === retryCount) {
                    setError(result.message)
                    setIsLoading(false);
                    return;
                }
                // increment after wait 2 secs, then call API again
                await new Promise(resolve => setTimeout(resolve, retryDelay))

            } else {
                //clear all the paymentIntent in Reservation Context after payment successfully
                console.log(result);
                setMessage(result.message)
                setError('')
                setClientSecret(null);
                setPaymentIntentId(null)
                sessionStorage.removeItem('sessionId');
                setIsLoading(false);
                return;
            }
        }

    }
    useEffect(() => {
        if (paymentIntentId) {
            fetchConfirmReservation();
        }
    }, [paymentIntentId])



    return (
        <>
            <Container maxWidth="lg" sx={{ p: { xs: 1 } }}>
                {/* show Payment Layout right after page is rendered */}
                {isLoading && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <PaymentLayout>
                            <PaymentCompleteComponent />
                        </PaymentLayout>
                    </Box>
                )}

                {/* show message from calling API either success or error */}
                {!isLoading && (
                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', p:2 }}>
                        <Box sx={{ color: message ? 'text.success' : 'text.error', fontSize: '1.25rem' }}>{message ? message : error}</Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <Link to="/user/profile">Click to Check your reservation</Link>
                        </Typography>
                    </Box>
                )}

            </Container>

        </>
    )
}
export default PaymentCompletePage;