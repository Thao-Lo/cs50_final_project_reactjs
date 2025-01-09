import { Box, Typography } from "@mui/material";
import { useUser } from "../../hooks/UserContext";
import Grid from '@mui/material/Grid2';

function UserProfileComponent() {
    const { state: { user }, dispatch } = useUser();
    if (!user) {
        return <Typography variant="subtitle1">Loading user profile...</Typography>;
    }
    return (
        <>

            <Grid container spacing={1} sx={{ mb: 2, pl: 1 }}>
                <Grid size={{ xs: 12, sm: 6}}>
                    <Typography sx={{ mb: 1, fontSize: '2rem' }}>Hi {user.username}!</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6}}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Email: {user.email}</Typography>
                    <Typography variant="subtitle1">Username: {user.username}</Typography>
                </Grid>
            </Grid>



        </>
    )
}
export default UserProfileComponent;