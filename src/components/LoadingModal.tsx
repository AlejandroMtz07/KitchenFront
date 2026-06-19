
type LoadingModalProps = {
    isLoading: boolean,
    message: string
}


export default function LoadingModal({ isLoading, message} : LoadingModalProps) {
    if(!isLoading) return null;
    return (
        
        <div className="fixed top-1/4 lg:left-[38%] md:left-[30%] left-[7%] w-[50vh] h-[50vh] 
        flex justify-center items-center z-[9999] bg-gray-700 bg-opacity-50 rounded-lg">
            <div className="flex items-center justify-center flex-col">
                <div className="rounded-full animate-spin">
                    <img src={"/images/cubiertos.png"} alt="Loading" className="h-20 w-20"/>
                </div>
                <p className="text-white text-xl font-bold mt-3">{message}</p>
            </div>
        </div>
    )
}
