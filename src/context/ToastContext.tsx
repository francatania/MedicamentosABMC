import { error } from "console";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

interface ToastContextProps {
    setEdited: () => void,
    setCreated: () => void,
    setErrorL: () => void,
    setSuccess: () => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [hasEdited, setHasEdited] = useState<boolean>(false);
    const [hasCreated, setHasCreated] = useState<boolean>(false);
    const [succesLogin, setSuccesLogin] = useState<boolean>(false);
    const [errorLogin, setErrorLogin] = useState<boolean>(false);

    const setSuccess = ():void =>{
        setSuccesLogin(true);
    }

    const setErrorL = ():void =>{
        setErrorLogin(true);
    }

    const setEdited = (): void =>{
        setHasEdited(true);
    }   

    const setCreated = (): void =>{
        setHasCreated(true);
    } 

    useEffect(()=>{
        if(hasEdited){
            toast.success("Medicamento editado.")
            setHasEdited(false);
        }
    }, [hasEdited])

    
    useEffect(()=>{
        if(hasCreated){
            toast.success("Medicamento creado.")
            setHasCreated(false);
        }
    }, [hasCreated])

    useEffect(()=>{
        if(succesLogin){
            toast.success("Bienvenido!")
            setSuccesLogin(false);
        }
    }, [succesLogin])

    useEffect(()=>{
        if(errorLogin){
            toast.error("Usuario y/o contraseña incorrecto.")
            setErrorLogin(false);
        }
    }, [errorLogin])


    return (
        <ToastContext.Provider value={{ setEdited, setCreated, setErrorL, setSuccess }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("Verificar si esta dentro del ToastProvider");
    }
    return context;}