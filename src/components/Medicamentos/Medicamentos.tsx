import { useState, useEffect } from "react";
import { Medicamento } from "../../interfaces/Medicamento";
import { getAllMedicamentos } from "../../api/medicamentos";
import MedicamentosList from "./MedicamentosList"

const Medicamentos: React.FC = () =>{
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    useEffect(()=>{
        const fetchMeds = async () =>{
            const data = await getAllMedicamentos();
            setMedicamentos(data);
            console.log(data);
        }
        fetchMeds();

    }, [])

    return (
        <div className="p-4 flex flex-col">
            <h1 className="text-2xl text-center">Listado de Medicamentos</h1>
            <MedicamentosList
                medicamentos ={medicamentos}/>
        </div>

    )

}

export default Medicamentos;