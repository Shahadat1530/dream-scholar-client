import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaCommentDots, FaTimesCircle } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['scholarApplied'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarApplied');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Applied Scholarships</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm rounded-lg bg-white shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">#</th>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Scholarship</th>
                            <th className="p-3">University</th>
                            <th className="p-3">Fees (Total)</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{app.userName || 'N/A'}</td>
                                <td className="p-3">{app.userEmail}</td>
                                <td className="p-3">{app.scholarshipName}</td>
                                <td className="p-3">{app.university}</td>
                                <td className="p-3">${(app.applicationFees || 0) + (app.serviceCharge || 0)}</td>
                                <td className="p-3 capitalize text-blue-600 font-medium">{app.applicationStatus}</td>
                                <td className="p-3 flex flex-wrap gap-2 justify-center">
                                    <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1">
                                        <FaEye /> Details
                                    </button>
                                    <button className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1">
                                        <FaCommentDots /> Feedback
                                    </button>
                                    <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center gap-1">
                                        <FaTimesCircle /> Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageApplications;
