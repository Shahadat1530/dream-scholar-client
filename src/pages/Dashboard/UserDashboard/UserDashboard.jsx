import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { MdReviews, MdSettingsApplications } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className='flex bg-gradient-to-r from-green-600 to-lime-600 p-10'>
            <Helmet>
                <title>User Dashboard</title>
            </Helmet>
            <div className='w-64 md:min-h-screen'>
                <ul className='menu p-5 text-white font-bold space-y-4 md:text-lg'>
                    <li>
                        <NavLink to='/userDashboard/myProfile'><CgProfile></CgProfile> My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/userDashboard/myApplication'><MdSettingsApplications></MdSettingsApplications> My Application</NavLink>
                    </li>
                    <li>
                        <NavLink to='/userDashboard/myReviews'><MdReviews></MdReviews> My Reviews</NavLink>
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

export default UserDashboard;