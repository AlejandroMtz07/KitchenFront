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
            <h1 className="text-center p-5 font-extralight text-3xl">
                Your recipe book.
            </h1>
            <div className="grid grid-cols-2 p-20 text-center gap-2">
                {data.map(recipe => (
                    <div
                        className="bg-gray-200 p-20 rounded"
                        key={recipe.id}
                    >
                        {recipe.name}
                    </div>
                ))}
            </div>
        </>
    )
}
