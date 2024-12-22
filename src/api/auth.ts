import { LoginCredentials, LoginResponse } from "../interfaces/Auth";

const API_URL_LOGIN = "https://localhost:44379/api/Auth/login";

export const login = async (credentials: LoginCredentials): Promise<string> =>{
    const response = await fetch(API_URL_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    if(!response.ok){
        throw new Error("Credenciales incorrectas.");
    }

    const data: LoginResponse = await response.json();
    return data.token;

}