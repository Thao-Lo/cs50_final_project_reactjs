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
    const [paginationModel, serPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [totalRows, setTotalRows] = useState(0);

    const columns = [
        { field: 'id', headerName: 'No', width: 100 },
        { field: 'tableName', headerName: 'Table name', width: 140 },
        { field: 'capacity', headerName: 'Guests', width: 120 },
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'time', headerName: 'Time', width: 110 },
        { field: 'status', headerName: 'Status', sortable: false, width: 110 },
    ];

    const fetchUserReservationList = async () => {
        const result = await retrieveUserReservationList(user.id, paginationModel.page, paginationModel.pageSize);
        if (result.error) {
            dispatch({ type: RESERVATION_ACTION.SET_ERROR, payload: { errorMessage: result.message } })
            return;
        }
        console.log(result);
        setReservationList(result.reservationList);
        setTotalRows(result.totalRows)
    }

    useEffect(() => {
        if (user) {
            fetchUserReservationList();
        }
    }, [paginationModel,user])

    console.log("reservationList", reservationList);

    const rows = reservationList && reservationList.map(({ tableName, capacity, date, time, status }, index) => ({
        id: paginationModel.page * paginationModel.pageSize + index + 1,
        tableName,
        capacity,
        date,
        time,
        status
    })
    );
    console.log(rows);
    const handlePaginationChange = (newModel) => {
        serPaginationModel(newModel);
    }
    // const paginationModel = { page: 0, pageSize: 5 };

    if (!user) {
        return <Typography variant="subtitle1">Loading user profile...</Typography>;
    }
    return (
        <>
            <Box>
                <Typography variant="h6" sx={{ pl: 1 }}>Your Reservation:</Typography>
                <TableContainer sx={{ height: 900, width: '100%' }}>
                    <Paper sx={{ height: 630, maxWidth: 1000 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowCount={totalRows}
                            pagination
                            paginationMode="server"
                            pageSizeOptions={[10, 15]}
                            onPaginationModelChange={handlePaginationChange}
                            paginationModel={paginationModel}
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