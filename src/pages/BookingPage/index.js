import dayjs, { utc } from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import BookingComponent from "../../component/BookingComponent";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getSlots } from "../../services/bookingService";
import SlotComponent from "../../component/SlotComponent";

//https://day.js.org/en/
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

    console.log(slots);

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
                <Box sx={{}}>{date}</Box>
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
                            <SlotComponent key={slot.id} slot={slot} />
                        ))
                    }
                </Box>

            </Box>
        ))) : (error ? <Box>{error}</Box> : <Box>No result</Box>)



    return (
        <Box>
            <BookingComponent bookingValues={bookingValues} handleDateChange={handleDateChange} handleInputChange={handleInputChange}

            />
            <Box>
                {slotList}
            </Box>

        </Box >
    )

}
export default BookingPage;