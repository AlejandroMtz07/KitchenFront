import { useNavigate, useParams } from "react-router-dom"
import { getRecipesByUsername } from "../api/RecipesApi";
import { useQuery } from "@tanstack/react-query";
import type { PublicRecipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import NotFoundView from "./NotFoundView";
import LoadingModal from "../components/LoadingModal";


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
        return <NotFoundView message="User not found"/>
    }

    if (isLoading){
        return <LoadingModal isLoading={isLoading} message={`Fetching ${username}'s recipes...`}/>
    }

    return (
        <div>
            <h1 className="p-5 mt-5 text-center uppercase font-extralight text-2xl flex flex-row gap-10 ml-5">
                <ArrowLeftIcon onClick={handleReturn} width={30} className="cursor-pointer"/>
                {username}'s recipes
            </h1>
            <div className="lg:m-20 m-5 lg:grid grid-cols-3 gap-5">
                {data?.map(recipe => (
                    <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
            </div>
        </div>
    )
}
