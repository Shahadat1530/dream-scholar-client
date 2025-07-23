import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedApp, setSelectedApp] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ['scholarApplied', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/scholarApplied?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <p className="text-center text-lg mt-4 text-blue-500 animate-pulse">
                        Loading applications...
                    </p>
                </div>
            </div>
        );
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/scholarApplied/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your application has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    const openReviewModal = (app) => {
        setSelectedApp(app);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setSelectedApp(null);
        setIsReviewModalOpen(false);
    };

    const onSubmitReview = async (data) => {
        const reviewData = {
            rating: data?.rating,
            comment: data?.comment,
            date: new Date().toISOString().split('T')[0],
            scholarshipName: selectedApp?.scholarshipName,
            universityName: selectedApp?.university,
            universityId: selectedApp?.scholarShipId,
            userName: user?.displayName,
            userImage: user?.photoURL,
            userEmail: user?.email
        };


        await axiosSecure.post("/reviews", reviewData);
        reset();
        Swal.fire("Success!", "Your review has been submitted.", "success");
        closeReviewModal();

    };


    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-2xl text-primary font-bold text-center mb-6">📄 My Applications</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg text-xs sm:text-sm md:text-base">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="py-2 px-4">University Name</th>
                            <th className="py-2 px-4">Address</th>
                            <th className="py-2 px-4">Feedback</th>
                            <th className="py-2 px-4">Subject</th>
                            <th className="py-2 px-4">Degree</th>
                            <th className="py-2 px-4">Fees</th>
                            <th className="py-2 px-4">Service Charge</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                            <th className="py-2 px-4">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center text-gray-500 py-4">
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app?._id} className="border-b">
                                    <td className="py-2 px-4">{app?.university}</td>
                                    <td className="py-2 px-4">{app?.address}</td>
                                    <td className="p-3 text-gray-600 italic">
                                        {app?.feedback
                                            ? app?.feedback
                                            : app?.applicationStatus === 'pending'
                                                ? 'Waiting for document verification!'
                                                : app?.applicationStatus === 'processing'
                                                    ? 'Application under review by admissions committee.'
                                                    : app?.applicationStatus === 'completed'
                                                        ? 'Congratulations! You have been selected for the scholarship.'
                                                        : 'N/A'}
                                    </td>
                                    <td className="py-2 px-4">{app?.subject}</td>
                                    <td className="py-2 px-4">{app?.degree}</td>
                                    <td className="py-2 px-4">${app?.applicationFees}</td>
                                    <td className="py-2 px-4">${app?.serviceCharge}</td>
                                    <td className={`py-2 px-4 font-bold ${app?.applicationStatus === "pending" ? "text-yellow-500" : app?.applicationStatus === "Completed" ? "text-green-500" : app?.applicationStatus === "Rejected" ? "text-red-500" : "text-blue-500"}`}>
                                        {app?.applicationStatus}
                                    </td>
                                    <td className="py-2 px-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <Link to={`/scholarships/details/${app?.scholarShipId}`} className="btn bg-blue-500 text-white px-3 py-1 rounded w-full sm:w-auto">Details</Link>
                                        {
                                            app?.applicationStatus === "pending" ? (
                                                <Link to={`/userDashboard/editApplication/${app?._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded w-full sm:w-auto">
                                                    Edit
                                                </Link>
                                            ) : (
                                                <button disabled className="bg-gray-400 text-white px-3 py-1 rounded w-full sm:w-auto cursor-not-allowed">
                                                    Edit
                                                </button>
                                            )
                                        }
                                        <button onClick={() => handleDelete(app?._id)} className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto">Cancel</button>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => openReviewModal(app)} className="bg-green-500 text-white px-3 py-1 rounded w-full sm:w-auto">Review</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {isReviewModalOpen && selectedApp && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
                    <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96">
                        <h2 className="text-xl font-bold mb-4 text-center">Submit Review for {selectedApp?.university}</h2>
                        <form onSubmit={handleSubmit(onSubmitReview)}>
                            <label className="block mb-2">Rating:</label>
                            <input type="number" min="1" max="5" {...register("rating")} className="w-full p-2 border rounded mb-4" required />

                            <label className="block mb-2">Review Comment:</label>
                            <textarea {...register("comment")} className="w-full p-2 border rounded mb-4" placeholder="Write your review..." required></textarea>

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <button type="button" onClick={closeReviewModal} className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto">Cancel</button>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default MyApplications;
