import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Details = () => {
    const scholarship = useLoaderData();

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold">{scholarship.scholarshipName} Scholarship Details</h2>
            <div className="mt-4 border p-4 rounded-lg shadow-lg">
                <img src={scholarship.universityImage} alt={scholarship.university} className="w-full h-40 object-cover rounded-md" />
                <p><strong>University:</strong> {scholarship.universityName}</p>
                <p><strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}</p>
                <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
                <p><strong>Deadline:</strong> {scholarship.applicationDeadline}</p>
                <p><strong>Subject:</strong> {scholarship.subjectCategory}</p>
                <p><strong>Stipend:</strong> {scholarship.stipend || "Not available"}</p>
                <p><strong>Post Date:</strong> {scholarship.scholarshipPostDate}</p>
                <p><strong>Service Charge:</strong> {scholarship.serviceCharge}</p>
                <p className="mb-4"><strong>Application Fee:</strong> {scholarship.applicationFees}</p>
                <Link to={`/applicationForm/${scholarship._id}`} className="bg-green-500 text-white p-2 rounded-md mt-4">Apply Scholarship</Link>
            </div>

            {/* Reviews Slider */}
            {/* <div className="mt-8">
                <h3 className="text-2xl font-semibold">Reviews</h3>
                <Slider {...settings}>
                    {scholarship.reviews.map((review, index) => (
                        <div key={index} className="border p-4 rounded-md shadow-md text-center">
                            <img src={review.reviewerImage} alt={review.reviewerName} className="w-16 h-16 rounded-full mx-auto" />
                            <p className="font-bold">{review.reviewerName}</p>
                            <p className="text-sm text-gray-600">{review.date}</p>
                            <p className="text-yellow-500">Rating: {review.rating}/5</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </Slider>
            </div> */}

        </div>
    );
};

export default Details;
