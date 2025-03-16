import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const NavBar = () => {
    const { user, logOut } = useAuth();
    const { isAdmin, isModerator, isAdminLoading } = useAdmin();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (isAdminLoading) {
        return <div className="flex justify-center py-4"><progress className="progress w-56"></progress></div>;
    }

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/scholarships">All Scholarships</NavLink></li>

            {user && user.email && (
                isAdmin || isModerator ? (
                    <li><NavLink to="/adminDashboard">Admin Dashboard</NavLink></li>
                ) : (
                    <li><NavLink to="/userDashboard">User Dashboard</NavLink></li>
                )
            )}
        </>
    );

    return (
        <div className='bg-[#b91c1c] sticky top-0 z-50 text-white font-semibold'>
            <div className="navbar max-w-screen-2xl mx-auto px-4 flex justify-between items-center">

                {/* Left: Branding & Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FiMenu />
                    </button>

                    {/* Brand Name */}
                    <NavLink to="/" className=" text-xl font-bold">
                        Dream Scholar Hub
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex navbar-center">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                {/* Right: User Actions */}
                <div className="navbar-end">
                    {user && user.email ? (
                        <div className="flex gap-2 items-center">
                            <img className="w-10 h-10 rounded-full border border-gray-300" src={user?.photoURL} alt="User Avatar" />
                            <button onClick={logOut} className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md">
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="hidden lg:flex gap-2">
                            <NavLink to="/login" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-md">
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-[#b91c1c] shadow-md p-4">
                    <ul className="flex flex-col items-center gap-4">{links}</ul>

                    <div className="flex flex-col items-center mt-4">
                        {user && user.email ? (
                            <button onClick={logOut} className="btn btn-outline btn-error w-full">
                                Log Out
                            </button>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn btn-primary w-full mb-2">
                                    Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-secondary w-full">
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
