import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();
    return (
        <div className='space-y-4'>
            <img src={user?.photoURL} alt=""  className='w-64 rounded-tr-full'/>
            <h3 className="text-3xl font-bold">Name: {user?.displayName}</h3>
            {
                user && user?.role ? <p>Role: {user?.role}</p> : ''
            }
        </div>
    );
};

export default MyProfile;