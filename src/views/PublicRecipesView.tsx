import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard"
import type { BackendRecipes, PreviewRecipe, PublicRecipe } from "../types"
import api from "../config/axios";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import LoadingModal from "../components/LoadingModal";
import NotFoundView from "./NotFoundView";
import { toast } from "sonner";


export default function PublicRecipesView() {

    type PreviewRecipes = {
        recipes: PreviewRecipe[]
    }

    //State for the input to search recipes
    const [search, setSearch] = useState('');
    const debounced = useDebounce(search, 400);

    const { data, isLoading } = useQuery<PreviewRecipes>({
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
    const [recipesState, setRecipesState] = useState({
        status: 'pending',
    })

    const getRecipes = async () => {
        setRecipesState({ status: 'pending' })
        try {
            const { data } = await api.get<BackendRecipes>(
                '/recipes/all',
            )
            setPublicRecipes(data.recipes);
            setRecipesState({ status: 'success' })
        } catch (error) {
            setRecipesState({ status: 'error' })
        }
    }

    //Getting on render 5 public recipes
    useEffect(() => {
        getRecipes();
    }, []);


    if (recipesState.status == 'pending') {
        return <LoadingModal isLoading={true} message="Fetching recipes..." />
    }

    if (recipesState.status == 'error') {
        return <NotFoundView message="Recipes not found" />
    }

    return (
        <div>
            <div className="flex flex-col lg:ml-20">
                <label className="flex flex-row p-5 gap-3">
                    <MagnifyingGlassIcon width={20} />
                    <input
                        type="text"
                        placeholder="Search recipes by name..."
                        className="border-b-2 border-b-gray-300 p-2 focus:bg-gray-100 w-52"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <XMarkIcon width={20} onClick={() => setSearch('')} className="cursor-pointer" />
                </label>
                {/* Showing loading message while searching the recipe by name */}
                {isLoading &&
                    <div className="w-52 text-center bg-gray-200 rounded p-2 flex flex-row ml-12 font-extralight">
                        Searching recipe...
                    </div>
                }
                {/* Displaying the recipe list that match with the search input*/}
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
