import { useEffect, useState } from "react";
import { retrieveUserList } from "../../../services/adminUserService";
import { Box, Button, Paper, TableContainer, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

function UserListComponent() {
    const [usersData, setUsersData] = useState({
        users: [],
        currentPage: null,
        usersPerPage: null,
        totalPages: null,
        totalRows: null
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, serPaginationModel] = useState({ page: 0, pageSize: 5 })  

    const columns = [
        { field: 'index', headerName: 'No', width: 90 },
        { field: 'username', headerName: 'Username', width: 140 },
        { field: 'id', headerName: 'User Id', width: 90 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'role', headerName: 'Role', width: 110 },
        { field: 'edit', headerName: 'Edit Role', width: 110,  
            renderCell: (params) => (
            <Button variant="contained" size="small">
                Edit
            </Button>
        ), },
    ];

    const fetchUserList = async () => {
        setIsLoading(true)
        const result = await retrieveUserList(paginationModel.page, paginationModel.pageSize);
        if (result.error) {
            setError(result.message);
            return;
        }
        setError(null);
        setUsersData({
            users: result.users,
            currentPage: result.currentPage,
            usersPerPage: result.usersPerPage,
            totalPages: result.totalPages,
            totalRows: result.totalUsers
        })
        setIsLoading(false)
    }
    useEffect(() => {
        fetchUserList();
    }, [paginationModel])

    const rows = usersData.users && usersData.users.map(({ id, username, email, role }, index) => ({
        index: paginationModel.page * paginationModel.pageSize + index + 1,
        username, id, email, role
       
    }))
    const handlePaginationChange = (newModel) => {
        serPaginationModel(newModel);
    }
    if (error) return <Box>{error}</Box>
    if (isLoading) return <Box>Loading User Data .... </Box>

    return (
        <>
            <Box>
                <Typography variant="h6" sx={{ pl: 1 }}>User List:</Typography>
                <TableContainer sx={{ height: 900, width: '100%' }}>
                    <Paper sx={{ height: 400, maxWidth: 1000 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowCount={usersData.totalRows}
                            pagination
                            paginationMode="server"
                            pageSizeOptions={[5, 10]}
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
export default UserListComponent;