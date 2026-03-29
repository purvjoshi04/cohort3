interface ButtonProps {
    text: string,
    onClick?: () => void,
    className?: string
}

export const Button = (props: ButtonProps) => {
    return (
        <div className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-200">{props.text}</div>
    )
} 