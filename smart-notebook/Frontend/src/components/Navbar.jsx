import React from "react";
import { Link, useLocation } from "react-router-dom";
function Navbar() {
  let location = useLocation();

 

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Link className={`mr-5 ${location.pathname==='/'?"text-white":""}`} to="/">Home</Link>
            <Link className={`mr-5 ${location.pathname==='/about'?"text-white":""}`}  to="/about">About</Link>
           
          </nav>

          <Link to="/login" className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Login</Link>
          <Link to="/signup" className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-3 mx-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800">Sign Up</Link>

        </div>
      </header>
    </>
  );
}

export default Navbar;
