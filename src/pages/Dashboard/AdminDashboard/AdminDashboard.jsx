import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CgProfile } from 'react-icons/cg';
import { FaHome, FaSchool, FaUsers } from 'react-icons/fa';
import { MdReviews, MdSettingsApplications } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className='flex bg-gradient-to-r from-green-600 to-lime-600 p-10'>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <div className='w-64 md:min-h-screen'>
                <ul className='menu p-5 text-white font-bold space-y-4 md:text-lg'>
                    <li>
                        <NavLink to='/adminDashboard/myProfile'><CgProfile></CgProfile> My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/addScholarships'><FaSchool></FaSchool>Add Scholarships</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/manageApplication'><MdSettingsApplications></MdSettingsApplications> Manage Application</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/manageReviews'><MdReviews></MdReviews> Manage Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminDashboard/users'><FaUsers></FaUsers> Manage Users</NavLink>
                    </li>

                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'><FaHome></FaHome> Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-10 bg-white rounded-xl shadow-2xl'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminDashboard;