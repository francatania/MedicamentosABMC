import { Medicamento } from "../../interfaces/Medicamento";

interface Props{
    medicamentos: Medicamento[]
}

const MedicamentosList: React.FC<Props> = ({medicamentos}) =>{
  console.log(medicamentos)
    return <>
    <div className="max-h-[80vh] overflow-auto">
      <table>
        <thead>
          <tr>
            <th className="text-start sticky top-0 bg-white w-1/5">Nombre</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Marca</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Activo</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Precio</th>
            <th className="text-start sticky top-0 bg-white w-1/5">Acciones</th>
          </tr>
        </thead>

        <tbody>
        {medicamentos.map((medicamento, index) => (
            <tr key={medicamento.idMedicamento} className={`${index % 2 === 0 ? "bg-blue-300" : "bg-white"} hover:bg-blue-400`}>
              <td>{medicamento.nombreMedicamento}</td>
              <td>{medicamento.marca}</td>
              <td>{medicamento.activo ? "Sí" : "No"}</td>
              <td>${medicamento.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

 
</>
}

export default MedicamentosList;