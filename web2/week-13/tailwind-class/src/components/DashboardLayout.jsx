import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

// Custom hook for media queries
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

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState("Home");
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`${
                isMobile 
                    ? `fixed z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300` 
                    : 'relative'
            }`}>
                <Sidebar 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <MainContent 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    activeItem={activeItem}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
}