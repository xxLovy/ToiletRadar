import React from 'react'
import SidebarItems from './SidebarItems'
import SearchBox from './SearchBox'

const Sidebar = () => {
    return (
        <div className='bg-white w-[384px] h-auto mt-20 ml-10 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl'>
            <div className='p-6 space-y-6'>
                <SearchBox />
                <div className='border-t border-gray-100 pt-4'>
                    <SidebarItems />
                </div>
            </div>
        </div>
    )
}

export default Sidebar