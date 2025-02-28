"use client"

// components/MobileNavBar.tsx
import React from 'react'
import { navlinks } from '../../constants'
import Image from 'next/image'
import Link from 'next/link'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface MobileNavBarProps {
    isLoggedIn: boolean;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ isLoggedIn }) => {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:hidden">
            <nav className="flex h-14 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/icon.png"
                        alt='App Icon'
                        height={32}
                        width={32}
                        className="rounded-lg"
                    />
                    <span className="font-semibold">ToiletRadar</span>
                </Link>

                <Sheet>
                    <SheetTrigger className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80vw] sm:w-[350px] p-0">
                        <nav className="flex flex-col h-full">
                            <div className="px-4 py-3 border-b">
                                <h2 className="text-lg font-semibold">Menu</h2>
                            </div>
                            <div className="flex-1 overflow-auto py-2">
                                {navlinks.map((item, index) => (
                                    <SheetClose asChild key={index}>
                                        <Link
                                            href={item.route}
                                            className={cn(
                                                "flex items-center px-4 py-2 text-sm transition-colors hover:bg-gray-100",
                                                pathname === item.route && "bg-gray-100 font-medium"
                                            )}
                                        >
                                            {item.lable}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </div>
                            {isLoggedIn && (
                                <div className="border-t px-4 py-3">
                                    <LogoutLink className="flex w-full items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700">
                                        Logout
                                    </LogoutLink>
                                </div>
                            )}
                        </nav>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    )
}

export default MobileNavBar