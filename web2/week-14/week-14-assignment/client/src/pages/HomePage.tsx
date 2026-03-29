import { Navbar } from "../components/Navbar"
import { Signin } from "./Signin"

export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="mt-27 border-black rounded-2xl w-300 h-30 ml-35 bg-[#f6f6f6]">
                <div className="p-2 text-3xl flex justify-center">
                Welcome to CourseHub
                </div>
                <div className="font-light mt-5 flex justify-center text-gray-300">
                    Discover amazing courses and enhance your skills with our platform.
                </div>
                <Signin />
            </div>
        </div>
    )
}       