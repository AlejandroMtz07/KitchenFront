import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";


export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen bg-white ">
                <div className="max-w-lg mx-auto pt-20 px-5 flex flex-row justify-center items-center gap-10">
                    <Link to={'/'}>
                        <img src="/kitchen-logo.svg" alt="Kitchen Logo" height={100} width={100} />
                    </Link>

                    <h1 className="font-extralight text-5xl">
                        Kitchen recipes
                    </h1>
                </div>
                <div className="m-20">
                    <Outlet />
                </div>
            </div>
            <Toaster position="top-right" style={{backgroundColor: ''}}/>
        </>
    )
}
