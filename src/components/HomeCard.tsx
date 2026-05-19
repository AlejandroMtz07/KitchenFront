type HomeCardProps = {
    text: string,
    image_url: string,
    reverse: boolean
}

export default function HomeCard({text, image_url, reverse}:HomeCardProps) {
  return (
    <div 
        className={`flex ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} 
            flex-col items-center align-middle lg:h-80 gap-10`}
    >
        <img src={`${image_url}`} alt="Representative image" className="lg:w-full w-auto lg:h-full h-auto"/>
        <div 
            className="p-4 lg:m-10 border-gray-200 flex items-center rounded-lg 
            hover:shadow-xl border-2 transition text-center leading-loose font-thin"
        >
            {text}
        </div>
    </div>
  )
}
