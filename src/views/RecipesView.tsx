import { useEffect, useState } from "react"
import api from "../config/axios";
import { isAxiosError } from "axios";
import type { BackendRecipes, PublicRecipe } from "../types";

export default function RecipesView() {

    const [userRecipes, setUserRecipes] = useState<PublicRecipe[]>([]);

    const getRecipes = async ()=>{
        const token = localStorage.getItem('token');
        try {
            const {data} = await api.get<BackendRecipes>(
                '/recipes',
                {headers: {Authorization: `Bearer ${token}`}}
            )
            setUserRecipes(data.recipes);
        } catch (error) {
            if(isAxiosError(error) && error.message){
                console.log(error.message);
            }
        }
    }
    useEffect(()=>{
       getRecipes();
    },[])

    return (
        <div>
            {userRecipes.map(recipe =>(
                <p key={recipe.id}>{recipe.name}</p>
            ))}
        </div>
    )
}
