
type LoadingModalProps = {
    isLoading: boolean,
    message: string
}


export default function LoadingModal({ isLoading, message} : LoadingModalProps) {
    if(!isLoading) return null;
    return (
        
        <div className="fixed top-1/4 lg:left-[38%] md:left-[30%] left-[7%] w-[50vh] h-[50vh] 
        flex justify-center items-center z-[9999] bg-gray-700 bg-opacity-70 rounded-lg">
            <div className="flex items-center justify-center flex-col">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-blue-700 rounded-full animate-spin"/>
                <p className="text-white">{message}</p>
            </div>
        </div>
    )
}
