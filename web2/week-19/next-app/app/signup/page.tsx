"use client"

import axios from "axios"
import { useRef } from "react"

export default function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        const username = usernameRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        await axios.post("http://localhost:3000/api/v1/signup", {
            username,
            password
        })
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="border p-2">
                <input type="text" placeholder="username" ref={usernameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button onClick={handleSubmit}>Sign up</button>
        </div>
        </div >
    )
}