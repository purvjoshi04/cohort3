import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Video } from 'lucide-react';
import { SidebarToggleOut } from './icons/SidebarToggleOut';
import banner from "../assets/_.jpeg";
import user from "../assets/user.jpg"

export const MainContent = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
    const webinars = [
        { time: "11:30 AM", title: "UX Webinar", status: "Live", isLive: true },
        { time: "11:30 AM", title: "My first Webinar", status: "Upcoming", isLive: false },
        { time: "11:30 AM", title: "Important Webinar", status: "Upcoming", isLive: false },
        { time: "11:30 AM", title: "Webinar 1", status: "Upcoming", isLive: false }
    ];

    return (
        <>
            <div className="h-50 relative overflow-hidden">
                <img
                    src={banner}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {isMobile && !sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute top-4 left-4 p-2 bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-all z-10"
                    >
                        <SidebarToggleOut />
                    </button>
                )}
            </div>
            <div className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={user}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-2xl object-cover mr-4"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">Monday, 14 October</p>
                                        <h2 className="text-2xl font-bold text-gray-800">Good morning, test user! 👋</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-semibold text-gray-800">Monday, 14 October 2024</span>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 hover:bg-gray-400 rounded-lg">
                                                <ChevronLeft className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-400 rounded-lg">
                                                <ChevronRight className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {webinars.map((webinar, index) => (
                                        <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-400 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-center">
                                                    <div className="font-bold text-lg text-gray-800">{webinar.time}</div>
                                                    <div className="text-sm text-gray-500">11:30 AM</div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    {webinar.isLive ? (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">Live</span>
                                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">Upcoming</span>
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-gray-800">{webinar.title}</span>
                                                </div>
                                            </div>
                                            {index === 1 && (
                                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-sm font-bold">P</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 space-y-4">
                            <div className="bg-teal-500 rounded-2xl p-6 text-white cursor-pointer hover:bg-teal-600 transition-colors group">
                                <div className="flex items-center justify-center w-12 h-12 bg-opacity-20 rounded-xl mb-4 group-hover:bg-opacity-30 transition-colors">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Schedule a Webinar</h3>
                                <p className="text-teal-100 text-sm">Create and schedule your next webinar session</p>
                            </div>
                            <div className="bg-teal-500 rounded-2xl p-6 text-white cursor-pointer hover:bg-teal-600 transition-colors group">
                                <div className="flex items-center justify-center w-12 h-12 bg-opacity-20 rounded-xl mb-4 group-hover:bg-opacity-30 transition-colors">
                                    <Video className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Open Recordings</h3>
                                <p className="text-teal-100 text-sm">Access your webinar recordings and analytics</p>
                            </div>
                            <div className="bg-teal-500 rounded-2xl p-6 text-white cursor-pointer hover:bg-teal-600 transition-colors">
                                <h3 className="font-bold text-lg mb-2">Join</h3>
                                <p className="text-teal-100 text-sm">Quick access to join meetings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};