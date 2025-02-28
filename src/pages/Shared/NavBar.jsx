import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin(); // Remove refetch

    // Remove useEffect (no longer needed)

    if (isAdminLoading) {
        return <div><progress className="progress w-56"></progress></div>;
    }

    const links = <>
        <li><NavLink to='/' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">Home</NavLink></li>
        <li><NavLink to='/scholarships' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">All Scholarship</NavLink></li>
        {user ? (
            <>


                {isAdmin ? (
                    <li><NavLink to='/adminDashboard' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">Admin Dashboard</NavLink></li>
                ) : (
                    <li><NavLink to='/userDashboard' className="nav-link px-3 py-2 rounded-md text-gray-800 hover:text-white transition duration-300 ease-in-out">User Dashboard</NavLink></li>
                )}
            </>
        ) : null}
    </>;

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Dream Scholar Hub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
                {user && user?.email ? (
                    <div className="flex gap-2 items-center">
                        <img className="w-10 rounded-full" src={user?.photoURL} alt="User Avatar" />
                        <button onClick={logOut} className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md">Log-Out</button>
                    </div>
                ) : (
                    <>
                        <NavLink to='/login' className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md mr-2">Login</NavLink>
                        <NavLink to='/register' className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md">Register</NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
