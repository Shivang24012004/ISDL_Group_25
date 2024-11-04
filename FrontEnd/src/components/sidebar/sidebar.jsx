import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './siidebarLinker';
import { Settings } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path
                className="text-gray-600"
                d="M10.293 15.707a1 1 0 010-1.414L12.586 12 10.293 9.707a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0z"
              />
              <path
                className="text-gray-400"
                d="M4 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              />
            </svg>
          </button>
          <NavLink end to="/" className="block">
            {/* <img src={Logo} alt="Logo" className="w-8 h-8" /> */}
          </NavLink>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === '/' || pathname.includes('dashboard') ? 'hover:text-gray-200' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <path className="fill-current text-gray-400" d="M13 2H6C4.346 2 3 3.346 3 5v14c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V9l-8-7zM6 4h7v5h5v10c0 .551-.449 1-1 1H6c-.551 0-1-.449-1-1V5c0-.551.449-1 1-1zm8 0l5 5h-5V4z" />
                            <path className="fill-current text-gray-600" d="M6 8h8v2H6zm0 4h8v2H6zm0 4h8v2H6z" />
                          </svg>
                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                        </div>
                        <div className="flex shrink-0 ml-2">
                        </div>
                      </div>
                    </a>
                    <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                      <li className="mb-1 last:mb-0">
                        <NavLink end to="/" className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate">
                          <span className="text-sm font-medium duration-200">Main</span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink end to="/analytics" className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate">
                          <span className="text-sm font-medium duration-200">Analytics</span>
                        </NavLink>
                      </li>
                      <li className="mb-1 last:mb-0">
                        <NavLink end to="/fintech" className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate">
                          <span className="text-sm font-medium duration-200">Fintech</span>
                        </NavLink>
                      </li>
                    </ul>
                  </React.Fragment>
                )}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;