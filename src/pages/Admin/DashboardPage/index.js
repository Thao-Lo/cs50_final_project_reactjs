import { Box, Typography } from "@mui/material";
import ChartComponent from "../../../component/Admin/ChartComponent";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function DashboardPage() {

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <AutoGraphIcon/>
                <Typography sx={{ fontSize: '1.25rem' }}>Dashboard</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography sx={{ mb: 2 }}><strong>Chart Information:</strong> Total Reservation counts for each Table</Typography>
                <ChartComponent />
            </Box>
        </Box>
    )
}
export default DashboardPage;