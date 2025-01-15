import { Medicamento } from "../../interfaces/Medicamento";
import { useMedicamento } from "../../context/MedicamentoContext";
import { useNavigate } from "react-router-dom";
import { deleteMed, getMedById, getMedByIdSaveDto } from "../../api/medicamentos";
import Swal from 'sweetalert2';

interface Props{
    medicamentos: Medicamento[],
    onDeleteMed: ()=>void
}


const MedicamentosList: React.FC<Props> = ({medicamentos, onDeleteMed}) =>{
  const {selectMedicamento, selectMedicamentoSave} = useMedicamento();
  const navigate = useNavigate();

  const handleViewMed = async(id:number):Promise<void>  =>{
    try {
      const medicamento= await getMedById(id);
      selectMedicamento(medicamento);
      navigate("/medicamentos/view");
    } catch (error) {
      console.error(error)
    }

  }

  const handleEditMed = async(id:number):Promise<void>  =>{
    try {
      const medicamento= await getMedByIdSaveDto(id);
      selectMedicamentoSave(medicamento);
      navigate("/medicamentos/edit");
    } catch (error) {
      console.error(error)
    }

  }

  const handleDelete = async(id:number):Promise<void> =>{
    Swal.fire({
      title:`¿Desactivar el medicamento?`,
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',

    }).then((result)=>{
      if(result.isConfirmed){
         deleteMed(id)
         .then(()=>{
          Swal.fire("Medicamento desactivado!")
          onDeleteMed();
        }).catch((error)=>{
          Swal.fire(`Hubo un error al desactivar: ${error}`)
        })
      }

      })
  }



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
        {medicamentos.map((medicamento) => (
            <tr key={medicamento.idMedicamento} className={` hover:bg-gray-200 transition-colors duration-200 ease-in-out w-full`}>
              <td className="w-1/5">{medicamento.nombreMedicamento}</td>
              <td className="w-1/5">{medicamento.marca}</td>
              <td className="w-1/5">{medicamento.activo ? "Sí" : "No"}</td>
              <td className="w-1/5">${medicamento.precio}</td>
              <td className="w-1/5">
              <div className="w-full justify-around flex">
                <i className="fa-regular fa-eye hover:cursor-pointer" onClick={() => handleViewMed(medicamento.idMedicamento)}></i>
                <i className="fa-regular fa-pen-to-square hover:cursor-pointer" onClick={()=>handleEditMed(medicamento.idMedicamento)}></i>
                <i className="fa-solid fa-trash hover:cursor-pointer" onClick={()=> handleDelete(medicamento.idMedicamento)}></i>
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