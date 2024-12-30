import { getMarcas } from "../../api/medicamentos"
import { Marca } from "../../interfaces/Marca"
import { act, useEffect, useState } from "react"

interface Filters{
    onSearchFunction: (filters:{NombreComercial?: string, IdMarca?: number, Activo?: boolean}) => void
}

const MedicamentosFilter: React.FC<Filters> = ({onSearchFunction}) =>{
    const [marcas, setMarcas] = useState<Marca[]>([])
    const [selectedMarca, setSelectedMarca] = useState<number | undefined>();
    const [nombre, setNombre] = useState<string | undefined>();
    const [activo, setActivo] = useState<boolean>(false);

    useEffect(()=>{
        const fetchMarcas = async () =>{
            try {
                const data = await getMarcas();
                setMarcas(data);
            } catch (error: any) {
                console.log(error.message);
            }

        }

        fetchMarcas();
        
    }, [])

    return (
<div className="w-full pt-4 rounded-md h-[10vh] ">
  <div className="flex flex-col md:flex-row items-center gap-4">

    <div className="flex flex-col w-full md:w-1/4">

      <input
        id="nombre"
        type="text"
        placeholder="Nombre medicamento"
        onChange={(e) => setNombre(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg"
      />
    </div>

    <div className="flex flex-col w-full md:w-1/4">

      <select
        id="marca"
        onChange={(e) => setSelectedMarca(Number(e.target.value))}
        className="px-3 py-2 border border-gray-300 rounded-lg"
      >
        <option value="">Selecciona la marca</option>
        {marcas.map((marca) => (
          <option value={marca.idMarca} key={marca.idMarca}>
            {marca.nombreMarca}
          </option>
        ))}
      </select>
    </div>

    <div className="flex items-end justify-start  w-full md:w-1/4">
      <input
        id="activo"
        type="checkbox"

        onChange={(e) => setActivo(e.target.checked ? true : false)}
        className="h-5 w-5 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="activo" className="ml-2 text-sm font-medium text-gray-700">
        Activo
      </label>
    </div>

    <div className="flex items-end justify-start  w-full md:w-1/4">
        <input type="submit" 
        value="Buscar" 
        onClick={() => onSearchFunction({
            NombreComercial: nombre || undefined,
            IdMarca: selectedMarca || undefined,
            Activo: activo

        })}
        className="bg-blue-500 text-white p-2 rounded-md w-1/2 hover:cursor-pointer"/>
    </div>

    <div className="flex items-end justify-end  w-full md:w-1/4">
        <input type="submit" 
        value="Agregar" 
        className="bg-green-500 text-white p-2 rounded-md w-1/2 hover:cursor-pointer"/>
    </div>
  </div>
</div>

    )
}

export default MedicamentosFilter;