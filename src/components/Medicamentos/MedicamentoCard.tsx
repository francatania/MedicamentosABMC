import { useEffect, useState } from "react";
import { Medicamento } from "../../interfaces/Medicamento";
import { useMedicamento } from "../../context/MedicamentoContext";
import { Link, useLocation } from "react-router-dom";



const MedicamentoCard: React.FC = ()=>{
    const [data, setData] = useState<Medicamento | null>()
    const {selectedMedicamento} = useMedicamento()
    const location = useLocation();
    const action = location.pathname.includes("view") ? "view" : location.pathname.includes("edit") ? "edit" : "create";

    useEffect(() =>{
        if(action !== "create" && selectedMedicamento){
            setData(selectedMedicamento);
        }

    }, [action, selectedMedicamento])



    return <>
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            <div className="w-[50%] bg-white h-[10%] rounded-t-lg p-4 shadow-lg border-r-2 border-l-2 border-t-2 border-gray-300">
                <div>
                   <Link to={"/medicamentos"}><h3 className="text-sm text-gray-500"> {"<- Volver"}</h3></Link> 
                </div>
                <div className="w-full flex justify-start">
                    <h2 className="text-xl">Detalle</h2>
                </div>
            </div>
            <div className="w-[50%] bg-white h-[75%] rounded-b-lg p-4 shadow-lg border-r-2 border-l-2 border-b-2 border-gray-300">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Id</label>
                        <input type="text"
                        disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.idMedicamento} />
                    </div>

                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Nombre</label>
                        <input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.nombreMedicamento} />
                    </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Marca</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.marca} /> : <select name="" id=""></select> } 
                        
                    </div>
                    <div className="flex flex-col w-[40%]" >
                        <label htmlFor="">Laboratorio</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.laboratorio} /> : <select name="" id=""></select> } 
                    </div>
                </div>

                <div className="flex justify-between w-full mt-2">
                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Monodroga</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.monodroga} /> : <select name="" id=""></select> } 
                        
                    </div>
                    <div className="flex flex-col w-[40%]" >
                        <label htmlFor="">Presentación</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.presentacion} /> : <select name="" id=""></select> } 
                    </div>
                </div>

                <div className="flex justify-start w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="">Descripción</label>
                        <input type="text"
                        disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.descripcion} />
                    </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="">Venta Libre</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.ventaLibre ? "Sí" : "No"} /> : <input type="checkbox"/> } 
                        
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="">Activo</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.activo ? "Sí" : "No"} /> : <input type="checkbox"/> } 
                        
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="">Precio</label>
                        <input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={`$${data?.precio}`}/>
                        
                    </div>
                </div>
                <div></div>
            </div>

        </div>

    </>
} 

export default MedicamentoCard