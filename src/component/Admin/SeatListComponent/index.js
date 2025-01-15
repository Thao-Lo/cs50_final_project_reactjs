import { useEffect, useState } from "react";
import { Box,  Paper, TableContainer, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { retrieveSeatList } from "../../../services/adminManagementService";

function SeatListComponent() {
    //initial state of SeatList
    const [seatsData, setSeatsData] = useState({
        seats: [],
        currentPage: null,
        seatsPerPage: 0,
        totalPages: 0,
        totalRows: 0
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

    //Data grid columns - key, header name and size 
    const columns = [
        { field: 'index', headerName: 'No', width: 90 },
        { field: 'seatName', headerName: 'Seat Name', width: 140 },
        { field: 'capacity', headerName: 'Capacity', width: 140 },
        { field: 'id', headerName: 'Seat Id', width: 100 },
    ];

    const fetchSeatList = async () => {
        setIsLoading(true)
        const result = await retrieveSeatList(paginationModel.page, paginationModel.pageSize);
        if (result.error) {
            setError(result.message);
            return;
        }
        setError(null);
        setSeatsData({
            seats: result.seats,
            currentPage: result.currentPage,
            seatsPerPage: result.seatsPerPage,
            totalPages: result.totalPages,
            totalRows: result.totalSeats
        })
        setIsLoading(false)
    }
    // Fetch user list based on pagination 
    useEffect(() => {
        fetchSeatList();
    }, [paginationModel])


    //render date list for each row
    const rows = seatsData.seats && seatsData.seats.map(({ id, seatName, capacity }, index) => ({
        index: paginationModel.page * paginationModel.pageSize + index + 1,
        seatName, capacity, id

    }))
    const handlePaginationChange = (newModel) => {
        setPaginationModel(newModel);
    }
    if (error) return <Box>{error}</Box>
    if (isLoading) return <Box>Loading Seat Data .... </Box>

    return (
        <>
            <Box sx={{ p: { xs: 0, sm: 2 } }}>
                <Typography variant="h6" sx={{ pl: 1 }}>Seat List</Typography>
                <TableContainer sx={{ height: 900, width: '100%' }}>
                    <Paper sx={{ height: 630, maxWidth: 1000 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowCount={seatsData.totalRows}
                            pagination
                            paginationMode="server"
                            pageSizeOptions={[10, 15]}
                            onPaginationModelChange={handlePaginationChange}
                            paginationModel={paginationModel}                           
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </TableContainer>

            </Box>
        </>
    )
}
export default SeatListComponent;