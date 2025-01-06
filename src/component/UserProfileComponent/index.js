import { Box, Typography } from "@mui/material";
import { useUser } from "../../hooks/UserContext";

function UserProfileComponent() {
    const { state: { user }, dispatch } = useUser();
    if (!user) {
        return <Typography variant="subtitle1">Loading user profile...</Typography>;
    }
    return (
        <>
            <Box sx={{ mb: 2, pl: 1 }}>
                <Typography sx={{ mb: 1, fontSize: '2rem' }}>Hi {user.username}!</Typography>
                <Box sx={{}}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Email: {user.email}</Typography>
                    <Typography variant="subtitle1">Username: {user.username}</Typography>
                </Box>
            </Box>


        </>
    )
}
export default UserProfileComponent;