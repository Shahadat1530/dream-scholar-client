import React from "react";

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={review.userImage || "https://i.ibb.co/MBtjqXQ/default-avatar.png"}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                </div>
            </div>
            <p className="text-gray-800 mb-2">Rating: {review.rating || "N/A"} ⭐</p>
            <p className="text-gray-700 italic">"{review.comment}"</p>
        </div>
    );
};
export default ReviewCard;
