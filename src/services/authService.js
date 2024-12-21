const API_URL = 'http://localhost:8080/api/v1'

export const login = async (data) => {
    try{
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        if(!res.ok){
            const error = await res.json();
            throw new Error(error.error || "Login Failed")
        }
        const result = await res.json();
        return result;
    }catch (error){
        return {error: true, message : error.message}
    }
   


}

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

export const verifyEmail = async (email, code) => {
    try {

        const res = await fetch (`${API_URL}/verify-email?email=${email}&code=${code}`, {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({})
        });
        
        if(!res.ok){
            const error = await res.json();
            throw new Error(error.error || "Validation failed")
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.log(error);
        return { error: true, message: error.message }
    }
}
export const resendValidationCode = async (email) => {
    try {

        const res = await fetch (`${API_URL}/resend-verification-code?email=${email}`, {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'},            
        });
        
        if(!res.ok){
            const error = await res.json();
            throw new Error(error.error || "Validation failed")
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.log(error);
        return { error: true, message: error.message }
    }
} 