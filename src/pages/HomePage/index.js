import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { Typography } from "@mui/material";
import { getHomePage } from "../../services/authService";

function HomePage() {
    const { state: { user }, dispatch } = useUser();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('')

    const fetchHomePage = async () => {
        try {
            const result = await getHomePage();
            if (result.error) {
                setError(result.message);
                return;
            }
            setMessage(result.message);
        } finally {
            setIsLoading(false); // Ensure loading is set to false after the API call
        }
    }
    useEffect(() => {
        fetchHomePage()
        setIsLoading(false)
    }, [user])

    if (isLoading) {
        return <Typography variant="subtitle1">Loading Home page...</Typography>;
    }
    if (error) {
        return <Typography variant="subtitle1">{error}...</Typography>;
    }

    return <h1>{message}</h1>

}
export default HomePage;