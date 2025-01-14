import { useEffect, useState } from "react";
import { Box, Button, Paper, TableContainer, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import EditUserRoleButton from "../EditUserRoleButton";
import { retrieveReservationList } from "../../../services/adminManagementService";

function ReservationListComponent () {
   //initial state of Reservation List
   const [reservationsData, setReservationsData] = useState({
    reservations: [],
    currentPage: null,
    reservationsPerPage: 0,
    totalPages: 0,
    totalRows: 0
});
const [error, setError] = useState(null);
// for both success or error when calling API to update user role
const [updateValueMessage, setUpdateValueMessage] = useState({ text: null, type: null })
//flag to show or hide the updateValueMessage
const [showMessage, setShowMessage] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

//Data grid columns - key, header name and size 
const columns = [
    { field: 'index', headerName: 'No', width: 90 },
    { field: 'id', headerName: 'Slot Id', width: 100 },
    { field: 'tableName', headerName: 'Table Name', width: 130 },
    { field: 'capacity', headerName: 'Capacity', width: 100 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'status', headerName: 'Status', width: 140 },
    {
        field: 'edit', headerName: 'Edit Status', width: 110,
        renderCell: (params) => (
            //passing whole user data as a prop using params.row {id, email, username,..} destructuring in props
            <EditUserRoleButton key={params.row.id} id={params.row.id} value={params.row.role}
                handleUpdateValueMessage={handleUpdateValueMessage}
            />
        ),
    },
];
// return success or error mesasge when click Edit button, change user Role, and Confirm change
const handleUpdateValueMessage = (newMessage) => {
    setUpdateValueMessage(newMessage)
}
//function help to show updatedValue message and clear it in 5s without reRender user ist
const displayUpdatedMessage = () => {
    setShowMessage(true);
    const timer = setTimeout(() => setShowMessage(false), 5000);
    return () => clearTimeout(timer);
}

const fetchReservationList = async () => {
    setIsLoading(true)
    const result = await retrieveReservationList(paginationModel.page, paginationModel.pageSize);
    if (result.error) {
        setError(result.message);
        return;
    }
    setError(null);
    setReservationsData({
        reservations: result.reservations,
        currentPage: result.currentPage,
        reservationsPerPage: result.usersPerPage,
        totalPages: result.totalPages,
        totalRows: result.totalReservations
    })
    setIsLoading(false)
}
// Fetch user list based on pagination or when role update succeeds
useEffect(() => {
    if (updateValueMessage.type === 'success' || updateValueMessage.type === null) {
        fetchReservationList();
    }
}, [paginationModel, updateValueMessage])

// to update the success or error message when it's changed
useEffect(() => {
    displayUpdatedMessage()
}, [updateValueMessage])

//render user list for each row
const rows = reservationsData.reservations && reservationsData.reservations.map(({   id, tableName, capacity, date, time, status  }, index) => ({
    index: paginationModel.page * paginationModel.pageSize + index + 1,
    id, tableName, capacity, date, time, status 

}))
const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
}
if (error) return <Box>{error}</Box>
if (isLoading) return <Box>Loading User Data .... </Box>

return (
    <>
        <Box>
            <Typography variant="h6" sx={{ pl: 1 }}>User List:</Typography>
            {showMessage && (
                <Typography variant="subtitle1" sx={{ color: updateValueMessage.type === 'success' ? "green" : "red", marginBottom: 2 }}>
                    {updateValueMessage.text}
                </Typography>
            )}
            <TableContainer sx={{ height: 900, width: '100%' }}>
                <Paper sx={{ height: 630, maxWidth: 1000 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={reservationsData.totalRows}
                        pagination
                        paginationMode="server"
                        pageSizeOptions={[10,15]}
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
export default ReservationListComponent;