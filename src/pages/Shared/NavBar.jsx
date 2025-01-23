import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const links = <>
        <li><NavLink to='/' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">Home</NavLink></li>
        {
            user ?
                <>
                    <li><NavLink to='/' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">All Scholarship</NavLink></li>
                    { 
                         user?.role === 'admin'
                            ?
                            <li><NavLink to='/adminDashboard' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">Admin Dashboard</NavLink></li>
                            :
                            < li > <NavLink to='/userDashboard' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">User Dashboard</NavLink></li>
                    }
                </>
                : ''
        }
    </>;

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Dream Scholar Hub</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && user?.email ? (
                        <div className="flex gap-2 items-center">
                            <div className="relative group">
                                <img
                                    className="w-10 rounded-full"
                                    src={user?.photoURL}
                                    alt="User Avatar"
                                />
                                <p className="absolute -bottom-12 text-center text-white bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300">
                                    {user.displayName}
                                </p>
                            </div>
                            <button
                                onClick={logOut}
                                className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500"
                            >
                                Log-Out
                            </button>
                        </div>
                    ) : (
                        <>
                            <NavLink to='/login' className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md mr-2 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500">Login</NavLink>
                            <NavLink to='/register' className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500">Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;