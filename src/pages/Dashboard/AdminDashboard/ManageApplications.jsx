import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaCommentDots, FaTimesCircle } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [feedbackModal, setFeedbackModal] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ['scholarApplied'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarApplied');
            return res.data;
        }
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosSecure.put(`/scholarApplied/${id}`, {
                applicationStatus: newStatus,
            });
            if (res.data?.result?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated',
                    text: `Status changed to "${newStatus}"`,
                    timer: 1500,
                    showConfirmButton: false
                });
                refetch();
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update status',
            });
        }
    };

    const handleFeedbackSubmit = async () => {
        if (!feedbackText.trim()) return;

        try {
            const res = await axiosSecure.put(`/scholarApplied/${feedbackModal._id}`, {
                feedback: feedbackText,
                applicationStatus: 'rejected' // Set to rejected
            });

            if (res.data?.result?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Feedback Submitted',
                    text: 'Application has been rejected with feedback.',
                    timer: 1500,
                    showConfirmButton: false
                });
                setFeedbackModal(null);
                setFeedbackText('');
                refetch();
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to submit feedback.',
            });
        }
    };

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
                            <tr key={app._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{app.userName || 'N/A'}</td>
                                <td className="p-3">{app.userEmail}</td>
                                <td className="p-3">{app.scholarshipName}</td>
                                <td className="p-3">{app.university}</td>
                                <td className="p-3">
                                    ${(app.applicationFees || 0) + (app.serviceCharge || 0)}
                                </td>
                                <td className="p-3 capitalize">
                                    <select
                                        value={app?.applicationStatus}
                                        onChange={(e) =>
                                            handleStatusChange(app?._id, e.target.value)
                                        }
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                                <td className="p-3 flex flex-wrap gap-2 justify-center">
                                    <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1">
                                        <FaEye /> Details
                                    </button>
                                    <button
                                        onClick={() => setFeedbackModal(app)}
                                        className="btn btn-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1"
                                    >
                                        <FaCommentDots /> Feedback
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Feedback Modal */}
            {feedbackModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold mb-2">
                            Submit Feedback for {feedbackModal.userName}
                        </h3>
                        <textarea
                            className="w-full border rounded p-2 mb-4"
                            rows="4"
                            placeholder="Write feedback here..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setFeedbackModal(null);
                                    setFeedbackText('');
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFeedbackSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageApplications;
