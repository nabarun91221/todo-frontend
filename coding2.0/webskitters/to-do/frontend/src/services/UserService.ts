import { RegisterUserPayload } from "@/interfaces/payload.types/RegisterUserPayload";
import { LoginUserPayload } from "@/interfaces/payload.types/LoginUserPayload";

export const RegisterUser = async (data: RegisterUserPayload) => {
    const res = await fetch("http://localhost:9090/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    return res;
}
export const LoginUser = async (data: LoginUserPayload) => {


    try {
        const res: any = await fetch("http://localhost:9090/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });
        return res; // Return the response object
    } catch (error) {
        console.error("Error occurred during fetch:", error);
        throw error; // Re-throw the error for further handling if needed
    }


}
export const logOutUser = async () => {
    try {
        const res = await fetch("http://localhost:9090/log-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies
            // mode:"no-cors"
        });
        return res
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};
export const RefreshJwtToken = async () => {
    const res = await fetch("http://localhost:8080/refresh-jwt-token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    })

    return res;

}
export const ValidateJwtToken = async () => {
    try {
        const res = await fetch("http://localhost:8080/validate-refresh-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        return res;
    } catch (e) {
        throw e;
        ///
    }


}

// Function to fetch user information with Authorization header
export const fetchUserInfo = async () => {
    // document.cookie&&console.log()
    try {
        const response = await fetch("http://localhost:8080/user", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);

        }

        return response; // Return parsed JSON response
    } catch (error) {
        console.clear();
        throw error;
    }
};


