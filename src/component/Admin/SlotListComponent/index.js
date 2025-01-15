import { useEffect, useState } from "react";
import { Box,  Paper, TableContainer, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { retrieveSlotList } from "../../../services/adminManagementService";

function SlotListComponent() {
    //initial state of DateList
    const [slotsData, setSlotsData] = useState({
        slots: [],
        currentPage: null,
        slotsPerPage: 0,
        totalPages: 0,
        totalRows: 0
    });
    const [error, setError] = useState(null);
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
        { field: 'status', headerName: 'Status', width: 140 }
    ];

    const fetchSlotList = async () => {
        setIsLoading(true)
        const result = await retrieveSlotList(paginationModel.page, paginationModel.pageSize);
        if (result.error) {
            setError(result.message);
            console.log("slot list error: " + result.message);
            return;
        }
        console.log(result);
        setError(null);
        setSlotsData({
            slots: result.slots,
            currentPage: result.currentPage,
            slotsPerPage: result.slotsPerPage,
            totalPages: result.totalPages,
            totalRows: result.totalSlots
        })
        setIsLoading(false)
    }
    // Fetch user list based on pagination 
    useEffect(() => {
        fetchSlotList();
    }, [paginationModel])


    //render date list for each row
    const rows = slotsData.slots && slotsData.slots.map(({ id, tableName, capacity, date, time, status }, index) => ({
        index: paginationModel.page * paginationModel.pageSize + index + 1,
        id, tableName, capacity, date, time, status 

    }))
    const handlePaginationChange = (newModel) => {
        setPaginationModel(newModel);
    }
    if (error) return <Box>{error}</Box>
    if (isLoading) return <Box>Loading Date Data .... </Box>

    return (
        <>
            <Box sx={{ p: { xs: 0, sm: 2 } }}>
                <Typography variant="h6" sx={{ pl: 1 }}>Slot List</Typography>
                <TableContainer sx={{ height: 900, width: '100%' }}>
                    <Paper sx={{ height: 630, maxWidth: 1000 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowCount={slotsData.totalRows}
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
export default SlotListComponent;