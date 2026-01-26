import type { PublicRecipe } from "../types"

type RecipeCardProps = {
    recipe: PublicRecipe
}

export default function RecipeCard({recipe}:RecipeCardProps) {
  return (
    <>
        <div className=" m-10 rounded-3xl bg-white-200 border-2 
            border-b-gray-300 shadow-sm shadow-gray-300 w-50 align-middle 
            flex flex-row items-center justify-between">
            <div className="text-center lg:ml-40 p-4 lg:text-lg text-sm">
                <p className="font-extralight">{recipe.name}</p>
                <p className="font-extralight">{recipe.description}</p>
                <p className="font-extralight">Author: {recipe.user_username}</p>
                <button className="lg:mt-10 mt-2 text-xs p-2 uppercase lg:border-b-2 border-black ">
                    Add recipe
                </button>
            </div>
            <img src={recipe.image} alt={recipe.description} className="lg:max-w-lg max-w-40 rounded-3xl"/>
        </div>
    </>
  )
}
