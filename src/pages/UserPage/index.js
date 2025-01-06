import { Box } from "@mui/material";
import UserProfileComponent from "../../component/UserProfileComponent";
import UserReservationList from "../../component/UserReservationList";

function UserPage() {

    return (
        <>
            <Box sx={{ padding: { sm: 1, md: 3 }, maxWidth: 1000, display: 'flex', flexDirection: 'column' }}>
                <UserProfileComponent />
                <UserReservationList />
            </Box>
        </>
    )
}
export default UserPage;