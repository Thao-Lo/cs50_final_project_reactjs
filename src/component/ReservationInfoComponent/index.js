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

function ReservationInfoComponent() {

    return (
        <Card sx={{ minWidth: 275 ,maxWidth: 400}}>
            <CardContent sx={{ml: 2}}>
                <Typography variant="h5" component="div" sx={{mb: 1}}>
                    Zavis restaurant
                </Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
                    Your reservation Information
                </Typography>
                <Typography sx={{ mb: 1.5, display:'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <CalendarMonthOutlinedIcon />
                    28/12/24
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5, display:'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <HistoryToggleOffOutlinedIcon />
                    18:30
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5, display:'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <BrunchDiningOutlinedIcon/>
                    {'Dinner - Table 1'}
                </Typography>
                <Typography sx={{ mb: 1.5, display:'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <GroupOutlinedIcon />
                    {'Party of 2'}
                </Typography>


            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>

    )
}
export default ReservationInfoComponent;
