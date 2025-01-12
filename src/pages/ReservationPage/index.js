import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CountdownTimer from "../../component/CountdownTimer";
import ReservationInfoComponent from "../../component/ReservationInfoComponent";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { createPayment, retrieveReservationInfo } from "../../services/reservationService";
import CheckoutForm from "../../stripe/CheckoutForm";
import PaymentLayout from "../../stripe/PaymentLayout";
import { useStripeContext } from "../../stripe/StripeContext";
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Container, Paper, Typography } from "@mui/material";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import MapComponent from "../../component/MapComponent";
import { Link } from "react-router-dom";
import DuckImage from '../../static/images/duck.jpg'

function ReservationPage() {
    const { state: { selectedSlot, sessionId, error }, dispatch } = useReservation();
    const { setClientSecret, setPaymentIntentId } = useStripeContext();
    const [paymentError, setPaymentError] = useState(null)
    const prevSessionId = useRef();


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
        // dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: result.remainingTime }});
    }
    const fetchCreatePayment = useCallback(async () => {
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
    }, [sessionId, setClientSecret, setPaymentIntentId]);

    useEffect(() => {
        fetchReservationInfo();
    }, [sessionId])

    useEffect(() => {
        console.log("CHANGED, sessionId" + sessionId);
        //avoid useEffect run 2 times in dev mode
        if (sessionId && prevSessionId.current != sessionId) {
            prevSessionId.current = sessionId;
            fetchCreatePayment();
        }

    }, [fetchCreatePayment])

    // if (!selectedSlot) {
    //     return <div>No Slot Selected {error}</div>; // Xử lý nếu chưa có dữ liệu
    // }
    if (paymentError) {
        return <div>{paymentError}</div>
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ p: { xs: 1 } }}>
                <Box sx={{ p: { xs: 1, sm: 3 } }}>
                    {selectedSlot ? (
                        <>
                            <Box sx={{ mb: 2 }}>
                                <Chip icon={<AccessAlarmsIcon />} label={<CountdownTimer />} variant="outlined" />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box>
                                        <ReservationInfoComponent key={selectedSlot.id} selectedSlot={selectedSlot} />
                                    </Box>
                                    <Box>
                                        <MapComponent />
                                    </Box>
                                </Box>
                                <Box>
                                    <PaymentLayout>
                                        <CheckoutForm />
                                    </PaymentLayout>

                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ p: 3 }}>
                            <Card sx={{ maxWidth: 380 }}>
                                <CardMedia
                                    sx={{ height: 240 }}
                                    image={DuckImage}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        No Slot Selected {error}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <Link to="/booking">Click here to make a booking with us</Link>
                                    </Typography>
                                </CardContent>
                            </Card>


                        </Box>


                    )}
                </Box >
            </Container>

        </>

    )
}
export default ReservationPage; 