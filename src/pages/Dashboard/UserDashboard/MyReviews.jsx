import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/reviews?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center text-blue-500">Loading reviews...</p>;
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Your review has been removed.", "success");
                        }
                    });
            }
        });
    };

    const handleEdit = (review) => {
        Swal.fire({
            title: "Edit Review",
            html: `
            <label class="block text-left text-sm font-medium mb-1">Rating (1-5)</label>
            <input id="ratingInput" type="number" min="1" max="5" value="${review.rating}" class="swal2-input" />

            <label class="block text-left text-sm font-medium mb-1 mt-4">Comment</label>
            <textarea id="commentInput" class="swal2-textarea" rows="4">${review.comment}</textarea>
        `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Save",
            preConfirm: () => {
                const rating = document.getElementById('ratingInput').value;
                const comment = document.getElementById('commentInput').value;

                if (!rating || rating < 1 || rating > 5 || !comment.trim()) {
                    Swal.showValidationMessage("Please enter a valid rating (1-5) and a comment.");
                    return;
                }

                return { rating, comment };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedReview = {
                    rating: result.value.rating,
                    comment: result.value.comment,
                    date: new Date().toISOString().split("T")[0]
                };

                const res = await axiosSecure.patch(`/reviews/${review._id}`, updatedReview);
                if (res.data.modifiedCount > 0) {
                    await refetch();
                    Swal.fire("Updated!", "Your review has been updated.", "success");
                } else {
                    Swal.fire("No changes", "Your review was not updated.", "info");
                }
            }
        });
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-2xl text-primary font-bold text-center mb-6">📝 My Reviews</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg text-xs sm:text-sm md:text-base">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="py-2 px-4">Scholarship</th>
                            <th className="py-2 px-4">University</th>
                            <th className="py-2 px-4">Rating</th>
                            <th className="py-2 px-4">Comment</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-4">
                                    No reviews found.
                                </td>
                            </tr>
                        ) : (
                            reviews.map((review) => (
                                <tr key={review._id} className="border-b">
                                    <td className="py-2 px-4">{review.scholarshipName}</td>
                                    <td className="py-2 px-4">{review.universityName}</td>
                                    <td className="py-2 px-4 text-yellow-500 font-bold">{review.rating} ⭐</td>
                                    <td className="py-2 px-4 break-words">{review.comment}</td>
                                    <td className="py-2 px-4">{review.date}</td>
                                    <td className="py-2 px-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <button onClick={() => handleEdit(review)} className="bg-yellow-500 text-white px-3 py-1 rounded w-full sm:w-auto">Edit</button>
                                        <button onClick={() => handleDelete(review._id)} className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyReviews;