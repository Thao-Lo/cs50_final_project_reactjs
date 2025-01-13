import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";


function RoleGuard({ allowedRole }) {
    const { state: { user, isAuthenticated } } = useUser();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }
    if (allowedRole.includes(user.role)) {
        return <Outlet />
    }
    return <Navigate to="/403" replace />

}
export default RoleGuard;