import { Link, useNavigate } from "react-router-dom"
import api from "../config/axios"
import type { PublicRecipe } from "../types"
import { toast } from "sonner"

type RecipeCardProps = {
    recipe: PublicRecipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {

    const navigate = useNavigate();

    const handleAddRecipe = async (recipe: PublicRecipe)=>{
        const token = localStorage.getItem('token');
        try {
            const response = await api.post(
                `/recipes/${recipe.id}`,
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            )
            console.log(response)
        } catch (error) {
            toast.error('Login for add this recipe');
            setTimeout(()=>{
                navigate('/auth/login');
            },1000)
        }
    }

    return (
        <>
            <div className=" m-10 rounded-3xl bg-white-200 border-2 
            border-b-gray-300 shadow-sm shadow-gray-300 w-50 align-middle 
            flex flex-row items-center justify-between">
                <div className="text-center lg:ml-40 p-4 lg:text-lg text-sm">
                    <p className="font-extralight">{recipe.name}</p>
                    <p className="font-extralight">{recipe.description}</p>
                    {recipe.user_username &&<p>
                        Author:
                        <Link 
                            to={`/${recipe.user_username}`} 
                            className="font-extralight border-b-2 border-black"
                        >
                                {' '}{recipe.user_username}
                        </Link>
                        <br/>
                    </p>}
                    <button 
                        className="lg:mt-10 mt-2 text-xs p-2 uppercase lg:border-b-2 border-black "
                        onClick={()=>handleAddRecipe(recipe)}
                    >
                        Add recipe
                    </button>
                </div>
                <img src={recipe.image} alt={recipe.description} className="lg:max-w-lg max-w-40 rounded-3xl" />
            </div>
        </>
    )
}
