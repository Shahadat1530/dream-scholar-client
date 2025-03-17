import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CgProfile } from 'react-icons/cg';
import { FaHome, FaBars } from 'react-icons/fa';
import { MdReviews, MdSettingsApplications } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';

const UserDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#b91c1c] to-[#bffcfc] p-4 md:p-10 min-h-screen">
            <Helmet>
                <title>User Dashboard</title>
            </Helmet>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white text-3xl mb-4 bg-[#b91c1c] p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <div className={`absolute md:static w-64 min-h-screen bg-[#b91c1c] p-5 text-white font-bold transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out rounded-md md:rounded-none`}>
                <ul className="space-y-4 md:text-lg">
                    <li>
                        <NavLink
                            to='/userDashboard/myProfile'
                            className="flex items-center gap-2 hover:text-[#bffcfc]"
                            onClick={() => setIsOpen(false)}
                        >
                            <CgProfile /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/userDashboard/myApplication'
                            className="flex items-center gap-2 hover:text-[#bffcfc]"
                            onClick={() => setIsOpen(false)}
                        >
                            <MdSettingsApplications /> My Application
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/userDashboard/myReviews'
                            className="flex items-center gap-2 hover:text-[#bffcfc]"
                            onClick={() => setIsOpen(false)}
                        >
                            <MdReviews /> My Reviews
                        </NavLink>
                    </li>

                    <div className="divider border-t border-[#bffcfc]"></div>
                    <li>
                        <NavLink
                            to='/'
                            className="flex items-center gap-2 hover:text-[#bffcfc]"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaHome /> Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-10 bg-[#bffcfc] rounded-xl shadow-2xl w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;
