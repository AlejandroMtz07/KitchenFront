import { useState } from "react";
import { useForm } from 'react-hook-form'
import type { LoginData } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function LoginView() {

    const [isVisible, setIsVisible] = useState(false);

    //Setting the initial values
    const initalVlaues: LoginData = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initalVlaues });

    const navigate = useNavigate();

    const handleLogin = async (formData: LoginData) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8080/api/auth/login',
                formData,
            )
            toast.success(data.msg);
            localStorage.setItem('token', data.token);
            navigate('/');
            reset();
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            }
        }
    }

    return (
        <div
            className="bg-white mt-20 lg:mt-10 p-10 text-center
             hover:shadow-2xl transition rounded-lg -m-10 md:m-2 lg:m-60 "
        >
            <h1 className="font-extralight text-2xl uppercase mb-10 tracking-widest">
                Login
            </h1>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col space-y-10">
                <div className="flex flex-col">
                    <label htmlFor="email" className="p-4 font-extralight text-sm">
                        EMAIL
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="bg-gray-100 hover:border-b-2 border-gray-400
                         focus:bg-gray-200 text-center p-2 transition"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="p-4 font-extralight text-sm">
                        PASSWORD
                    </label>
                    <input
                        type={isVisible ? 'text' : 'password'}
                        className="bg-gray-100 hover:border-b-2 border-gray-400 
                         focus:bg-gray-200 text-center p-2 transition"
                        {...register("password", {
                            required: "Password id required",
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    <button type="button"
                        className="text-xs text-left font-extralight uppercase mt-2"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? 'Hide password' : 'Show password'}
                    </button>
                </div>
                <input
                    type="submit"
                    className="col-span-2 bg-gray-100 border-b-gray-400 
                            border-b-2 p-2 ml-10 mr-10 font-extralight 
                            text-sm rounded-md hover:bg-gray-300 transition"
                    value={'SEND'}
                />
            </form>
            <div className="mt-10 uppercase text-xs font-extralight">
                Dont have an account yet?{" "}
                <Link 
                    to={'/auth/register'} 
                    className="text-blue-800 font-bold"
                >
                    Register
                </Link>
            </div>
        </div>
    )
}
