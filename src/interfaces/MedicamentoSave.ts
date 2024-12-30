export interface MedicamentoSave{
    idMedicamento: number;
    nombreMedicamento: string;
    idLaboratorio:  number;
    idMonodroga : number;
    idPresentacion: number;
    idMarca: number; 
    descripcion: string;
    ventaLibre: boolean;
    precio: number;
    activo: boolean | null;
}

