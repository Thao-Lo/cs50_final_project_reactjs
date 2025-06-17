import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

function SlotComponent({ slot, handleSlotClick }) {

    const formattedSlotTime = slot.time.slice(0,5);

    return (
        <Box sx={{ mb: 2 }}>
            <Card sx={{ width: '8rem'}}>
                <CardActionArea  onClick={() => handleSlotClick(slot)}
                sx={{ 
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: 'action.selectedHover',
                    },
                  }}
                    >
                    <CardContent sx={{ padding: '0.3rem', display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                            {formattedSlotTime}
                        </Typography>   
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}
export default SlotComponent;