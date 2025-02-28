import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CgProfile } from 'react-icons/cg';
import { FaHome, FaSchool, FaUsers } from 'react-icons/fa';
import { MdReviews, MdSettingsApplications } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const AdminDashboard = () => {
    const { isAdmin } = useAdmin();

    return (
        <div className='flex bg-gradient-to-r from-green-600 to-lime-600 p-10'>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <div className='w-64 md:min-h-screen'>
                <ul className='menu p-5 text-white font-bold space-y-4 md:text-lg'>
                    <li>
                        <NavLink to='/adminDashboard/myProfile'><CgProfile /> My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/addScholarships'><FaSchool /> Add Scholarships</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/manageApplication'><MdSettingsApplications /> Manage Applications</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/manageReviews'><MdReviews /> Manage Reviews</NavLink>
                    </li>

                    {/* Only show "Manage Users" for Admins, not Moderators */}
                    {isAdmin && (
                        <li>
                            <NavLink to='/adminDashboard/users'><FaUsers /> Manage Users</NavLink>
                        </li>
                    )}

                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'><FaHome /> Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-10 bg-white rounded-xl shadow-2xl'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
