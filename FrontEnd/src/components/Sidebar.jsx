import { clearImageBlob, clearImages } from '@/redux/imageSlice';
import { clearUserInfo } from '@/redux/userSlice';
import { Image, LayoutDashboard, LogOut, Menu, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logOut = async () => {
    console.log('logging out');
    dispatch(clearUserInfo());
 dispatch(clearImages());
  dispatch(clearImageBlob())

    window.location.href = '/login';
  }


  return (
    <div className="flex relative w-fit">
      {/* Hamburger Icon (only visible on mobile) */}
      <button
        className="text-2xl p-4 align-bottom  self-start md:hidden"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full border-r-2  bg-white  p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:min-w-full md:h-screen  z-20`}
      >
        <h1 className="text-2xl font-serif font-bold mb-4">Image SAAS</h1>
        <nav className="space-y-2">
        
        {/* Dashboard Button */}
          <Link
            to="/"
            className=" text-left w-full flex gap-2  px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
          >
            <LayoutDashboard width={20} />
            Dashboard
          </Link>
        
        {/* Filter Page Button */}
          <Link
            to="/filter"
            className=" text flex gap-2 w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Image width={20} />
            Filter Page
          </Link>

          <Link
            to="/documentation"
            className="text flex gap-2 items-center w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src="https://cdn4.iconfinder.com/data/icons/big-data-133/100/document_office_file_information_computer_documentation-512.png" width={20} height={20} />
            Documentation
          </Link>

          <Link
            to="/about"
            className="text flex gap-2 items-center w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img src="https://icon-library.com/images/about-us-icon/about-us-icon-3.jpg" width={20} height={20} />
            About Us
          </Link>

          <Link
            to="/profile"
            className="text flex gap-2 w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <UserRound width={20} />
            Profile
          </Link>
          <button
            className="text flex gap-2 w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={logOut}
            
          >
            <LogOut width={20} />
            Logout
          </button>
          {/* <Link
            to="/filters2"
            className="block text-left w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            TempShow2
          </Link>
          <Link
            to="/filters3"
            className="block text-left w-full px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            TempShow3
          </Link> */}
        </nav>
      </aside>

      {/* Overlay (only visible on mobile when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          // style={{ left: '50%' }}
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
