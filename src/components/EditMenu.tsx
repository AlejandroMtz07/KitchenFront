import { XMarkIcon } from "@heroicons/react/24/outline"
import type { PublicRecipe } from "../types"

type EditMenuProps = {
    recipe: PublicRecipe,
    isEditing: boolean,
    handleEditRecipe: ()=>void
}

export default function EditMenu({ recipe, isEditing, handleEditRecipe }: EditMenuProps) {


    if(!isEditing) return null;

    return (
        <div 
            className='border-2 border-gray-200 bg-opacity-50
                bg-gray-300 p-40 backdrop-blur-sm absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2'
        >
            <XMarkIcon 
                width={20} 
                onClick={handleEditRecipe}
                className="cursor-pointer"
            />
            <p>{recipe.name}</p>
            <p>{recipe.description}</p>
            <p>{recipe.is_private === '0' ? 'Public' : 'Private'}</p>
        </div>
    )
}
