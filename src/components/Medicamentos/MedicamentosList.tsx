import { Medicamento } from "../../interfaces/Medicamento";

interface Props{
    medicamentos: Medicamento[]
}

const MedicamentosList: React.FC<Props> = ({medicamentos}) =>{

    return <>
    <div className="max-h-[80vh] overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="w-full">
            <th className="text-start sticky top-0 bg-white w-1/5">Nombre</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Marca</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Activo</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Precio</th>
            <th className="text-center sticky top-0 bg-white w-1/5">Acciones</th>
          </tr>
        </thead>

        <tbody>
        {medicamentos.map((medicamento, index) => (
            <tr key={medicamento.idMedicamento} className={` hover:bg-gray-200 transition-colors duration-200 ease-in-out w-full`}>
              <td className="w-1/5">{medicamento.nombreMedicamento}</td>
              <td className="w-1/5">{medicamento.marca}</td>
              <td className="w-1/5">{medicamento.activo ? "Sí" : "No"}</td>
              <td className="w-1/5">${medicamento.precio}</td>
              <td className="w-1/5">
              <div className="w-full justify-around flex">
              <i className="fa-regular fa-eye"></i>
              <i className="fa-regular fa-pen-to-square"></i>
              <i className="fa-solid fa-trash"></i>
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

 
</>
}

export default MedicamentosList;