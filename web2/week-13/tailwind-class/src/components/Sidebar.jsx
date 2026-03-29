import { useState, useEffect } from "react"
import { SidebarToggleOut } from "./icons/SidebarToggleOut"
import { SidebarToggleIn } from "./icons/SidebarToggleIn"
import television from "../assets/television.png"
import { useNavigate } from "react-router-dom";
import user from "../assets/user.jpg"

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
};

export const Sidebar = ({ sidebarOpen, setSidebarOpen, activeItem, setActiveItem }) => {
    const navigate = useNavigate()
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
    const isDesktop = useMediaQuery("(min-width: 1025px)");
    const isMobile = useMediaQuery("(max-width: 767px)");
    
    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        } else if (isTablet) {
            setSidebarOpen(false);
        } else if (isDesktop) {
            setSidebarOpen(true);
        }
    }, [isMobile, isTablet, isDesktop, setSidebarOpen]);

    const menuItems = [
        {
            name: 'Home',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Webinars',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            name: 'Billing',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        },
        {
            name: 'User Management',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            name: 'Settings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-16'} flex flex-col overflow-hidden shadow-sm`}>
            <div className='flex items-center p-4 transition-all duration-300'>
                <div
                    className="cursor-pointer hover:bg-gray-400 p-2 rounded-lg transition-colors duration-200"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <SidebarToggleIn className="w-6 h-6 text-gray-600" /> : <SidebarToggleOut className="w-6 h-6 text-gray-600" />}
                </div>
                {sidebarOpen && (
                    <div className="px-1 sm:px-3 md:px-4">
                        <div className="bg-[#012d59] rounded-xl flex items-center justify-center sm:justify-start p-4 sm:p-3">
                            <img
                                src={television}
                                alt="Webinar Logo"
                                className="object-contain w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                            />
                            <div
                                className="flex items-baseline ml-0.5 sm:ml-2 text-base sm:text-lg md:text-xl cursor-pointer"
                                onClick={() => navigate("/")}
                            >
                                <div className="text-white">Webinar</div>
                                <div className="text-[#68d5d7]">.gg</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <nav className="flex-1 px-3 py-2">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button 
                                onClick={() => setActiveItem(item.name)} 
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                                    activeItem === item.name
                                        ? 'bg-blue-50 text-blue-700 shadow-sm border-r-2 border-blue-500'
                                        : 'text-gray-600 hover:bg-gray-400 hover:text-gray-800'
                                }`}
                            >
                                <div className={`flex-shrink-0 ${!sidebarOpen ? 'mx-auto' : ''}`}>
                                    {item.icon}
                                </div>
                                {sidebarOpen && (
                                    <span className="font-medium text-sm">
                                        {item.name}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            
            {sidebarOpen && (
                <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-300 overflow-hidden flex-shrink-0">
                            <img
                                src={user}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                test user
                            </p>
                            <p className="text-xs text-gray-500 truncate">test@gmail.com</p>
                            <p className="text-xs text-gray-400">9899999882</p>
                            <p className="text-xs text-gray-400">Delhi, India</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}