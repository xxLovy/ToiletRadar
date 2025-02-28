import React from 'react';
import Footer from "@/components/Footer";
import PanicFooter from "@/components/PanicFooter";

const MainFooter = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <div className="h-[60px] flex items-center px-6">
                <div className="hidden md:block h-full flex-1">
                    <Footer />
                </div>
                <div className="block md:hidden h-full flex-1">
                    <PanicFooter />
                </div>
            </div>
        </footer>
    );
};

export default MainFooter; 