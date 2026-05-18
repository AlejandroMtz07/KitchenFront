import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import type { RegisterRecipe } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { getRecipes } from "../api/RecipesApi";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";


export default function NewRecipeView() {

    const initialValues: RegisterRecipe = {
        name: '',
        description: '',
        is_private: true,
        ingredients: '',
        file: []
    }

    const { data, isLoading, isError } = useQuery({
        queryFn: getRecipes,
        queryKey: ['recipes'],
        retry: 1
    });


    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    const navigate = useNavigate();

    const handleReturn = () =>{
        navigate(-1);
    }

    const recipeSubmit = async (formData: RegisterRecipe) => {
        let dataFormated = new FormData();

        dataFormated.append('file', formData.file[0])
        dataFormated.append('name', formData.name)
        dataFormated.append('description', formData.description)
        dataFormated.append('is_private', String(formData.is_private===false ? '0':'1'))
        dataFormated.append('ingredients', formData.ingredients)

        try {
            const token = localStorage.getItem('token');
            const {data} = await api.post(
                '/recipes/add',
                dataFormated,
                {headers: {Authorization: `Bearer ${token}`}}
            )
            toast.success(data && 'Recipe added successfully');
            navigate('/recipes/book');
        } catch (error) {
            if(isAxiosError(error) && error.response){
                toast.error(error.response.data.error);
            }
        }
    }
    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen animate-spin">
            <ArrowPathIcon height={40} width={40} />
        </div>
    )


    return (
        data && <div>
            <div className="flex items-center p-5">
                <ArrowLeftIcon width={30} className="justify-self-start lg:ml-20 ml-5 cursor-pointer" onClick={handleReturn}/>
            </div>
                <h1 className="text-center p-5 text-2xl uppercase font-extralight">
                    Add another recipe
                </h1>
            <div className="border-gray-300 border-2 lg:m-20 m-10">
                <form className="text-center" onSubmit={handleSubmit(recipeSubmit)}>
                    <div className="flex flex-col p-5 text-center">
                        <label htmlFor="recipe_name" className="mb-5 font-extralight uppercase text-sm">
                            Recipe name
                        </label>
                        <input
                            type="text"
                            id="recipe_name"
                            className="bg-gray-200 p-2 text-center"
                            {...register('name', { required: 'The recipe name is required' })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col p-5 text-center">
                        <label htmlFor="recipe_description" className="mb-5 font-extralight uppercase text-sm">
                            Recipe description
                        </label>
                        <input
                            type="text"
                            id="recipe_description"
                            className="bg-gray-200 p-2 text-center"
                            {...register('description', { required: 'The recipe name is required' })}
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col p-5 text-center">
                        <label htmlFor="recipe_description" className="mb-5 font-extralight uppercase text-sm">
                            Recipe status
                        </label>
                        <select
                            className=" bg-gray-200 p-3 text-center font-extralight uppercase text-xs"
                            {...register('is_private', { required: 'Status is required' })}
                        >
                            <option value="false">Public</option>
                            <option value="true">Private</option>
                        </select>
                        {errors.is_private && <ErrorMessage>{errors.is_private.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col p-5 text-center">
                        <label htmlFor="recipe_ingredients" className="mb-5 font-extralight uppercase text-sm">
                            Recipe ingredients
                        </label>
                        <input
                            type="text"
                            id="recipe_ingredients"
                            className="bg-gray-200 p-2 text-center"
                            {...register('ingredients', { required: 'The recipe name is required' })}
                        />
                        {errors.ingredients && <ErrorMessage>{errors.ingredients.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col p-5 text-center">
                        <label htmlFor="recipe_image" className="mb-5 font-extralight uppercase text-sm">
                            Recipe image
                        </label>
                        <input
                            type="file"
                            id="recipe_image"
                            className="bg-gray-200 p-2"
                            {...register('file', { required: 'The recipe image is required' })}
                        />
                        {errors.file && <ErrorMessage>{errors.file.message}</ErrorMessage>}
                    </div>
                    <div className="p-10">
                        <input
                            type="submit"
                            value="Add recipe"
                            className="uppercase font-extralight text-sm border-b-2 border-black p-1 cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
