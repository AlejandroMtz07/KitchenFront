import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/RecipesApi";
import { Navigate } from "react-router-dom";

export default function RecipesView() {
    const { data, isLoading, isError } = useQuery({
        queryFn: getRecipes,
        queryKey: ['recipes'],
        retry: 1
    });

    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    if (isLoading) return 'Loading...'

    return (
        data &&
        <>
            <h1 className="text-center p-5">
                Your recipe book.
            </h1>
            <div>
                {data.map(recipe => (
                    <p key={recipe.id}>{recipe.name}</p>
                ))}
            </div>
        </>
    )
}
