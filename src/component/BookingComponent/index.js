import { Box, MenuItem, TextField } from "@mui/material";
import { getFormattedTime, getNext30Days } from "../../utils/FormattedDateTime";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone)

function BookingComponent() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const today = dayjs();
    const endDate = today.add(30, "day")
    const shouldDisableDate = (date) => {
        return date.isBefore(today, "day") || date.isAfter(endDate, "day");
    };
    console.log("today" + today + " endday " + endDate) ;

    const [bookingValues, setBookingValues] = useState({
        capacity: 2,
        date: dayjs.tz(new Date(), "Australia/Sydney"),        
        time: getFormattedTime()
    })
    console.log(typeof(dayjs(dayjs.tz(new Date(), "Australia/Sydney").format('YYYY-MM-DD'))))

    const availableDates = getNext30Days();
    const availableTimes = ['17:30:00', '18:30:00', '19:30:00', '20:30:00']
    const capacity = [1, 2, 3, 4, 5, 6]

    return (
        <Box>
            <Box component="form" onSubmit={() => { }}
                sx={{
                    display: 'flex',
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
                    defaultValue="2"
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
                    defaultValue="17:30:00"
                >
                    {availableTimes.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Controlled picker"
                        value={bookingValues.date}
                        onChange={() => { }}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                shouldDisableDate={shouldDisableDate} // Disable dates outside the range
                renderInput={(params) => <input {...params} />}
            />
        </LocalizationProvider>
            </Box>

        </Box>
    )

}
export default BookingComponent;