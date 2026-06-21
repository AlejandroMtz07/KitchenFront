import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/RecipesApi";
import { Link, Navigate } from "react-router-dom";
import { ArrowDownTrayIcon, FaceFrownIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../components/PDF";
import LoadingModal from "../components/LoadingModal";

export default function RecipesView() {
    const { data, isLoading, isError } = useQuery({
        queryFn: getRecipes,
        queryKey: ['recipes'],
        retry: 1
    });

    const [searchTerm, setSearchTerm] = useState('');
    const handleInputsearch = useMemo(() => {
        return data?.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [data, searchTerm]);

    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    if (isLoading) return (
        <LoadingModal isLoading={isLoading} message="Fetching your saved recipes..."/>
    )

    return (
        data?.length! > 0 ?
            <div className="lg:mb-20 md:mb-25 md-40">
                {/* Recipes view title */}
                <h1 className="text-center p-5 mt-5 font-extralight text-2xl uppercase">
                    !Your amazing recipe book¡
                </h1>
                {/* Container for the search recipe input, add and download button */}
                <div className="flex lg:flex-row flex-col lg:m-10 lg:ml-20 items-center print:hidden">
                    {/* Search recipe input */}
                    <label htmlFor="searchTerm" className="flex flex-row mb-2">
                        <MagnifyingGlassIcon width={20} />
                        <input
                            type="text" id="searchTerm"
                            placeholder="Search by recipe name, author or ingredients"
                            className="ml-2 lg:w-96 text-xs w-56 bg-gray-200 lg:p-4 p-2 rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <XMarkIcon width={20} className=" m-2 cursor-pointer" onClick={() => setSearchTerm('')} />
                    </label>
                    <div className="flex flex-row gap-2">
                        {/* Add new recipe button */}
                        <div className="flex flex-row p-2 gap-2 border-b-black border-b-2 
                            lg:ml-10 text-xs print:hidden">
                            <PlusIcon width={20} />
                            <Link to={'/recipes/new'}>New recipe</Link>
                        </div>
                        {/* Download the recipe book button */}
                        <div className="flex flex-row p-2 gap-2 border-b-black border-b-2 
                            lg:ml-10 text-xs print:hidden">
                            <PDFDownloadLink document={<PDF recipes={data!}/>} fileName="RecipeBook.pdf">
                                {
                                    ({loading}) => loading ? 
                                    <button > Loading...</button> :
                                    <button className="flex gap-2">
                                        <ArrowDownTrayIcon width={20} />
                                        Download recipes
                                    </button>
                                }
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
                {/* List of filtered recipes or just all the recipes */}
                <div className="lg:m-20 m-5 lg:grid grid-cols-3 gap-5">
                    {handleInputsearch && handleInputsearch.map(recipe => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                </div>
            </div> :
            // Validator if there's any recipes saved
            <div className="flex flex-col items-center justify-center p-10">
                <div className="flex items-center">
                    <h1 className="text-center font-extralight text-2xl p-5">
                        There's any recipes saved
                    </h1>
                    <FaceFrownIcon width={20} className="w-6 h-6" />
                </div>
                <p className="text-xs uppercase">
                    Check for more recipes
                    <Link to={'/recipes'} className="text-blue-700 font-bold"> here</Link>
                </p>
            </div>
    )
}
