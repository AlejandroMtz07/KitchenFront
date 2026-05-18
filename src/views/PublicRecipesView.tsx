import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard"
import type { BackendRecipes, PreviewRecipe, PublicRecipe } from "../types"
import api from "../config/axios";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


export default function PublicRecipesView() {

    type PreviewRecipes = {
        recipes: PreviewRecipe[]
    }

    //State for the input to search recipes
    const [search, setSearch] = useState('');
    const debounced = useDebounce(search, 400);

    const { data, isError } = useQuery<PreviewRecipes>({
        queryKey: ['previewRecipes', debounced],
        queryFn: () => searchRecipes(debounced),
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: debounced.length > 1
    })

    const searchRecipes = async (name: string) => {
        const { data } = await api.get(
            `/recipes/find/${name}`
        )
        return data
    }


    //Getting 5 random public recipes from the backend
    const [publicRecipes, setPublicRecipes] = useState<PublicRecipe[]>([]);
    const getRecipes = async () => {
        const { data } = await api.get<BackendRecipes>(
            '/recipes/all',
        )
        setPublicRecipes(data.recipes);
    }

    //Getting on render 5 public recipes
    useEffect(() => {
        getRecipes();
    }, []);


    return (
        <div>
            <div className="flex flex-col lg:ml-20">
                <label className="flex flex-row p-5 gap-3">
                    <MagnifyingGlassIcon width={20}/>
                    <input
                        type="text"
                        placeholder="Search recipes by name..."
                        className="border-b-2 border-b-gray-300 p-2 focus:bg-gray-100 w-52"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <XMarkIcon width={20} onClick={()=>setSearch('')} className="cursor-pointer"/>
                </label>
                    {isError && 
                        <p className="bg-gray-200 w-52 ml-12 p-2 rounded text-center">
                            Any recipe found
                        </p>
                    }
                    {data && data?.recipes.map(recipe => (
                        <div 
                            className="w-52 text-center bg-gray-200 rounded p-2 flex flex-row ml-12 font-extralight"
                            key={recipe.user_name.concat(recipe.name)}
                        >
                            <Link
                                to={'/' + recipe.user_name}
                            >
                                {recipe.name} <span className="font-normal">Author:</span> {recipe.user_name}
                            </Link>
                        </div>
                    ))}
            </div>
            {/* List of public recipes */}
            <div className="lg:m-20 m-5 lg:grid grid-cols-3 gap-5">
                {publicRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

        </div>
    )
}
