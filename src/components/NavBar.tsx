import { ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, ArrowTopRightOnSquareIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";


export default function NavBar() {

    const location = useLocation();

    const protectedLinks = [
        '/recipes/book',
        '/recipes/new'
    ]

    const queryClient = useQueryClient();

    const logout = ()=>{
        localStorage.removeItem('token');
        queryClient.invalidateQueries({queryKey:['recipes']});
    }

    return (

        <nav
            className="lg:p-10 p-7 bg-transparent items-center flex 
                    justify-between gap-1 lg:gap-10 border-b-2 
                    border-b-gray-300 sticky top-0 z-50 backdrop-blur-sm"
        >
            <div className="flex items-center lg:gap-4 gap-2">
                <Link to={'/'}>
                    <img src="/kitchen-logo.svg" height={100} width={100} />
                </Link>
                <h1 className="uppercase font-extralight lg:text-3xl 
                    text-lg lg:motion-preset-typewriter-[15] lg:motion-duration-[8s] lg:block hidden"
                >
                    Kitchen Recipes
                </h1>
            </div>
            <div className="flex lg:gap-10 gap-3 print:hidden">
                {protectedLinks.includes(location.pathname)? 
                    <Link 
                        to={'/'} 
                        className="text-right text-xs lg:text-sm border-b-black 
                            border-b-2 uppercase font-extralight flex flex-row gap-2 p-2"
                        onClick={logout}
                    >
                        <ArrowLeftStartOnRectangleIcon width={20}/>
                        Logout
                    </Link>:
                    <Link
                        to={'/auth/login'}
                        className="text-right text-xs lg:text-sm border-b-black 
                            border-b-2 uppercase font-extralight flex flex-row p-2 gap-2"
                    >
                        <ArrowTopRightOnSquareIcon width={20}/>
                        Login
                    </Link>
                }
                {protectedLinks.includes(location.pathname) ? '' : <Link
                    to={'/auth/register'}
                    className="text-right text-xs lg:text-sm border-b-black 
                        border-b-2 uppercase font-extralight flex flex-row p-2 gap-2"
                >
                    <ArrowRightEndOnRectangleIcon width={20}/>
                    Register
                </Link>}
                <Link
                    to={'/recipes'}
                    className="text-right text-xs lg:text-sm border-b-black 
                        border-b-2 uppercase font-extralight flex flex-row gap-2 p-2"
                >
                    <BookOpenIcon width={20}/>
                    Recipes
                </Link>
            </div>
        </nav>

    )
}
