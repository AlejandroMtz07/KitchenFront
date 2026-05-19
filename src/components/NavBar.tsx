import { ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, ArrowTopRightOnSquareIcon, Bars3Icon, BookmarkIcon, BookOpenIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function NavBar() {

    // Variable to get the current user location.
    const location = useLocation();
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    // List with protected links
    const protectedLinks = [
        '/recipes/book',
        '/recipes/new'
    ]


    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['recipes'] });
    }

    return (

        <nav
            className=" sticky top-0 z-50 backdrop-blur-sm border-b-2 border-b-gray-300 bg-white/70"
        >
            <div className="flex justify-between items-center p-4 lg:px-10">

                {/* Logo link image */}
                <div className="flex items-center gap-3">
                    <Link to={'/'}>
                        <img src="/kitchen-logo.svg" height={100} width={100} />
                    </Link>
                    <h1 className="uppercase font-extralight lg:text-3xl 
                        text-lg motion-preset-typewriter-[15] motion-duration-[8s] block "
                    >
                        Kitchen Recipes
                    </h1>
                </div>
                {/* Desktop menu */}
                <div className="hidden lg:flex gap-6 items-center">
                    {protectedLinks.includes(location.pathname) ?
                        <Link
                            to={'/'}
                            className="text-right text-xs lg:text-sm border-b-black 
                                border-b-2 uppercase font-extralight flex flex-row gap-2 p-2"
                            onClick={logout}
                        >
                            <ArrowLeftStartOnRectangleIcon width={20} />
                            Logout
                        </Link> :
                        <Link
                            to={'/auth/login'}
                            className="text-right text-xs lg:text-sm border-b-black 
                                border-b-2 uppercase font-extralight flex flex-row p-2 gap-2"
                        >
                            <ArrowTopRightOnSquareIcon width={20} />
                            Login
                        </Link>
                    }
                    {!protectedLinks.includes(location.pathname) &&
                        <Link
                            to={'/auth/register'}
                            className="text-right text-xs lg:text-sm border-b-black 
                            border-b-2 uppercase font-extralight flex flex-row p-2 gap-2"
                        >
                            <ArrowRightEndOnRectangleIcon width={20} />
                            Register
                        </Link>}
                    <Link
                        to={'/recipes'}
                        className="text-right text-xs lg:text-sm border-b-black 
                            border-b-2 uppercase font-extralight flex flex-row gap-2 p-2"
                    >
                        <BookOpenIcon width={20} />
                        Recipes
                    </Link>
                    <Link
                        to={'/recipes/book'}
                        className="text-right text-xs lg:text-sm border-b-black
                            border-b-2 uppercase font-extralight flex flex-row gap-2 p-2"
                    >
                        <BookmarkIcon width={20} />
                        Saved
                    </Link>
                </div>
                {/* Mobile button */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >

                    {isOpen ? (
                        <XMarkIcon width={30} />
                    ) : (
                        <Bars3Icon width={30} />
                    )}

                </button>
            </div>
            {/* Mobile menu */}
            {isOpen && (
                <div className="flex flex-col gap-4 p-4 lg:hidden border-t border-gray-200 bg-white">

                    {protectedLinks.includes(location.pathname) ? (
                        <Link
                            to={'/'}
                            onClick={logout}
                        >
                            <ArrowLeftStartOnRectangleIcon width={20} />
                            <p>Login</p>
                        </Link>

                    ) : (

                        <Link
                            to={'/auth/login'}
                        >
                            <ArrowTopRightOnSquareIcon width={20} />
                            Login
                        </Link>

                    )}

                    {!protectedLinks.includes(location.pathname) && (

                        <Link
                            to={'/auth/register'}
                        >
                            <ArrowRightEndOnRectangleIcon width={20} />
                            Register
                        </Link>

                    )}

                    <Link
                        to={'/recipes'}
                    >
                        <BookOpenIcon width={20} />
                        Recipes
                    </Link>

                    <Link
                        to={'/recipes/book'}
                    >
                        <BookmarkIcon width={20} />
                        Saved
                    </Link>

                </div>
            )}
        </nav>

    )
}
