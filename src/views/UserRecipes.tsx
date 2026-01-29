import { useNavigate, useParams } from "react-router-dom"
import { getRecipesByUsername } from "../api/RecipesApi";
import { useQuery } from "@tanstack/react-query";
import type { PublicRecipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";


export default function UserRecipes() {

    const { username } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery<PublicRecipe[]>({
        queryFn: () => getRecipesByUsername(username!),
        queryKey: ['userRecipes', username]
    });

    const handleReturn = () => {
        navigate(-1);
    }

    if (isError) {
        return //Return 404 not found
    }

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen animate-spin">
            <ArrowPathIcon height={40} width={40} />
        </div>
    )

    return (
        <div>
            <h1 className="p-5 mt-5 text-center uppercase font-extralight text-2xl flex flex-row gap-10 ml-5">
                <ArrowLeftIcon onClick={handleReturn} width={30} className="cursor-pointer"/>
                {username}'s recipes
            </h1>
            {data?.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
        </div>
    )
}
