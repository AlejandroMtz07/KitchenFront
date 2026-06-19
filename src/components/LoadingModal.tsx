
type LoadingModalProps = {
    isLoading: boolean,
    message: string,
}


export default function LoadingModal({ isLoading, message} : LoadingModalProps) {
    if(!isLoading) return null;
    return (
        
        <div className="fixed top-1/4 lg:left-[38%] md:left-[30%] left-[5%] lg:w-[50vh] md:w-[50vh] w-[43vh] h-[50vh] 
        flex justify-center items-center bg-gray-700 bg-opacity-50 rounded-lg">
            <div className="flex items-center justify-center flex-col">
                <div className="rounded-full animate-spin [animation-duration:1.5s]">
                    <img src={"/images/cubiertos.png"} alt="Loading" className="h-20 w-20"/>
                </div>
                <p className="text-white text-xl font-bold mt-3">{message}</p>
            </div>
        </div>
    )
}
