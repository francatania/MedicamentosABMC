import { Medicamento } from "../interfaces/Medicamento";
import { Marca } from "../interfaces/Marca";

const API_URL_GETALL = "https://localhost:44379/api/Medicamento"
const API_URL_GET_BY_FILTER = "https://localhost:44379/api/Medicamento/Filter?"
const API_URL_GET_MARCAS = "https://localhost:44379/api/Marca";

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

export const getMedByFilter = async(filters: {
    NombreComercial? : string,
    IdMarca? : number,
    Activo?: boolean
}): Promise<Medicamento[]> =>{
    const token = localStorage.getItem("token");
    const params = new URLSearchParams;

    if(filters.NombreComercial) params.append("NombreComercial", filters.NombreComercial);
    if(filters.IdMarca) params.append("IdMarca", filters.IdMarca.toString());
    if(filters.Activo !== undefined) params.append("Activo", filters.Activo.toString());

    const endpoint = `${API_URL_GET_BY_FILTER}${params}`;

    console.log(endpoint)

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "aplicattion/json"
        }
    });

    if(!response.ok){
        throw new Error("Error al obtener los datos.")
    };

    return response.json();
}

export const getMarcas = async(): Promise<Marca[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL_GET_MARCAS, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "aplicattion/json"
        }
    });

    if(!response.ok){
        throw new Error("Error al obtener las marcas");
    }

    return response.json();
}
