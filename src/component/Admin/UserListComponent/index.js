import { useEffect, useState } from "react";
import { retrieveUserList } from "../../../services/adminUserService";
import { Box, Button, Paper, TableContainer, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import EditButton from "../EditButton";


function UserListComponent() {
    //initial state of UserList
    const [usersData, setUsersData] = useState({
        users: [],
        currentPage: null,
        usersPerPage: 0,
        totalPages: 0,
        totalRows: 0
    });
    const [error, setError] = useState(null);
    // for both success or error when calling API to update user role
    const [updateValueMessage, setUpdateValueMessage] = useState({ text: null, type: null })
    //flag to show or hide the updateValueMessage
    const [showMessage, setShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

    //Data grid columns - key, header name and size 
    const columns = [
        { field: 'index', headerName: 'No', width: 90 },
        { field: 'username', headerName: 'Username', width: 140 },
        { field: 'id', headerName: 'User Id', width: 90 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'role', headerName: 'Role', width: 110 },
        {
            field: 'edit', headerName: 'Edit Role', width: 110,
            renderCell: (params) => (
                //passing whole user data as a prop using params.row {id, email, username,..} destructuring in props
                <EditButton key={params.row.id} id={params.row.id} value={params.row.role}
                    handleUpdateValueMessage={handleUpdateValueMessage} type={'Role'}
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
    // Fetch user list based on pagination or when role update succeeds
    useEffect(() => {
        if (updateValueMessage.type === 'success' || updateValueMessage.type === null) {
            fetchUserList();
        }
    }, [paginationModel, updateValueMessage])

    // to update the success or error message when it's changed
    useEffect(() => {
        displayUpdatedMessage()
    }, [updateValueMessage])

    //render user list for each row
    const rows = usersData.users && usersData.users.map(({ id, username, email, role }, index) => ({
        index: paginationModel.page * paginationModel.pageSize + index + 1,
        username, id, email, role

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
                    <Paper sx={{ height: 600, maxWidth: 1000 }}>
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