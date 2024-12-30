import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { Medicamento } from "../interfaces/Medicamento";
import { MedicamentoSave } from "../interfaces/MedicamentoSave";

const MedicamentoContext = createContext<any>(null);

interface MedicamentoProviderProps {
    children: ReactNode;
  }

export const MedicamentoProvider: React.FC<MedicamentoProviderProps> = ({children}) =>{
    const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null);
    const [selectedMedicamentoSave, setSelectedMedicamentoSave] = useState<MedicamentoSave | null>(null);

    const selectMedicamento = (medicamento:Medicamento) =>{
        setSelectedMedicamento(medicamento);
    }

    const selectMedicamentoSave = (medicamentoSave: MedicamentoSave) =>{
        setSelectedMedicamentoSave(medicamentoSave);
    }

    return (
        <MedicamentoContext.Provider value = {{selectMedicamento, selectedMedicamento, selectMedicamentoSave, selectedMedicamentoSave}}>
            {children}
        </MedicamentoContext.Provider>
    )
}

export const useMedicamento = () => useContext(MedicamentoContext);
