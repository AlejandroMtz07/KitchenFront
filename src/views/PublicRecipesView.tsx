import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard"
import type { BackendRecipes, PublicRecipe } from "../types"
import api from "../config/axios";


export default function PublicRecipesView() {
    const [publicRecipes, setPublicRecipes] = useState<PublicRecipe[]>([]);

    const getRecipes = async () => {
        const { data } = await api.get<BackendRecipes>(
            '/recipes/all',
        )
        setPublicRecipes(data.recipes);
    }

    useEffect(() => {
        getRecipes();
    }, [])
    return (
        <>
            {publicRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </>
    )
}
