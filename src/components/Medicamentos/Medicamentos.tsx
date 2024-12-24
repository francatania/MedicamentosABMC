import { useState, useEffect } from "react";
import { Medicamento } from "../../interfaces/Medicamento";
import { getAllMedicamentos, getMedByFilter } from "../../api/medicamentos";
import MedicamentosList from "./MedicamentosList"
import MedicamentosFilter from "./MedicamentosFilter";


const Medicamentos: React.FC = () =>{
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    useEffect(()=>{
        const fetchMeds = async () =>{
            try {
                const data = await getAllMedicamentos();
                setMedicamentos(data);
            } catch (error: any) {
                console.error(error.message);
            }

        }
        fetchMeds();

    }, [])

    const handleSearch = async (filters: {NombreComercial? : string, IdMarca?:number, Activo?: boolean}) =>{

        try {
            const data = await getMedByFilter(filters);
            setMedicamentos(data);
            
        } catch (error) {
            console.error("Hubo un error al hacer el fetch");
        }
    }

    return (
        <div className="p-4 flex flex-col w-[80%] m-auto">
            <h1 className="text-2xl text-center">Listado de Medicamentos</h1>
            <MedicamentosFilter onSearchFunction = {handleSearch}/>
            <MedicamentosList
                medicamentos ={medicamentos}/>
        </div>

    )

}

export default Medicamentos;