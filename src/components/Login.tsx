import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useToast } from "../context/ToastContext";
import { ClipLoader } from "react-spinners";

const LoginForm: React.FC = ()=>{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const {setSuccess, setErrorL} = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async(event: React.FormEvent) =>{
        event.preventDefault();
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const token = await login({username, password});
            localStorage.setItem("token", token);
            setSuccess();
            navigate("/medicamentos")
        } catch (error: any) {
            setError(error.message);
            setErrorL();
        }
        finally{
            setIsLoading(false);
        }


    }

    return <>
<div className="w-screen h-screen flex items-center justify-center">
    <form 
        onSubmit={handleSubmit} 
        className="border-2 shadow-lg border-black rounded-md h-1/2 w-2/3 sm:h-1/2 md:h-1/3 lg:h-2/6 sm:w-2/3 md:w-1/3 lg:w-1/4 flex flex-col justify-around items-center"
    >
        <div>
            <h2 className="text-2xl 2xl:text-4xl">Login</h2>
        </div>
        <div className="w-full flex justify-center">
            <input 
                type="text" 
                className="border-2 rounded-md p-2 w-2/3" 
                placeholder="Usuario" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            />
        </div>
        <div className="w-full flex justify-center">
            <input 
                type="password" 
                className="border-2 rounded-md p-2 w-2/3" 
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
        </div>
        <div className="w-full flex justify-center">
            {isLoading ?
                <ClipLoader color="#3b82f6" />
            :
            <input 
            type="submit" 
            className="hover:cursor-pointer border-2 bg-blue-500 text-white h-12 w-1/2 rounded-md" 
            value="Iniciar sesión" 
        />}

            
        </div>
    </form>
</div>


    </>
}

export default LoginForm;