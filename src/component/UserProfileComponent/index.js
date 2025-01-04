import { Box, Typography } from "@mui/material";
import { useUser } from "../../hooks/UserContext";

function UserProfileComponent() {
    const { state: { user }, dispatch } = useUser();
    if (!user) {
        return <Typography variant="subtitle1">Loading user profile...</Typography>;
    }
    return (
        <>
            <Box>
                <Typography variant="h2">My Account</Typography>
                <Typography variant="subtitle1">{user.id}</Typography>
                <Typography variant="subtitle1">{user.email}</Typography>
                <Typography variant="subtitle1">{user.username}</Typography>
                <Typography variant="subtitle1">{user.role}</Typography>
            </Box>


        </>
    )
}
export default UserProfileComponent;