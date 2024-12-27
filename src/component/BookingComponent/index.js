import { Box, MenuItem, TextField } from "@mui/material";
import { getFormattedTime, getNext30Days } from "../../utils/FormattedDateTime";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
import { getSlots } from "../../services/bookingService";
import Grid from '@mui/material/Grid2';

dayjs.extend(utc);
dayjs.extend(timezone)
const availableTimes = ['17:30:00', '18:30:00', '19:30:00', '20:30:00']
const capacity = [1, 2, 3, 4, 5, 6]

function BookingComponent({ bookingValues, handleInputChange, handleDateChange }) {

    const shouldDisableDate = (date) => {
        const today = dayjs();
        const endDay = today.add(30, 'day');
        return date.isBefore(today, 'day') || date.isAfter(endDay, 'day')
    }

    return (
        <Box sx={{marginBottom: '1rem'}}>
            <Box component="form" onSubmit={() => { }}
                sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    width: '50rem',
                    flexGrow: 1,
                    m: 2,
                    '& .MuiTextField-root': { width: '15rem' }
                }}
                noValidate
                autoComplete="off">
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 4 }}>
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
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
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
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
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
                                        readOnly: true,                                       
                                    }
                                }}
                               
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}
export default BookingComponent;