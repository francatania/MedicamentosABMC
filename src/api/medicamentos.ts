import { Medicamento } from "../interfaces/Medicamento";
import { Marca } from "../interfaces/Marca";
import { Laboratorio } from "../interfaces/Laboratorio";
import { Presentacion } from "../interfaces/Presentacion";
import { Monodroga } from "../interfaces/Monodroga";

const API_URL_GETALL = "https://localhost:44379/api/Medicamento"
const API_URL_GET_BY_FILTER = "https://localhost:44379/api/Medicamento/Filter?"
const API_URL_GET_MARCAS = "https://localhost:44379/api/Marca";
const API_URL_GET_LABS = "https://localhost:44379/api/Laboratorio";
const API_URL_GET_MONODROGA = "https://localhost:44379/api/Monodroga";
const API_URL_GET_PRESENTACION = "https://localhost:44379/api/Presentacion";
const API_URL_GET_BY_ID = "https://localhost:44379/api/Medicamento/Id";
const API_URL_GET_BY_ID_SAVE_DTO = "https://localhost:44379/api/Medicamento/GetForSave/id";

const getToken = () =>{
    const token = localStorage.getItem("token");
    return token;

}
export const getAllMedicamentos = async(): Promise<Medicamento[]> =>{

    const token = getToken();

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
    const token = getToken();
    const params = new URLSearchParams;

    console.log(filters.Activo);

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
    const token = getToken();
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

export const getLabs = async(): Promise<Laboratorio[]> => {
    const token = getToken();
    const response = await fetch(API_URL_GET_LABS, {
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

export const getPresentaciones = async(): Promise<Presentacion[]> => {
    const token = getToken();
    const response = await fetch(API_URL_GET_PRESENTACION, {
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

export const getMonodrogas = async(): Promise<Monodroga[]> => {
    const token = getToken();
    const response = await fetch(API_URL_GET_MONODROGA, {
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




export const getMedById = async(id: number) =>{
    const token = getToken();
    const url = `${API_URL_GET_BY_ID}?id=${id}`
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "aplicattion/json"
        }
    });

    if(!response.ok){
        throw new Error("Error al obtener el medicamento.");
    }

    return response.json();
}

export const getMedByIdSaveDto = async(id: number) =>{
    const token = getToken();
    const url = `${API_URL_GET_BY_ID_SAVE_DTO}?id=${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "aplicattion/json"
        }
    });

    if(!response.ok){
        throw new Error("Error al obtener el medicamento.");
    }

    return response.json();
}