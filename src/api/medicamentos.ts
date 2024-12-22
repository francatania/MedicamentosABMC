import { Medicamento } from "../interfaces/Medicamento";

const API_URL_GETALL = "https://localhost:44379/api/Medicamento"

export const getAllMedicamentos = async(): Promise<Medicamento[]> =>{

    const token = localStorage.getItem("token");

    if(!token){
        throw new Error("Error al obtener el token.")
    }


    const response = await fetch(API_URL_GETALL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "aplicattion/json"
        }
    });

    if(!response.ok){
        throw new Error("Error. Revisar tus credenciales");
        
    }
    return await response.json();
    

}