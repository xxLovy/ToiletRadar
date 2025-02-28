import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchBox = () => {
    return (
        <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-gray-900'>Search</h3>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200"
                    placeholder="Search for toilets..."
                />
            </div>
        </div>
    )
}

export default SearchBox