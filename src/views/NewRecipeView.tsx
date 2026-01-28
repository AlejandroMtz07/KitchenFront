

export default function NewRecipeView() {
  return (
    <div>
        <h1 className="text-center p-5 text-2xl uppercase font-extralight">
            Add anothe recipe
        </h1>
        <div className="border-gray-300 border-2 lg:m-20 m-10">
            <form>
                <div className="flex flex-col p-10">
                    <label htmlFor="recipe_name">
                        Recipe name
                    </label>
                    <input type="text" id="recipe_name" className="bg-gray-200 p-2"/>
                </div>
            </form>
        </div>
    </div>
  )
}
