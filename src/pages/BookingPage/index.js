import { Box, Container, List, ListItem, ListItemText, Paper } from "@mui/material";
import dayjs, { utc } from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingComponent from "../../component/BookingComponent";
import ConfirmBookingDialog from "../../component/ConfirmBookingDialog";
import SlotComponent from "../../component/SlotComponent";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { useUser } from "../../hooks/UserContext";
import { getSlots } from "../../services/bookingService";
import { createReservation, deleteRedisForNonProcessingBooking } from "../../services/reservationService";
import { useStripeContext } from "../../stripe/StripeContext";
import { formatDateDisplay } from "../../utils/FormattedDateTime";

//https://day.js.org/en/
dayjs.extend(utc);
dayjs.extend(timezone)

function BookingPage() {

    const { state: { slot, sessionId }, dispatch } = useReservation();
    const { state: { isAuthenticated } } = useUser();
    const { setClientSecret, setPaymentIntentId } = useStripeContext();
    // set default value 
    const [bookingValues, setBookingValues] = useState({
        capacity: 2,
        // date: null,
        date: dayjs.tz(new Date()),
        time: ''
    })
    const navigate = useNavigate();
    const [slots, setSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState({})
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false);

    //fetch slot - bookingService
    const fetchSlot = async () => {       
        const time = bookingValues.time === "Anytime" ? '' : bookingValues.time;

        const result = await getSlots(bookingValues.capacity, bookingValues.date, time);
        if (result.error) {
            setSlots([])
            setError(result.message)
            return;
        }
        setSlots(result.availableSlots)
        setError('');
    }
    //fetch again if user change their booking options: capacity, date, time
    useEffect(() => {
        fetchSlot();
    }, [bookingValues.capacity, bookingValues.date, bookingValues.time])


    //create reservation api reservation/creat
    const handleSelectedSlot = async (slot) => {
        const result = await createReservation(slot);
        if (result.error) {
            console.log(result.message);
            dispatch({ type: RESERVATION_ACTION.SET_ERROR, payload: { errorMessage: result.message } })
            return;
        }
        console.log("result", result);
        console.log("TTL: " + result.remainingTime);

        // created reservation, then change it, will reset the stripeContext and sessionId, clear Redis
        if (isAuthenticated) {
            //clean up redis
            if (sessionId) {
                sessionStorage.removeItem('sessionId');
                await handleDeleteRedisForNonProcessingBooking(sessionId);
                setClientSecret('');
                setPaymentIntentId('')
            }
            // dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: result.remainingTime - 1 } });
            dispatch({ type: RESERVATION_ACTION.SET_SESSION_ID, payload: { sessionId: result.sessionId } });

            navigate('/user/reservation')
        } else {
            // if user not login, sessionId will be store in sessionStorage 1st, the old unused sessionId will be removed
            const existingSessionId = sessionStorage.getItem('sessionId');
            if (existingSessionId) {
                //clean up Redis               
                sessionStorage.removeItem('sessionId');
                handleDeleteRedisForNonProcessingBooking(existingSessionId);
                setClientSecret('');
                setPaymentIntentId('')
            }
            sessionStorage.setItem('sessionId', result.sessionId)
            navigate('/login')
        }
    }

    //when user change their booking 
    const handleDeleteRedisForNonProcessingBooking = async (sessionId) => {
        const res = await deleteRedisForNonProcessingBooking(sessionId)
        if (res.error) {
            console.log("Error" + res.message);
            return;
        }
        console.log("Delete Redis response: " + res.message);
    }

    //for capacity and time - Booking component
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    //for date - Booking component
    const handleDateChange = (newDate) => {
        setBookingValues((prev) => ({
            ...prev,
            date: newDate ? dayjs.tz(newDate) : null
        }))
    }
    //Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //click slot and pop up dialog
    const handleSlotClick = (slot) => {
        handleClickOpen()
        setSelectedSlot(slot)
    }

    //to group slots by dates, acc[slot.date]: is a key with an empty array "11-2-25" : [] 
    const groupSlotsByDate = (slots) => {
        return slots.reduce((acc, slot) => {
            if (!acc[slot.date]) {
                acc[slot.date] = []
            }
            acc[slot.date].push(slot)
            return acc;
        }, {})
    }
    console.log("Slots: ", slots)
    //Object with keys and array values
    const groupSlots = groupSlotsByDate(slots)
    console.log("Group slote: ", groupSlots)

    const groupSlotsByDateAndTableName = (slots) => {
        return slots.reduce((acc, slot) => {
            if (!acc[slot.date]) {
                acc[slot.date] = {}
            }
            if (!acc[slot.date][slot.tableName]) {
                acc[slot.date][slot.tableName] = []
            }
            acc[slot.date][slot.tableName].push(slot)
            return acc;
        }, {})
    }
    const groupSlotsByName = groupSlotsByDateAndTableName(slots);
    console.log("Slots by table name: ", groupSlotsByName)

    const slotList = (slots.length > 0) ?
        (Object.keys(groupSlotsByName).map((date) => (
            //get key to display date
            <Box key={date}>
                <Box sx={{ m: 1, fontWeight: 600, fontSize: '1.3rem' }}>{formatDateDisplay(date)}</Box>
                <List>
                    {Object.entries(groupSlotsByName[date]).map(([tableName, slotArray], index) => (
                        <ListItem key={index} 
                        sx={{display:'flex', flexDirection:'column', alignItems:'flex-start',
                              p:'0',pl:{xs:'0.5rem', sm:'1rem'}, pb: {xs:'0.5rem', sm:'0'}}}>
                            <Box sx={{ m: 1, fontWeight: 600, textAlign:'start' }}>{tableName} - Dining</Box>
                            <Box sx={{
                                display: 'flex', gap: '0.5rem',
                                overflow: 'auto',
                                width: '100%',
                                whiteSpace: "nowrap",
                                "&::-webkit-scrollbar": {
                                    width: '1rem',
                                    height: '0.4rem'
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: "#f1f1f1", // Background of the scrollbar track
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "#bdbdbd", // Color of the scrollbar thumb
                                    borderRadius: "10px",    // Rounded corners
                                },
                                "&::-webkit-scrollbar-thumb:hover": {
                                    backgroundColor: "#555", // Color on hover
                                }
                            }}>
                                {  //get value [] to display each slot
                                   slotArray.map((slot) => (
                                        <Box key={slot.id}>
                                            <SlotComponent key={slot.id} slot={slot} handleSlotClick={handleSlotClick} />
                                        </Box>
                                    ))
                                }
                            </Box>
                        </ListItem>
                    ))}
                </List>   
            </Box>
        ))) : (error ? <Box>{error}</Box> : <Box>No result</Box>)



    return (
        <Container maxWidth="lg">
            <Box sx={{ margin: 2, padding: 2, maxWidth: 1200, maxheight: 900 }} component={Paper}>
                <BookingComponent bookingValues={bookingValues} handleDateChange={handleDateChange} handleInputChange={handleInputChange}
                />
                <Box sx={{}}>
                    {slotList}
                </Box>
                <ConfirmBookingDialog handleClose={handleClose} open={open} slot={selectedSlot} handleSelectedSlot={handleSelectedSlot} />

            </Box >
        </Container>
    )

}
export default BookingPage;