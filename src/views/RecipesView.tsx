import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/RecipesApi";
import { Link, Navigate } from "react-router-dom";
import {ArrowPathIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/outline';
import { useMemo, useState } from "react";

export default function RecipesView() {
    const { data, isLoading, isError } = useQuery({
        queryFn: getRecipes,
        queryKey: ['recipes'],
        retry: 1
    });

    const [searchTerm, setSearchTerm] = useState('');
    const handleInputsearch = useMemo(()=>{
        return data?.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        )
    },[data,searchTerm]);

    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen animate-spin">
            <ArrowPathIcon height={40} width={40}/>
        </div>
    )

    return (
        data &&
        <>
            <h1 className="text-center p-5 font-extralight text-2xl uppercase">
                !Your amazing recipe book¡
            </h1>
                <div className="flex lg:flex-row flex-col lg:m-10 lg:ml-20 items-center">
                    <label htmlFor="searchTerm" className="flex flex-row">
                        <MagnifyingGlassIcon width={20}/>
                        <input 
                            type="text" id="searchTerm" 
                            placeholder="Search by recipe name, author or ingredients" 
                            className="ml-5 lg:w-96 text-xs w-40 bg-transparent bg-gray-200 p-4 rounded"
                            value={searchTerm}
                            onChange={(e)=>setSearchTerm(e.target.value)}
                        />
                        <XMarkIcon width={20} className="ml-5 cursor-pointer" onClick={()=>setSearchTerm('')}/>
                    </label>
                    <div className="flex flex-row p-2 gap-10 border-b-black border-b-2  lg:ml-10 uppercase text-xs">
                        <Link to={'/recipes/new'}>New recipe</Link>
                    </div>
                </div>
            <div className="lg:grid lg:grid-cols-2 lg:p-20 p-10 lg:gap-10 gap-5
                flex flex-col text-center"
            >
                {handleInputsearch && handleInputsearch.map(recipe => (
                    <div
                        className="bg-white border-2 border-gray-300 
                        rounded grid grid-cols-2 items-center p-10 hover:shadow-lg transition"
                        key={recipe.id}
                    >
                        <div className="text-xs lg:text-sm grid grid-cols-1 lg:p-10 p-5">
                            <p><span className="font-bold">Name:</span> {recipe.name}</p>
                            <p><span className="font-bold">Description:</span> {recipe.description}</p>
                            <p><span className="font-bold">Igredients:</span> {recipe.ingredients}</p>
                            <p><span className="font-bold">Author:</span> {recipe.user_name}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={recipe.image} alt="Recipe image" className="rounded-xl" width='70%'/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
