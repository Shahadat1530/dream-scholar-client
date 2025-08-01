import React from "react";
import { Link } from "react-router-dom";

const ScholarCard = ({ scholarship }) => {
    return (
        <div className="bg-white border rounded-2xl shadow p-5 space-y-3 hover:shadow-lg transition-shadow">

            <div className="flex items-center gap-3">
                <img
                    src={scholarship?.universityImage}
                    alt={scholarship?.universityName}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold">{scholarship?.universityName}</h3>
                    <p className="text-sm text-gray-500">{scholarship?.scholarshipName}</p>
                </div>
            </div>

            <span className="inline-block bg-purple-100 text-xs font-semibold px-3 py-1 rounded-full">
                {scholarship?.subjectCategory}
            </span>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-600">Amount</p>
                    <p className="text-green-600 font-semibold">
                        ${scholarship?.tuitionFees}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-600">Deadline</p>
                    <p className="font-medium text-slate-900">
                        {scholarship?.applicationDeadline}
                    </p>
                </div>
                <div className="flex justify-between items-center gap-1">
                    <p className="text-gray-500">Rating</p>
                    <p className="font-medium"><span className="text-yellow-500 text-lg">★</span> {scholarship?.rating || "4.8"}</p>
                </div>
            </div>

            {/* View Details Button */}
            <Link
                to={`/scholarships/details/${scholarship?._id}`}
                className="block text-center mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
            >
                View Details
            </Link>
        </div>
    );
};

export default ScholarCard;
