import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { Medicamento } from "../interfaces/Medicamento";

const MedicamentoContext = createContext<any>(null);

interface MedicamentoProviderProps {
    children: ReactNode;
  }

export const MedicamentoProvider: React.FC<MedicamentoProviderProps> = ({children}) =>{
    const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null);

    const selectMedicamento = (medicamento:Medicamento) =>{
        setSelectedMedicamento(medicamento);
    }

    return (
        <MedicamentoContext.Provider value = {{selectMedicamento, selectedMedicamento}}>
            {children}
        </MedicamentoContext.Provider>
    )
}

export const useMedicamento = () => useContext(MedicamentoContext);
