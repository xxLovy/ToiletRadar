import React from 'react';
import Navbar from "@/components/Navbar";
import MobileNavBar from "@/components/MobileNavbar";

const Header = () => {
    return (
        <header className="z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 w-full">

            <div className="hidden md:block h-full flex-1">
                <Navbar />
            </div>
            <div className="block md:hidden h-full flex-1">
                <MobileNavBar />
            </div>

        </header>
    );
};

export default Header; 