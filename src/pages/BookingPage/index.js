import dayjs, { utc } from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import BookingComponent from "../../component/BookingComponent";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getSlots } from "../../services/bookingService";

dayjs.extend(utc);
dayjs.extend(timezone)

function BookingPage() {

    const [bookingValues, setBookingValues] = useState({
        capacity: '',
        date: dayjs.tz(new Date(), "Australia/Sydney"),
        time: ''
    })
    const [slots, setSlots] = useState([])
    const [error, setError] = useState('')
    console.log("booking value", bookingValues)
    console.log("date", (dayjs.tz(new Date(), "Australia/Sydney")).format("DD-MM-YYYY"))

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

   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleDateChange = (newDate) => {
        setBookingValues((prev) => ({
            ...prev,
            date: newDate
        }))
    }
    const slotList = (slots.length > 0) ? (slots.map((slot) => (<Box>{slot.id}</Box>))) : (error ? <Box>{error}</Box> : <Box>No result</Box>)

    return (
        <Box>
            <BookingComponent bookingValues={bookingValues} handleDateChange={handleDateChange} handleInputChange={handleInputChange}

            />
            {slotList}
        </Box>
    )

}
export default BookingPage;