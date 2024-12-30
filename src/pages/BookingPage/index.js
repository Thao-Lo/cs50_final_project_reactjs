import dayjs, { utc } from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import BookingComponent from "../../component/BookingComponent";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getSlots } from "../../services/bookingService";
import SlotComponent from "../../component/SlotComponent";
import ConfirmBookingDialog from "../../component/ConfirmBookingDialog";
import { createReservation } from "../../services/reservationService";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { useNavigate } from "react-router-dom";

//https://day.js.org/en/
dayjs.extend(utc);
dayjs.extend(timezone)

function BookingPage() {

    const { state: slot, dispatch } = useReservation();

    const [bookingValues, setBookingValues] = useState({
        capacity: '',
        date: dayjs.tz(new Date(), "Australia/Sydney"),
        time: ''
    })
    const navigate = useNavigate();
    const [slots, setSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState({})
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false);

    console.log("booking value", bookingValues)
    console.log("date", (dayjs.tz(new Date(), "Australia/Sydney")).format("DD-MM-YYYY"))

    //fetch slot - bookingService
    const fetchSlot = async () => {
        const result = await getSlots(bookingValues.capacity, bookingValues.date, bookingValues.time);
        if (result.error) {
            console.log(result.message);
            setSlots([])
            setError(result.message)
            return;
        }
        setSlots(result.availableSlots)
        setError('');
    }
    useEffect(() => {
        fetchSlot();
    }, [bookingValues.capacity, bookingValues.date, bookingValues.time])
    console.log(slots);

    //create reservation api reservation/creat
    const handleSelectedSlot = async (slot) => {
        const result = await createReservation(slot);
        if (result.error) {
            console.log(result.message);
            // const errorMessage = result.message;
            dispatch({ type: RESERVATION_ACTION.SET_ERROR, payload: { errorMessage:  result.message}})
            return;
        }
        console.log("result", result);
        dispatch({ type: RESERVATION_ACTION.DECREMENT_COUNTDOWN, payload: { countdown: result.remainingTime} });
        dispatch({ type: RESERVATION_ACTION.SET_SESSION_ID, payload: { sessionId: result.sessionId } });
        console.log(result.sessionId);
        navigate('/user/reservation')
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
            date: newDate ? dayjs.tz(newDate, "Australia/Sydney") : null
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

    const groupSlotsByDate = (slots) => {
        return slots.reduce((acc, slot) => {
            if (!acc[slot.date]) {
                acc[slot.date] = []
            }
            acc[slot.date].push(slot)
            return acc;
        }, {})
    }
    const groupSlots = groupSlotsByDate(slots)


    const slotList = (slots.length > 0) ?
        (Object.keys(groupSlots).map((date) => (
            <Box key={date}>
                <Box sx={{ m: 1, fontWeight: 'semibold' }}>{date}</Box>
                <Box sx={{
                    display: 'flex', gap: '0.5rem',
                    overflow: 'auto',
                    whiteSpace: "nowrap",
                    "&::-webkit-scrollbar": {
                        width: '1rem',
                        height: '0.5rem'
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1", // Background of the scrollbar track
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888", // Color of the scrollbar thumb
                        borderRadius: "10px",    // Rounded corners
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#555", // Color on hover
                    }
                }}>
                    {
                        groupSlots[date].map((slot) => (
                            <>
                                <SlotComponent key={slot.id} slot={slot} handleSlotClick={handleSlotClick} />
                            </>
                        ))
                    }
                </Box>

            </Box>
        ))) : (error ? <Box>{error}</Box> : <Box>No result</Box>)



    return (
        <Box sx={{ margin: 2 }}>
            <BookingComponent bookingValues={bookingValues} handleDateChange={handleDateChange} handleInputChange={handleInputChange}
            />
            <Box sx={{}}>
                {slotList}
            </Box>
            <ConfirmBookingDialog handleClose={handleClose} open={open} slot={selectedSlot} handleSelectedSlot={handleSelectedSlot} />
        </Box >
    )

}
export default BookingPage;