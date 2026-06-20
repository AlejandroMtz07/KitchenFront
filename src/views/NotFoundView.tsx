type NotFoundViewProps = {
  message: string
}

export default function NotFoundView({message}:NotFoundViewProps) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="font-extralight text-3xl">
            404
        </h1>
        <p>
            {message}
        </p>
    </div>
  )
}
