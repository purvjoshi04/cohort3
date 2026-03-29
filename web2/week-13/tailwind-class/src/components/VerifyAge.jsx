import { useState } from "react"
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";

export const VerifyAge = ({ placeholder }) => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleContinue = () => {
        if (value) {
            navigate("/email")
        }
    }

    return (
        <div className='h-screen bg-[#012d59]'>
            <Header />
            <div className="flex text-3xl text-white font-semibold justify-center pt-8">
                Verify Your age
            </div>
            <div className="flex justify-center pt-18 text-[#6586a8]">
                Please confirm your birth year. This data will not be stored.
            </div>
            <div className="flex justify-center pt-3">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder={placeholder}
                    className="px-4 py-3 w-80 rounded-xl text-sm text-white bg-[#19416b] outline-none placeholder-gray-300" />
            </div>
            <div className="flex justify-center pt-8">
                <span
                    onClick={handleContinue}
                    className={`rounded text-sm px-34 py-3 text-white cursor-pointer ${value ? "bg-[#68d5d7]" : "bg-[#7e96aa]"}`} >
                    Continue
                </span>
            </div>
        </div >
    )
}