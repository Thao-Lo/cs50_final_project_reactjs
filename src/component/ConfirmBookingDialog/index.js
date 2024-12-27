
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

function ConfirmBookingDialog({ handleSelectedSlot, handleClose, open, slot }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="create-booking"
                sx={{
                    "& .MuiBackdrop-root": {
                        backgroundColor: "rgb(144 143 143 / 20%)",
                    },
                }}
            >
                <DialogTitle id="create-booking">
                    Dinner - {slot.time} on {slot.date}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontWeight: 'bold', mb: 2 }}>
                        {slot.tableName} - Dining

                    </DialogContentText>
                    <DialogContentText>
                        <Box sx={{ mb: 2 }}>Credit card details are required for all reservations at Zavis. Should you cancel your reservation within 72 hours of the arrival time, or fail to show for the booking, a cancellation charge of $325 per person will be incurred.</Box>
                        <Box sx={{ fontWeight: 'bold', mb: 2 }}>Cancellation Policy</Box>
                        <Box sx={{ mb: 2 }}>
                            Credit card details are required for all reservations at Zavis. Should you cancel your reservation within 72 hours of the arrival time, or fail to show for the booking, a cancellation charge of $325 per person will be incurred.
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            Please call us on (02) 4567 5600 or email reservations@zavis.com.au to make any changes to your booking.
                        </Box>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        close
                    </Button>
                    <Button onClick={() => handleSelectedSlot(slot)} autoFocus variant='contained'>
                        Select
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ConfirmBookingDialog;