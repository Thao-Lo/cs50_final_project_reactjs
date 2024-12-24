import { Box, MenuItem, TextField } from "@mui/material";
import { getFormattedTime, getNext30Days } from "../../utils/FormattedDateTime";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
import { getSlots } from "../../services/bookingService";

dayjs.extend(utc);
dayjs.extend(timezone)
const availableTimes = ['17:30:00', '18:30:00', '19:30:00', '20:30:00']
const capacity = [1, 2, 3, 4, 5, 6]

function BookingComponent() {
    const [bookingValues, setBookingValues] = useState({
        capacity: 2,
        date: dayjs.tz(new Date(), "Australia/Sydney"),
        time: ''
    })
    const fetchSlot = async () => {
        const slots = await getSlots(bookingValues.capacity, bookingValues.date, bookingValues.time);
        if(slots.error){
            console.log(slots.message);
        }
        console.log(slots);
    }
    useEffect(() => {
        fetchSlot();
    }, [bookingValues.capacity, bookingValues.date, bookingValues.time])


    const shouldDisableDate = (date) => {
        const today = dayjs();
        const endDay = today.add(30, 'day');
        return date.isBefore(today, 'day') || date.isAfter(endDay, 'day')
    }
    console.log("booking value", bookingValues)
    console.log("date", (dayjs.tz(new Date(), "Australia/Sydney")).format("DD-MM-YYYY"))

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

    return (
        <Box>
            <Box component="form" onSubmit={() => { }}
                sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    width: '50rem',
                    m: 2,
                    '& .MuiTextField-root': { width: '15rem' }
                }}
                noValidate
                autoComplete="off">

                <TextField
                    id="capacity-input"
                    select
                    label="Guests"
                    name='capacity'
                    defaultValue="2"
                    onChange={handleInputChange}
                >
                    {capacity.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="time-input"
                    select
                    label="Time"
                    name='time'
                    defaultValue=""
                    onChange={handleInputChange}
                >
                    {availableTimes.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="date-input"
                        label="Date"
                        name='date'
                        value={bookingValues.date}
                        onChange={handleDateChange}
                        shouldDisableDate={shouldDisableDate} // Disable dates outside the range
                        format="DD-MM-YYYY"                        
                        slotProps={{
                            textField: {
                                readOnly: true
                            }

                        }}
                    />
                </LocalizationProvider>
            </Box>
        </Box>
    )

}
export default BookingComponent;