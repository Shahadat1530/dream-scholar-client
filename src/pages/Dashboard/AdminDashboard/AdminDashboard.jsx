import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CgProfile } from 'react-icons/cg';
import { FaHome, FaSchool, FaUsers, FaBars } from 'react-icons/fa';
import { MdReviews, MdSettingsApplications } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const AdminDashboard = () => {
    const { isAdmin } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row bg-primary p-4 md:p-10 min-h-screen">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white text-3xl mb-4 bg-accent] p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <div className={`absolute md:static w-64 min-h-screen bg-accent rounded-xl p-5 text-white font-bold transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <ul className="space-y-4 md:text-lg">
                    <li>
                        <NavLink to='/adminDashboard/myProfile' className="flex items-center gap-2 hover:text-[#bffcfc]" onClick={() => setIsOpen(false)}>
                            <CgProfile /> My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/addScholarships' className="flex items-center gap-2 hover:text-[#bffcfc]" onClick={() => setIsOpen(false)}>
                            <FaSchool /> Add Scholarships
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/manageApplication' className="flex items-center gap-2 hover:text-[#bffcfc]" onClick={() => setIsOpen(false)}>
                            <MdSettingsApplications /> Manage Applications
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/manageReviews' className="flex items-center gap-2 hover:text-[#bffcfc]" onClick={() => setIsOpen(false)}>
                            <MdReviews /> Manage Reviews
                        </NavLink>
                    </li>

                    {/* Only show "Manage Users" for Admins, not Moderators */}
                    {isAdmin && (
                        <li>
                            <NavLink to='/adminDashboard/users' className="flex items-center gap-2 hover:text-[#bffcfc]" onClick={() => setIsOpen(false)}>
                                <FaUsers /> Manage Users
                            </NavLink>
                        </li>
                    )}

                    <div className="divider border-t border-[#bffcfc]"></div>
                    <li>
                        <NavLink to='/' className="flex items-center gap-2 hover:text-[#bffcfc]" onClick={() => setIsOpen(false)}>
                            <FaHome /> Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-10 bg-secondary rounded-xl shadow-2xl w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
