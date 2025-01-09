import { Box, Container } from "@mui/material";
import UserProfileComponent from "../../component/UserProfileComponent";
import UserReservationList from "../../component/UserReservationList";

function UserPage() {

    return (
        <>
            <Container maxWidth="lg" sx={{ p: { xs: 1 } }}>
                <Box sx={{ padding: { sm: 1, md: 3 }, maxWidth: 1000, display: 'flex', flexDirection: 'column' }}>
                    <UserProfileComponent />
                    <UserReservationList />
                </Box>
            </Container>
        </>
    )
}
export default UserPage;