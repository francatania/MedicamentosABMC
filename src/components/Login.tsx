import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const LoginForm: React.FC = ()=>{
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async(event: React.FormEvent) =>{
        event.preventDefault();

        try {
            const token = await login({username, password});
            localStorage.setItem("token", token);
            navigate("/medicamentos")
        } catch (error: any) {
            setError(error.message);
        }


    }

    return <>
    <div className=" w-screen h-screen flex items-center justify-center">
        <form action="" onSubmit={handleSubmit} className="border-2 border-black rounded-md h-1/3 w-[75%] sm:w-1/3  flex flex-col justify-around items-center">
            <div >
                <h2 className="text-2xl">Login</h2>
            </div>
            <div className="w-full flex justify-center"> 
                <input type="text" className="border-2 rounded-md p-2 w-1/2" placeholder="Usuario" value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="w-full flex justify-center">
                <input type="password" className="border-2 rounded-md p-2 w-1/2" placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="w-full flex justify-center">
                <input type="submit" className="hover:cursor-pointer border-2 bg-blue-500 text-white h-12 w-1/2 rounded-md" value="Iniciar sesión" />
            </div>
        </form>
    </div>

    </>
}

export default LoginForm;