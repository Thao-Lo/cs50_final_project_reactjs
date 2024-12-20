const API_URL = 'http://localhost:8080/api/v1'

export const register = async (data) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log(res.status);
        if (!res.ok) {
            const error = await res.json();
            console.log(error);

            throw new Error(error.error || "Registration Failed")
        }

        const result = await res.json();
       
        return result;
    } catch (error) {
        console.log(error.message);
        return { error: true, message: error.message }
    }

}