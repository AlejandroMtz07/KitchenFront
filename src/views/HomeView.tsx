import HomeCard from "../components/HomeCard";
import NavBar from "../components/NavBar";
import SearchUsernameInput from "../components/SearchUsernameInput";


export default function HomeView() {
    return (
        <div className="bg-white min-h-screen">
            <NavBar />
            <div className="lg:p-5 p-3 flex justify-start ml-2 rounded">
                <SearchUsernameInput/>
            </div>
            <main className="lg:grid p-4 flex flex-col m-10 gap-10">
                <HomeCard 
                    text="On this website you will be able to upload your favorite recipes, special recipes,
                    which can be private if you don't want others to copy your special
                    touch, or public to share your great cooking skills." 
                    image_url="/images/breakfast.jpg" 
                    reverse={false}
                />
                <HomeCard
                    text="Also you  will be able to save public recipes to your private recipe book from
                    other users if you want to save for later his recipe."
                    image_url="/images/recipe-book.jpg"
                    reverse={true}
                />
                <HomeCard
                    text="Finally, you will be able to see the public recipes from the user that you want, 
                    like famous chefs or people you know that use this app."
                    image_url="/images/profile.png"
                    reverse={false}
                />
            </main>
        </div>
    )
}
