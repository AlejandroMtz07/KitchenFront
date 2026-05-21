import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../config/axios"
import type { PublicRecipe } from "../types"
import { toast } from "sonner"
import { GlobeAltIcon, LockClosedIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ErrorMessage from "./ErrorMessage"
import { isAxiosError } from "axios"

type RecipeCardProps = {
    recipe: PublicRecipe
}

type EditRecipe = {
    name: string,
    description: string,
    is_private: string
}

export default function RecipeCard({ recipe }: RecipeCardProps) {

    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username');

    // Method for adding public recipes from the public recipe book.
    const handleAddRecipe = async (recipe: PublicRecipe) => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await api.post(
                `/recipes/${recipe.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            toast.success(data.msg);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status == 409) {
                    toast.error(error.response.data.error)
                }
                if (error.response.status == 401 || error.response.status == 500) {
                    toast.error('Login for add this recipe');
                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 1000)
                }
            }
        }
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(0);
    const { handleSubmit, reset, register, formState: { errors } } = useForm<EditRecipe>();

    // Method for the update of the user recipes.
    const handleEdit = async (updatedRecipe: EditRecipe) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await api.put(
                `/recipes/${editingId}`,
                updatedRecipe,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(data.msg);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data)
            }
        }

    }

    return (
        <>
            {/* Recipe container */}
            <div className="bg-white-200 border-2 
                border-b-gray-300 shadow-sm shadow-gray-300 align-middle 
                flex flex-col items-center justify-between lg:mb-10 mb-5">
                {/* Recipe image */}
                <img src={recipe.image} alt={recipe.description} className="lg:w-96 md:w-1/2 w-full h-80 lg:mt-0" />
                <div className="text-center lg:p-5 p-2 lg:text-lg text-sm">
                    {
                        !isEditing ?
                            <>
                                <p
                                    className="font-extralight flex flex-row justify-center gap-2">
                                    {recipe.name}
                                    {recipe.is_private ?
                                        (recipe.is_private === '0' ?
                                            <GlobeAltIcon width={20} title="Public" /> :
                                            <LockClosedIcon width={20} title="Private" />) :
                                        <GlobeAltIcon width={20} title="Public" />}
                                </p>
                                <p className="font-extralight">{recipe.description}</p>
                                <p className="font-extralight">{recipe.ingredients}</p>
                                {recipe.user_username && <p>
                                    Author:
                                    <Link
                                        to={`/${recipe.user_username}`}
                                        className="font-extralight border-b-2 border-black"
                                    >
                                        {' '}{recipe.user_username}
                                    </Link>
                                    <br />
                                </p>}
                                {location.pathname !== '/recipes/book' && <button
                                    className="lg:mt-10 mt-2 text-xs p-2 uppercase lg:border-b-2 border-black "
                                    onClick={() => handleAddRecipe(recipe)}
                                >
                                    Add recipe
                                </button>}
                            </> :
                            <>
                                {/* Form display when the user clicks the edit button */}
                                <form className="flex flex-col items-center *:m-1" onSubmit={handleSubmit(handleEdit)}>
                                    <label className="font-extralight" htmlFor="name">Recipe name</label>
                                    <input
                                        type="text"
                                        placeholder={recipe.name}
                                        autoComplete="off"
                                        id="name"
                                        className="font-extralight bg-gray-100 w-full p-1"
                                        {...register('name', { required: 'Name cannot be empty' })}
                                    />
                                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                                    <label className="font-extralight" htmlFor="description">Recipe description</label>
                                    <input
                                        type="text"
                                        id="description"
                                        autoComplete="off"
                                        placeholder={recipe.description}
                                        className="font-extralight bg-gray-100 w-full p-1"
                                        {...register('description', { required: 'Description cannot be empty' })}
                                    />
                                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                                    <select
                                        className="bg-gray-100 w-full text-center font-extralight"
                                        {...register('is_private')}
                                    >
                                        <option value="0">Public</option>
                                        <option value="1">Private</option>
                                    </select>
                                    <input
                                        type="submit"
                                        value="Save"
                                        className="font-extralight border-b-2 
                                        border-b-black w-20 mt-2 cursor-pointer"
                                    />
                                </form>
                            </>
                    }
                </div>
                <div className="mb-5">
                    {/* Checking if the user is the owner and the location is the private recipes book */}
                    {username === recipe.user_username && location.pathname != '/recipes' ?
                        (!isEditing ?
                            // Edit and delete container
                            <div className="flex flex-row gap-2">
                                <button
                                    className="bg-blue-300 lg:p-3 p-2 mt-2 rounded-full gap-2"
                                    onClick={() => { setIsEditing(!isEditing); setEditingId(recipe.id) }}
                                >
                                    <PencilIcon width={15} />
                                </button>
                                <button
                                    className="bg-red-300 lg:p-3 p-2 mt-2 rounded-full"
                                >
                                    <TrashIcon width={15} />
                                </button>
                            </div>
                            :
                            // Cancel edit button
                            <button
                                className="bg-red-300 lg:p-3 p-2 mt-2 rounded-full gap-2"
                                onClick={() => { setIsEditing(!isEditing); reset(); setEditingId(0) }}
                            >
                                <XMarkIcon width={15} />
                            </button>
                        ) : ''}
                </div>
            </div>
        </>
    )
}
