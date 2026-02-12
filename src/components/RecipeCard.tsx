import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../config/axios"
import type { PublicRecipe } from "../types"
import { toast } from "sonner"
import { GlobeAltIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline"

type RecipeCardProps = {
    recipe: PublicRecipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {

    const navigate = useNavigate();

    const location = useLocation();

    const handleAddRecipe = async (recipe: PublicRecipe) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post(
                `/recipes/${recipe.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log(response)
        } catch (error) {
            toast.error('Login for add this recipe');
            setTimeout(() => {
                navigate('/auth/login');
            }, 1000)
        }
    }

    return (
        <>
            <div className="rounded-3xl lg:rounded-none bg-white-200 border-2 
                border-b-gray-300 shadow-sm shadow-gray-300 align-middle 
                flex flex-row items-center justify-between mt-10 lg:mt-0 lg:p-20">
                <div className="text-center lg:p-10 p-5 lg:text-lg text-sm">
                    <p
                        className="font-extralight flex flex-row justify-center gap-2">
                        {recipe.name}
                        {recipe.is_private ? 
                            (recipe.is_private === '0' ? <GlobeAltIcon width={20} title="Public" /> : <LockClosedIcon width={20} title="Private" />) : 
                            <GlobeAltIcon width={20} title="Public" />}
                    </p>
                    <p className="font-extralight">{recipe.description}</p>
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
                </div>
                <img src={recipe.image} alt={recipe.description} className="lg:w-40 w-32 rounded-3xl" />
            </div>
        </>
    )
}
