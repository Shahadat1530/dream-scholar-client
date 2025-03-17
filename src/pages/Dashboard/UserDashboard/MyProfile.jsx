import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#b91c1c] to-black h-24"></div>

            {/* Profile Section */}
            <div className="flex flex-col items-center -mt-12">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-24 h-24 border-4 border-white rounded-full"
                />
                <h3 className="text-xl font-bold mt-2">{user?.displayName || "User Name"}</h3>
                <p className="text-gray-600">{user?.email || "user@example.com"}</p>

                {/* Membership Badge */}
                <div className="mt-2 bg-yellow-400 text-sm text-white px-3 py-1 rounded-full flex items-center">
                    <span className="mr-1">🏅</span> Bronze Member
                </div>
            </div>

            {/* Details Section */}
            <div className="p-6">


                {/* Recent Activity */}
                <div className="mt-4">
                    <h4 className="text-lg font-semibold">Recent Activity</h4>
                    <p className="text-gray-500 text-sm">No recent activity</p>
                </div>

                {/* Membership Benefits */}
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold">Membership Benefits</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                        <div>
                            <p className="text-gray-600">Current Plan</p>
                            <p className="font-medium">Bronze Membership</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Features</p>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Standard support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
