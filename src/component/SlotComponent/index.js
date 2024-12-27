import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import ConfirmBookingDialog from "../ConfirmBookingDialog";
import { useState } from "react";



function SlotComponent({ slot, handleSlotClick }) {


    return (
        <Box sx={{ mb: 2 }}>
            <Card sx={{ width: '8rem' }}>
                <CardActionArea onClick={handleSlotClick}>
                    <CardContent sx={{ padding: '0.5rem' }}>
                        <Typography gutterBottom variant="body" component="div" sx={{ textAlign: 'center' }}>
                            {slot.time}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: "ellipsis" }}>
                            {slot.tableName} - Dinning
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>

            

        </Box>
    );
}
export default SlotComponent;