export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const json = await response.json();
            console.log("json", json);
            if (json.success) {
                // Save token to Redux store
                dispatch({ type: "Auth/SET_TOKEN", payload: json.authToken });
            }
        }
        catch (error) {
            console.log("Failed to login", error);
        }
    }
}