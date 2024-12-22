export interface Medicamento{
    idMedicamento: number;
    nombreMedicamento: string;
    laboratorio:  string;
    monodroga : string;
    presentacion: string;
    marca: string; 
    descripcion: string;
    ventaLibre: boolean;
    precio: number;
    activo: boolean | null;
}

