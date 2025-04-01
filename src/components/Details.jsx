import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Details = () => {
    const scholarship = useLoaderData();

    return (
        <div className="container mx-auto p-6">
            {/* Title */}
            <h2 className="text-3xl font-bold text-accent mb-6">{scholarship.scholarshipName} Scholarship Details</h2>

            {/* Scholarship Card */}
            <div className="p-6 rounded-lg shadow-lg bg-primary text-white flex flex-col">
                {/* Image */}
                <div className="w-full mb-4">
                    <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-full h-auto lg:h-96 object-cover rounded-md" />
                </div>

                {/* Scholarship Details */}
                <p><strong>University:</strong> {scholarship.universityName}</p>
                <p><strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}</p>
                <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
                <p><strong>Deadline:</strong> {scholarship.applicationDeadline}</p>
                <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
                <p><strong>Stipend:</strong> {scholarship.stipend || "Not available"}</p>
                <p><strong>Post Date:</strong> {scholarship.scholarshipPostDate}</p>
                <p><strong>Service Charge:</strong> ${scholarship.serviceCharge}</p>
                <p className="mb-4"><strong>Application Fee:</strong> ${scholarship.applicationFees}</p>

                {/* Apply Button */}
                <Link
                    to={`/applicationForm/${scholarship._id}`}
                    className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 text-center mt-auto"
                >
                    Apply for Scholarship
                </Link>
            </div>
        </div>
    );
};

export default Details;
