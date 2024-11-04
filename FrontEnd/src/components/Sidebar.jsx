import React from 'react';
import { LayoutGrid, Star } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-fit  sm:w-64 bg-white shadow-md p-4 h-screen  flex flex-col space-y-4">
      {/* Logo */}
     

     
    <h1 className=' text-2xl'>Image SAAS</h1>
      {/* Menu Items */}
      <div className="flex flex-col space-y-2 self">
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
          <LayoutGrid className="text-gray-700" />
          <span className="text-gray-700 font-medium">Team Board</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
          <Star className="text-gray-700" />
          <span className="text-gray-700 font-medium">Favourite Boards</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
