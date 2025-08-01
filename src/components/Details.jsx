import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../pages/hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";
import Swal from "sweetalert2";
import { FaCheckCircle, FaCalendarAlt, FaUserGraduate, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

const Details = () => {
    const scholarship = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (scholarship?._id) {
            axiosPublic
                .get(`/reviews?universityId=${scholarship?._id}`)
                .then((res) => {
                    setReviews(res.data);
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err,
                    });
                });
        }
    }, [scholarship?._id]);

    return (
        <div className="max-w-screen-xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {scholarship?.scholarshipName}
                    </h2>
                    <p className="text-lg text-gray-600 flex items-center gap-2">
                        <FaUniversity /> {scholarship?.universityName} — {scholarship?.universityCity}, {scholarship?.universityCountry}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {scholarship?.subjectCategory}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {scholarship?.scholarshipCategory}
                        </span>
                        <span className="bg-purple-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            Rank: #{scholarship?.universityRank}
                        </span>
                    </div>
                </div>

                <Link
                    to={`/payment/${scholarship?._id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-opacity-90"
                >
                    Apply Now
                </Link>
            </div>

            {/* Grid Section */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <FaUniversity className="text-blue-600" /> Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            The {scholarship?.scholarshipName} is a program offered by {scholarship?.universityName}, aimed to support students pursuing studies in {scholarship?.subjectCategory}. This scholarship covers tuition and may provide additional benefits. It's located in {scholarship?.universityCity}, {scholarship?.universityCountry}.
                        </p>
                    </div>

                    {/* Eligibility */}
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" /> Eligibility Criteria
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            <li>Bachelor's degree in relevant field</li>
                            <li>GPA above 3.0</li>
                            <li>Application before the deadline</li>
                            <li>Strong academic background</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-white p-6 rounded-lg border space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">Quick Information</h3>
                    <p>
                        Scholarship Amount: <strong> <span className="text-green-600">${scholarship?.tuitionFees}</span> </strong>
                    </p>
                    <p>
                        Application Fee:<strong> ${scholarship?.applicationFees} </strong>
                    </p>
                    <p>
                        Service Charge:<strong> ${scholarship?.serviceCharge} </strong>
                    </p>
                    <p>
                        Deadline: <strong><span className="text-red-600">{scholarship?.applicationDeadline}</span> </strong>
                    </p>
                    <p>
                        Posted On: <strong> {scholarship?.scholarshipPostDate} </strong>
                    </p>
                </div>
            </div>

            {/* Reviews */}
            {reviews?.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-blue-600 mb-6">Student Reviews</h3>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {reviews?.map((review) => (
                            <SwiperSlide key={review?._id}>
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Details;
