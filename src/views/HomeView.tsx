import NavBar from "../components/NavBar";
import SearchInput from "../components/SearchInput";


export default function HomeView() {
    return (
        <div className="bg-white min-h-screen">
            <NavBar />
            <div className="lg:p-5 p-3 flex justify-start ml-2 rounded">
                <SearchInput/>
            </div>
            <main className="lg:grid lg:grid-cols-2 p-4 flex flex-col">
                <div className="p-4 mt-40 lg:m-20 border-gray-200 flex items-center rounded-lg
                    hover:shadow-xl border-2 transition text-center leading-loose font-thin">
                    On this website you will be able to upload your favorite recipes, special recipes,
                    which can be private if you don't want others to copy your special
                    touch, or public to share your great cooking skills.
                </div>
                <div className="p-4">
                    <img
                        src="/images/breakfast.jpg"
                        alt="Breakfast image"
                        className="rounded-lg opacity-75" />
                </div>
                <div className="p-4">
                    <img
                        src="/images/recipe-book.jpg"
                        alt="Recipe book"
                        className="rounded-lg opacity-75"
                    />
                </div>
                <div className="p-4 mt-40 lg:m-20 border-gray-200 flex items-center rounded-lg
                    hover:shadow-xl border-2 transition text-center leading-loose font-thin">
                    Also you  will be able to save public recipes to your private recipe book from
                    other users if you want to save for later his recipe.
                </div>
                <div className="p-4 mt-40 lg:m-20 border-gray-200 flex items-center rounded-lg
                    hover:shadow-xl border-2 transition text-center leading-loose font-thin">
                    Finally, you will be able to see the public recipes from the user that you want, 
                    like famous chefs or people you know that use this app.
                </div>
                <div>
                    <img 
                        src="/images/profile.png" 
                        alt="Profile photo" 
                        className="rounded-lg opacity-75"
                    />
                </div>
            </main>
        </div>
    )
}
