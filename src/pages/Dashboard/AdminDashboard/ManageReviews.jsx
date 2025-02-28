import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
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

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">📝 All Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-500">No reviews found.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
                            {/* Reviewer Image */}
                            <img
                                src={review.userImage || "https://i.ibb.co/4pDNDk1/default-avatar.png"}
                                alt="Reviewer"
                                className="w-16 h-16 rounded-full mx-auto mb-3"
                            />
                            <h3 className="text-lg font-semibold">{review.userName}</h3>
                            <p className="text-gray-500 text-sm">{review.date}</p>
                            <hr className="my-2" />

                            <p className="font-bold">{review.universityName}</p>
                            <p className="text-sm text-gray-600">🎓 {review.scholarshipName}</p>
                            <p className="text-sm">📚 {review.subjectCategory}</p>
                            <p className="text-yellow-500 font-bold mt-1">{review.rating} ⭐</p>
                            <p className="mt-2 text-gray-700">{review.comment}</p>

                            <div className="flex justify-end mt-3 space-x-2">
                                <button onClick={() => handleDelete(review._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageReviews;
