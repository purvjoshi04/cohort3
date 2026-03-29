import { useEffect, useState } from "react";
import { SidebarIcon } from "../icons/SidebarIcon";
import startImg from "../assets/star.jpg";
import { LockIcon } from "../icons/LockeIcon";


export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const [screenSize, setScreenSize] = useState('desktop');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 768) {
                // Mobile phones and small tablets
                setScreenSize('mobile');
                setOpen(false);
            } else if (width >= 768 && width < 1024) {
                // Tablets
                setScreenSize('tablet');
                setOpen(false);
            } else if (width >= 1024 && width < 1536) {
                // Small laptops including MacBook Air (1440px)
                setScreenSize('laptop');
                setOpen(true);
            } else {
                // Large desktop screens
                setScreenSize('desktop');
                setOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenSize === 'mobile';
    const isTablet = screenSize === 'tablet';

    return (
        <>
            {isMobile && open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
            <aside
                className={`
          ${isMobile ? 'fixed' : 'relative'}
          h-screen bg-[#323332] font-bold text-white transition-all duration-300 z-50
          ${open ? "w-80" : "w-16"}
          ${isMobile && !open ? "-translate-x-full" : "translate-x-0"}
        `}
            >
                <div className="flex items-center justify-between p-4 ml-2">
                    {open && <span className="text-base">My Lists</span>}
                    <button
                        onClick={() => setOpen(!open)}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        aria-label={open ? "Close sidebar" : "Open sidebar"}
                    >
                        <SidebarIcon />
                    </button>
                </div>

                {open && (
                    <div className="pl-4 mt-3 text-gray-300 text-sm">
                        Created by me
                    </div>
                )}

                <div className="bg-[#474755] p-3 mt-3 pl-3.5 flex items-center gap-2 rounded-lg mx-2 hover:bg-[#525261] transition-colors cursor-pointer">
                    <img src={startImg} alt="star" className="h-6 w-6 object-contain" />
                    {open && (
                        <>
                            <span className="flex-1 text-sm">Favorite</span>
                            <LockIcon />
                        </>
                    )}
                </div>
                {!open && (isTablet || screenSize === 'laptop') && (
                    <div className="mt-4 px-2">
                        <div className="group relative">
                            <div className="p-3 rounded-lg hover:bg-[#474755] transition-colors cursor-pointer flex justify-center">
                                <img src={startImg} alt="star" className="h-6 w-6 object-contain" />
                            </div>
                        </div>
                    </div>
                )}
            </aside>
            {isMobile && !open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed top-4 left-4 z-30 p-2 bg-[#323332] text-white rounded-lg shadow-lg hover:bg-[#474755] transition-colors"
                    aria-label="Open sidebar"
                >
                    <SidebarIcon />
                </button>
            )}
        </>
    );
}