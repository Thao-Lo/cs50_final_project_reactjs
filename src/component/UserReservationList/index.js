import { Box, TableContainer, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useUser } from "../../hooks/UserContext";
import { retrieveUserReservationList } from "../../services/reservationService";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { useEffect, useState } from "react";

function UserReservationList() {
    const { state: { user } } = useUser();
    const { state: { error }, dispatch } = useReservation();
    const [reservationList, setReservationList] = useState([]);

    const columns = [
        { field: 'id', headerName: 'No', width: 100 },
        { field: 'tableName', headerName: 'Table name', width: 140 },
        { field: 'capacity', headerName: 'Guests', width: 120 },
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'time', headerName: 'Time', width: 110 },
        { field: 'status', headerName: 'Status', sortable: false, width: 110 },
    ];
    const fetchUserReservationList = async () => {
        const result = await retrieveUserReservationList(user.id);
        if (result.error) {
            dispatch({ type: RESERVATION_ACTION.SET_ERROR, payload: { errorMessage: result.message } })
            return;
        }
        console.log(result);
        setReservationList(result.reservationList);
    }
    useEffect(() => {
        if (user) {
            fetchUserReservationList();
        }
    }, [user])
    console.log("reservationList", reservationList);

    const rows = reservationList && reservationList.map(({ tableName, capacity, date, time, status }, index) => ({
        id: index + 1,
        tableName,
        capacity,
        date,
        time,
        status
    })
    );
    console.log(rows);

    const paginationModel = { page: 0, pageSize: 5 };
    if (!user) {
        return <Typography variant="subtitle1">Loading user profile...</Typography>;
    }
    return (
        <>
            <Box>
                <Typography variant="h6" sx={{ pl: 1 }}>Your Reservation:</Typography>
                <TableContainer sx={{ height: 900, width: '100%' }}>
                    <Paper sx={{ height: 400, maxWidth: 900 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </TableContainer>

            </Box>
        </>
    )
}
export default UserReservationList;