type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({children}:ErrorMessageProps) {
  return (
    <div className="text-red-900 font-extralight animate-pulse">
        {children}
    </div>
  )
}
