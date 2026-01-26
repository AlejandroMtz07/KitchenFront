import { useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import api from "../config/axios";
import type { BackendRecipes, PublicRecipe } from "../types";
import RecipeCard from "../components/RecipeCard";


export default function AppLayout() {

  const [publicRecipes, setPublicRecipes] = useState<PublicRecipe[]>([]);

  const getRecipes = async ()=>{
    const {data} = await api.get<BackendRecipes>(
      '/recipes/all',
    )
    setPublicRecipes(data.recipes);
  }

  useEffect(()=>{
    getRecipes();
  },[])

  return (
    <div className="bg-white min-h-screen">
      <NavBar/>
      <div className="flex flex-col mt-10">
        {publicRecipes.map(recipe =>(
          <RecipeCard recipe={recipe} key={recipe.id}/>
        ))}
      </div>
    </div>
  )
}
