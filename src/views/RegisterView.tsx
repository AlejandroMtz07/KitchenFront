import { useForm } from "react-hook-form"
import type { RegisterData } from "../types"
import ErrorMessage from "../components/ErrorMessage";
import axios, { isAxiosError } from "axios";


export default function RegisterView() {
    const initialValues : RegisterData= {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    }

    const {register, handleSubmit, reset,setError, formState: {errors}} = useForm({
        defaultValues: initialValues
    });

    const handleRegister = async (registerData: RegisterData) =>{
        if(registerData.name.trim().length === 0){
            setError('name',{message: 'Name is required'});
        }
        if(registerData.lastname.trim().length === 0){
            setError('lastname',{message: 'Lastname is required'});
        }
        if(registerData.username.trim().length === 0){
            setError('username',{message: 'Username is required'});
        }
        if(registerData.email.trim().length === 0){
            setError('email',{message: 'Email is required'});
        }
        if(registerData.password.trim().length === 0){
            setError('password',{message: 'Password is required'});
        }
        try {
            const {data} = await axios.post(
                'http://localhost:8080/api/auth/register',
                registerData
            )
            console.log(data);
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error);
            }
        }

    }

    return (
        <>
            <div
                className="bg-white mt-20 p-10 text-center border-2 
          border-gray-200 hover:shadow-lg transition rounded-lg -m-10"
            >
                <h1 className="font-extralight text-2xl uppercase mb-10 tracking-wide">
                    Register form
                </h1>
                <form 
                    onSubmit={handleSubmit(handleRegister)}
                    className="lg:grid grid-cols-2 p-5 gap-4 flex flex-col"
                >
                    <div className="flex flex-col">
                        <label htmlFor="name" className="p-4 font-extralight text-sm">
                            NAME
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            className="bg-gray-100 hover:border-b-2 border-gray-400
                                focus:bg-gray-200 text-center p-2 transition"
                            {...register('name',{required: 'Name is required'})}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastname" className="p-4 font-extralight text-sm">
                            LASTNAME
                        </label>
                        <input 
                            type="text" 
                            id="lastname" 
                            className="bg-gray-100 hover:border-b-2 border-gray-400
                            focus:bg-gray-200 text-center p-2 transition"
                            {...register('lastname',{required: 'Lastname is required'})}
                        />
                        {errors.lastname && <ErrorMessage>{errors.lastname.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="p-4 font-extralight text-sm">
                            USERNAME
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            className="bg-gray-100 hover:border-b-2 border-gray-400
                            focus:bg-gray-200 text-center p-2 transition"
                            {...register('username',{required: 'Username is required'})}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="p-4 font-extralight text-sm">
                            EMAIL
                        </label>
                        <input 
                            type="text" 
                            id="email" 
                            className="bg-gray-100 hover:border-b-2 border-gray-400
                            focus:bg-gray-200 text-center p-2 transition"
                            {...register('email',{
                                required: 'Email is required',pattern: {value: /\S+@\S+\.\S+/,
                                message: "Invalid email",},})}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="passsword" className="p-4 font-extralight text-sm">
                            PASSWRORD
                        </label>
                        <input 
                            type="text" 
                            id="password" 
                            className="bg-gray-100 hover:border-b-2 border-gray-400
                            focus:bg-gray-200 text-center p-2 transition"
                            {...register('password',{required: 'Password is required'})}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
                    <input 
                        type="submit" 
                        value="Register" 
                        className="col-span-2 bg-gray-300 p-2 ml-10 mr-10 font-extralight 
                            text-sm rounded-md hover:bg-gray-400 transition"
                    />
                </form>
            </div>
        </>
    )
}
