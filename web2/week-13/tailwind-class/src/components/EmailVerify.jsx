import { useState } from "react"
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";

export const EmailScreen = ({ placeholder }) => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleContinue = () => {
        if (value) {
            navigate("/verifyemail", {
                state: { email: value }
            })
        }
    }
    return (
        <div className='h-screen bg-[#012d59]'>
            <Header />
            <div className="flex text-3xl font-semibold text-white justify-center pt-20">
                Let's Get Started
            </div>
            <div className="flex justify-center pt-10">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="email"
                    placeholder={placeholder}
                    className="px-4 py-3 w-80 rounded-xl text-sm text-white bg-[#19416b] outline-none placeholder-gray-300" />
            </div>
            <div className="flex justify-center pt-10">
                <span
                    onClick={handleContinue}
                    className={`rounded text-sm px-34 py-3 text-white cursor-pointer ${value ? "bg-[#68d5d7]" : "bg-[#7e96aa]"}`} >
                    Continue
                </span>
            </div>
        </div >
    )
}