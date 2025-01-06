import { Box, Typography } from "@mui/material";
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
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'tableName', headerName: 'Table name', width: 160 },
        { field: 'capacity', headerName: 'No.of Guests', width: 160 },
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'time', headerName: 'Time', width: 130 },
        { field: 'status', headerName: 'Status', sortable: false, width: 130 },
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
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    )
}
export default UserReservationList;