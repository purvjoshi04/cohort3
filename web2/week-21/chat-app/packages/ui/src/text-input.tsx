type InputProps = {
    placeholder: string,
    onChange?: () => void
}

export function TextInput({
    placeholder,
    onChange,
}: InputProps) {
    return (
        <input style={{
            padding: 10,
            margin: 10,
            borderColor: "black",
            borderWidth: 1,
        }} placeholder={placeholder} onChange={onChange}></input>
    )
}