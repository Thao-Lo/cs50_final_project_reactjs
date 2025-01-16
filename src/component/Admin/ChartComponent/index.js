import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { retrieveReservationsCountsPerSeat } from '../../../services/adminManagementService';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';


function TickParamsSelector({
    tickPlacement,
    tickLabelPlacement,
    setTickPlacement,
    setTickLabelPlacement,
}) {
    return (
        <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
            {/* TICK PLACEMENT */}
            <FormControl>
                <FormLabel id="tick-placement-radio-buttons-group-label">
                    Tick Placement
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="tick-placement-radio-buttons-group-label"
                    name="tick-placement"
                    value={tickPlacement}
                    onChange={(event) => setTickPlacement(event.target.value)}
                >
                    <FormControlLabel value="start" control={<Radio />} label="start" />
                    <FormControlLabel value="end" control={<Radio />} label="end" />
                    <FormControlLabel value="middle" control={<Radio />} label="middle" />
                    <FormControlLabel
                        value="extremities"
                        control={<Radio />}
                        label="extremities"
                    />
                </RadioGroup>
            </FormControl>
            {/* TICK LABEL PLACEMENT */}
            <FormControl>
                <FormLabel id="label-placement-radio-buttons-group-label">
                    Tick Table Placement
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="label-placement-radio-buttons-group-label"
                    name="label-placement"
                    value={tickLabelPlacement}
                    onChange={(event) => setTickLabelPlacement(event.target.value)}
                >
                    <FormControlLabel value="tick" control={<Radio />} label="tick" />
                    <FormControlLabel value="middle" control={<Radio />} label="middle" />
                </RadioGroup>
            </FormControl>
        </Stack>
    );
}
//hover on each chart
function valueFormatter(value) {
    return `${value} times`;
}
export default function ChartComponent() {
    const [tickPlacement, setTickPlacement] = useState('middle');
    const [tickLabelPlacement, setTickLabelPlacement] = useState('middle');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReservationsCountsPerSeat = async () => {
        const result = await retrieveReservationsCountsPerSeat();
        if (result.error) {
            setError(result.message);
            return;
        }
        setData(result.seatDataset);
        console.log(result.seatDataset);
        setIsLoading(false);
        setError(null);
    }
    useEffect(() => {
        fetchReservationsCountsPerSeat();
    }, [])

    if (error) return <Box sx={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</Box>
    if (isLoading) return <Box sx={{ textAlign: 'center', padding: '20px' }}>Loading Data...</Box>

    const chartSetting = {
        yAxis: [
            {
                label: 'Number of Reservation (times) ',
            },
        ],
        series: [{ dataKey: 'reservationCount', label: 'Booking value', valueFormatter }],
        height: 500,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    return (
        <div style={{ width: 780 }}>          
            <BarChart
                dataset={data}
                xAxis={[
                    { scaleType: 'band', dataKey: 'seatName', tickPlacement, tickLabelPlacement },
                ]}
                {...chartSetting}
            />
              <TickParamsSelector
                tickPlacement={tickPlacement}
                tickLabelPlacement={tickLabelPlacement}
                setTickPlacement={setTickPlacement}
                setTickLabelPlacement={setTickLabelPlacement}
            />
        </div>
    );
}
