import { TextInput } from "@repo/ui/text-input";

export default function Chat() {
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
            <div>
                Chat room
            </div>
            <div style={{margin: 70}}>
                <TextInput placeholder={"Send a message"}/>
            </div>
        </div>
    )
}