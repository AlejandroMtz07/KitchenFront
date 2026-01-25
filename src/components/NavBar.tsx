import { Link } from "react-router-dom";


export default function NavBar() {
    return (

        <nav
            className="lg:p-20 p-7 bg-transparent items-center flex 
                    justify-between gap-1 lg:gap-10 border-b-2 border-b-gray-200 sticky top-0 z-50"
        >
            <div className="flex items-center lg:gap-4 gap-2">
                <Link to={'/'}>
                    <img src="/kitchen-logo.svg" height={100} width={100} />
                </Link>
                <h1 className="uppercase font-extralight lg:text-3xl 
                    text-lg lg:motion-preset-typewriter-[15] lg:motion-duration-[8s]"
                >
                    Kitchen Recipes
                </h1>
            </div>
            <div className="flex lg:gap-10 gap-3">
                <Link
                    to={'/auth/login'}
                    className="text-right text-sm border-b-black border-b-2 uppercase font-extralight"
                >
                    Login
                </Link>
                <Link
                    to={'/auth/register'}
                    className="text-right text-sm border-b-black border-b-2 uppercase font-extralight"
                >
                    Register
                </Link>
                <Link
                    to={'/recipes'}
                    className="text-right text-sm border-b-black border-b-2 uppercase font-extralight"
                >
                    Recipes
                </Link>
            </div>
        </nav>

    )
}
