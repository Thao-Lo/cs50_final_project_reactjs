import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BrunchDiningOutlinedIcon from '@mui/icons-material/BrunchDiningOutlined';
import { Link } from 'react-router-dom';

function ReservationInfoComponent({ selectedSlot }) {

    return (
        <Card sx={{ minWidth: { xs: 275, sm: 450 }, maxWidth: 450, p: '1.25rem' }}>
            <CardContent sx={{ ml: 2 }}>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    Zavis restaurant
                </Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
                    Your reservation Information
                </Typography>
                <Typography sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CalendarMonthOutlinedIcon />
                    {selectedSlot.date}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HistoryToggleOffOutlinedIcon />
                    {selectedSlot.time}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BrunchDiningOutlinedIcon />
                    {'Dinner -'}{selectedSlot.tableName}
                </Typography>
                <Typography sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GroupOutlinedIcon />
                    {'Party of '}{selectedSlot.capacity}
                </Typography>


            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link to="/booking" style={{
                        textDecoration: "none", 
                        color: "inherit", 
                    }}> Change Booking</Link>
                </Button>
            </CardActions>
        </Card>

    )
}
export default ReservationInfoComponent;
