import { useNavigate, useParams } from "react-router-dom"
import { getRecipesByUsername } from "../api/RecipesApi";
import { useQuery } from "@tanstack/react-query";
import type { PublicRecipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import NotFoundView from "./NotFoundView";


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
        return <NotFoundView/>
    }

    if (isLoading) return (
        <ArrowPathIcon 
            height={40} 
            width={40}  
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
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
