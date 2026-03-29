import { useState } from "react"
import { HamBurgerMenu } from "../icons/HamBurgerMenu"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"

export const Navbar = ({ isAuthenticated = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 right-0 px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#f6f6f6] backdrop-blur-md px-6 py-4 flex justify-between items-center rounded-2xl border border-white">
                    <div className="text-xl md:text-2xl font-bold text-white">
                        CourseHub
                    </div>
                    <nav className="hidden md:flex gap-4 items-center">
                        <Button text="Home" onClick={() => navigate("/")}/>
                        {!isAuthenticated ? (
                            <>
                                <Button text="User Login" />
                                <Button text="Admin Login" />
                            </>
                        ) : (
                            <Button text="Logout" className="hover:bg-red-500/20" />
                        )}
                    </nav>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <HamBurgerMenu isOpen={isMenuOpen} />
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-4">
                        <nav className="flex flex-col gap-3">
                            <Button text="Home" className="w-full" />
                            {!isAuthenticated ? (
                                <>
                                    <Button text="User Login" className="w-full" />
                                    <Button text="Admin Login" className="w-full" />
                                </>
                            ) : (
                                <Button text="Logout" className="w-full hover:bg-red-500/20" />
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}