import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet } from 'react-router-dom';
import { FaFileAlt, FaCheckCircle, FaClock, FaStar, FaHome } from 'react-icons/fa';

const UserDashboard = () => {
    return (
        <div className="min-h-screen px-4 md:px-10 py-6 max-w-screen-2xl mx-auto">
            <Helmet>
                <title>User Dashboard</title>
            </Helmet>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="mt-1 text-gray-600">Manage your scholarship applications and profile</p>
            </div>

            {/* Top 4 Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
                    <FaFileAlt className="text-blue-600 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-500">Total Applications</p>
                        <p className="text-xl font-bold text-gray-800">4</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
                    <FaCheckCircle className="text-green-600 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="text-xl font-bold text-gray-800">1</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
                    <FaClock className="text-blue-400 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-500">Processing</p>
                        <p className="text-xl font-bold text-gray-800">1</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow flex items-center gap-4">
                    <FaStar className="text-purple-600 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-500">Reviews</p>
                        <p className="text-xl font-bold text-gray-800">2</p>
                    </div>
                </div>
            </div>

            {/* Tabs + Home Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 mb-6 gap-4 text-sm md:text-base font-medium">
                <div className="flex flex-wrap gap-4">
                    <NavLink
                        to="/userDashboard/myProfile"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 text-blue-600 border-b-2 border-blue-600"
                                : "px-4 py-2 text-gray-500 hover:text-blue-600"
                        }
                    >
                        My Profile
                    </NavLink>
                    <NavLink
                        to="/userDashboard/myApplication"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 text-blue-600 border-b-2 border-blue-600"
                                : "px-4 py-2 text-gray-500 hover:text-blue-600"
                        }
                    >
                        My Applications
                    </NavLink>
                    <NavLink
                        to="/userDashboard/myReviews"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 text-blue-600 border-b-2 border-blue-600"
                                : "px-4 py-2 text-gray-500 hover:text-blue-600"
                        }
                    >
                        My Reviews
                    </NavLink>
                </div>

                {/* Home Button */}
                <NavLink
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-blue-600"
                >
                    <FaHome className="text-lg" />
                    <span>Home</span>
                </NavLink>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl p-6 shadow">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;
