import { useState } from "react"

export const Signin = () => {
    const [openSignIn, setOpenSignIn] = useState(false)
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[#f6f6f6] hidden justify-center items-center z-1000">
            <div className="bg-white p-30 max-w-[500px] w-9/10 max-h-[90vh] overflow-y-auto">
                <span className="float-right text-[28px] cursor-pointer text-[#aaa]" onClick={() => setOpenSignIn(!openSignIn)}></span>
                    Login
                    <div className="mb-[25px]">
                        Email:
                        <input type="email" required/>
                    </div>
            </div>
        </div>
    )
}