import { act, useEffect, useState } from "react";
import { Medicamento } from "../../interfaces/Medicamento";
import { useMedicamento } from "../../context/MedicamentoContext";
import { useToast } from "../../context/ToastContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Monodroga } from "../../interfaces/Monodroga";
import { Presentacion } from "../../interfaces/Presentacion";
import { Laboratorio } from "../../interfaces/Laboratorio";
import {Marca} from "../../interfaces/Marca";
import { getMarcas, getLabs, getPresentaciones, getMonodrogas, editMed, saveMed, getLastId } from "../../api/medicamentos";
import { MedicamentoSave } from "../../interfaces/MedicamentoSave";


const MedicamentoCard: React.FC = ()=>{
    const [data, setData] = useState<Medicamento| null>();
    const [lastId, setLastId] = useState<number>(0);
    const [dataMedSave, setDataMedSave] = useState<MedicamentoSave>({
        idMedicamento: lastId + 1, 
        nombreMedicamento: "",
        idMarca: 0,
        idLaboratorio: 0,
        idMonodroga: 0,
        idPresentacion: 0,
        descripcion: "",
        ventaLibre: false,
        activo: false,
        precio: 0,
      });
    const [monodrogas, setMonodrogas] = useState<Monodroga[]>();
    const [presentaciones, setPresentaciones] = useState<Presentacion[]>();
    const [laboratorios, setLaboratorios] = useState<Laboratorio[]>();
    const [marca, setMarcas] = useState<Marca[]>([]);
    const { setEdited, setCreated } = useToast();
    
    const {selectedMedicamento, selectedMedicamentoSave} = useMedicamento()
    const location = useLocation();
    const action = location.pathname.includes("view") ? "view" : location.pathname.includes("edit") ? "edit" : "create";
    const navigate = useNavigate();

    useEffect(() =>{
        if((action === "view") && selectedMedicamento){
            setData(selectedMedicamento);
        }else{
            setDataMedSave(selectedMedicamentoSave);
        }

    }, [action, selectedMedicamento])

    useEffect(() => {
        if (action === "create" && lastId !== 0) {
          setDataMedSave({
            idMedicamento: lastId + 1,
            nombreMedicamento: "",
            idMarca: 0,
            idLaboratorio: 0,
            idMonodroga: 0,
            idPresentacion: 0,
            descripcion: "",
            ventaLibre: false,
            activo: false,
            precio: 0,
          });
        }
      }, [action, lastId]);


    useEffect(()=>{console.log(action)}, [])

    useEffect(() =>{
        const fetchLastId = async() =>{
            try {
                if(action === "create"){
                    const id = await getLastId();
                    setLastId(id);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchLastId();

    }, [])

    useEffect(()=>{
        const fetchSelects = async() =>{
            if(action !== "view"){
                try {
                    const dataMarcas = await getMarcas();
                    const dataLabs = await getLabs();
                    const dataPresentacion = await getPresentaciones();
                    const dataMonodroga = await getMonodrogas();
                    
                    setMarcas(dataMarcas);
                    setLaboratorios(dataLabs)
                    setPresentaciones(dataPresentacion)
                    setMonodrogas(dataMonodroga)
                } catch (error) {
                    console.error(error);
                }


            }
        }

        fetchSelects();

    },[])

    const handleEditMed = async(): Promise<void> =>{
        if(!dataMedSave){
            return
        }
        try {
            await editMed(dataMedSave);
            setEdited();
            navigate('/medicamentos')
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveMed = async(): Promise<void> =>{
        if(!dataMedSave){
            return
        }
        try {
            const response = await saveMed(dataMedSave);
            setCreated();
            console.log("medicamento agregado");
            navigate('/medicamentos')
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const { name, value, type } = e.target;

        setDataMedSave((prevData) => ({
          ...prevData,
          [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));

    }



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
            <div className="w-[50%] bg-white h-[75%] rounded-b-lg p-4 shadow-lg border-r-2 border-l-2 border-b-2 border-gray-300 flex flex-col justify-between">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Id</label>
                        {action === "view" ?                         
                        <input type="text"
                        disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.idMedicamento} />
                        : action === "edit" ? 
                        <input type="text"
                        disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={dataMedSave?.idMedicamento} />
                        :                        
                        <input type="text"
                        disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={lastId + 1} />
                        }

                    </div>

                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Nombre</label>
                            
                        {action === "view" ? 
                         <input type="text" disabled name="nombreMedicamento" className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.nombreMedicamento}
                        />
                        :
                        action === "create"?
                        <input type="text" name="nombreMedicamento" className="text-black border-2 border-gray-300 p-2 rounded-md" onChange={handleChange}
                        />
                        :
                        <input type="text"  name="nombreMedicamento" className="text-black border-2 border-gray-300 p-2 rounded-md" value={dataMedSave?.nombreMedicamento}
                        onChange={handleChange} />}    

                        
                        
                    </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Marca</label>
                        {action === "view" ?<input type="text"  disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.marca} /> 
                        : 
                        <select name="idMarca" id=""
                        onChange={handleChange}>
                            {action === "edit" ?
                            <option value={dataMedSave?.idMarca} >
                            {marca?.find(m => m.idMarca === dataMedSave?.idMarca)?.nombreMarca || "Marca"}
                          </option>
                            
                            :
                            <option value="" disabled selected> Marcas</option>
                            }
                            {marca?.map(m => ( 
                                <option value={m.idMarca} key={m.idMarca}> {m.nombreMarca}</option>
                            ))}
                        </select> } 
                        
                    </div>
                    <div className="flex flex-col w-[40%]" >
                        <label htmlFor="">Laboratorio</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.laboratorio} /> 
                        : 
                        <select name="idLaboratorio" id=""
                        onChange={handleChange}>
                            {action === "edit" ?
                            <option value={dataMedSave?.idLaboratorio} >
                            {laboratorios?.find(m => m.idLaboratorio === dataMedSave?.idLaboratorio)?.nombreLaboratorio || "Laboratorio"}
                          </option>
                            
                            :
                            <option value="" disabled selected> Laboratorios</option>
                            }
                            {laboratorios?.map(m => ( 
                                <option value={m.idLaboratorio} key={m.idLaboratorio}> {m.nombreLaboratorio}</option>
                            ))}
                        </select> } 
                    </div>
                </div>

                <div className="flex justify-between w-full mt-2">
                    <div className="flex flex-col w-[40%]">
                        <label htmlFor="">Monodroga</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.monodroga} /> 
                        :                        
                        <select name="idMonodroga" id=""
                        onChange={handleChange}>
                            {action === "edit" ?
                            <option value={dataMedSave?.idMonodroga} >
                            {monodrogas?.find(m => m.idMonodroga === dataMedSave?.idMonodroga)?.monodroga1 || "Monodroga"}
                          </option>
                            
                            :
                            <option value="" disabled selected> Monodrogas</option>
                            }
                            {monodrogas?.map(m => ( 
                                <option value={m.idMonodroga} key={m.idMonodroga}> {m.monodroga1}</option>
                            ))}
                        </select> }  
                        
                    </div>
                    <div className="flex flex-col w-[40%]" >
                        <label htmlFor="">Presentación</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.presentacion} /> 
                        : 
                        <select name="idPresentacion" id=""
                        onChange={handleChange}>
                            {action === "edit" ?
                            <option value={dataMedSave?.idPresentacion} >
                            {presentaciones?.find(m => m.idPresentacion === dataMedSave?.idPresentacion)?.nombrePresentacion || "Monodroga"}
                          </option>
                            
                            :
                            <option value="" disabled selected> Presentaciones</option>
                            }
                            {presentaciones?.map(m => ( 
                                <option value={m.idPresentacion} key={m.idPresentacion}> {m.nombrePresentacion}</option>
                            ))}
                        </select> }   
                    </div>
                </div>

                <div className="flex justify-start w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="">Descripción</label>
                        {action === "view"? 
                        <input type="text"
                        disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.descripcion} />
                        :
                        action === "create"?
                        <input type="text"
                        name="descripcion"
                         className="text-black border-2 border-gray-300 p-2 rounded-md" onChange={handleChange}  />
                         
                        :
                        <input type="text"
                        name="descripcion"
                        className="text-black border-2 border-gray-300 p-2 rounded-md" value={dataMedSave?.descripcion}
                        onChange={handleChange} />}

                    </div>
                </div>
                <div className="flex justify-between w-full mt-2">
                    <div className={action === "view" ?"flex flex-col items-start justify-around w-[30%]}" : "flex items-center justify-around w-[30%]"}>
                        <label htmlFor="" className="">Venta Libre</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.ventaLibre ? "Sí" : "No"} /> 
                        : 
                        action === "create"?
                        <input name="ventaLibre" onChange={handleChange} type="checkbox"/> 
                        :
                        <input name="ventaLibre" onChange={handleChange} type="checkbox" checked ={dataMedSave?.ventaLibre || false}/> } 
                        
                    </div>
                    <div className={action === "view" ?"flex flex-col items-start justify-around w-[30%]}" : "flex items-center justify-around w-[30%]"}>
                        <label htmlFor="">Activo</label>
                        {action === "view" ?<input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={data?.activo ? "Sí" : "No"} /> 
                        : 
                        action === "create"?
                        <input name="activo" onChange={handleChange} type="checkbox"/> 
                        :
                        <input name="activo" onChange={handleChange} type="checkbox" checked = {dataMedSave?.activo || false}/>  } 
                        
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="">Precio</label>
                        {action === "view" ?
                         <input type="text" disabled className="text-black border-2 border-gray-300 p-2 rounded-md" value={`$${data?.precio}`}/> 
                        :
                        action === "create"?
                        <input type="text"  className="text-black border-2 border-gray-300 p-2 rounded-md" name="precio" onChange={handleChange} /> 
                        :
                        <input type="text" name="precio" onChange={handleChange} className="text-black border-2 border-gray-300 p-2 rounded-md" value={`${dataMedSave?.precio}`}/> 
                        }

                        
                    </div>
                </div>
                
                
                <div className="flex justify-center">
                    {action === "edit" ? 
                    <button className="bg-blue-500 hover:bg-blue-600  ease-in duration-75 rounded-md p-2 text-white w-1/2 " onClick={handleEditMed}>Editar</button>
                    :
                    action === "create" ? 
                    <button className="bg-blue-500 hover:bg-blue-600  ease-in duration-75 rounded-md p-2 text-white w-1/2 " onClick={handleSaveMed}>Guardar</button>
                    :
                    <></>
                    }
                    
                </div>
            </div>


        </div>

    </>
} 

export default MedicamentoCard