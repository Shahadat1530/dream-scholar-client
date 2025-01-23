import React from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className='flex bg-gradient-to-r from-green-400 to-lime-700 p-10'>
            <div className='w-64 min-h-screen'>

            </div>
            <div className='flex-1 p-10 bg-white rounded-xl shadow-2xl'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default UserDashboard;