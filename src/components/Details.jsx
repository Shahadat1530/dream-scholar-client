import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../pages/hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ReviewCard from "./ReviewCard";
import Swal from "sweetalert2";

const Details = () => {
    const scholarship = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (scholarship?._id) {
            axiosPublic.get(`/reviews?universityId=${scholarship?._id}`)
                .then(res => {
                    setReviews(res.data);
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err
                    });
                } );
}
    }, [scholarship?._id]);

return (
    <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-accent mb-6">{scholarship?.scholarshipName} Scholarship Details</h2>

        {/* Scholarship Details */}
        <div className="p-6 rounded-lg shadow-lg bg-primary text-white flex flex-col mb-10">
            <img src={scholarship?.universityImage} alt={scholarship?.universityName} className="w-full h-auto lg:h-96 object-cover rounded-md mb-4" />
            <p><strong>University:</strong> {scholarship?.universityName}</p>
            <p><strong>Location:</strong> {scholarship?.universityCity}, {scholarship?.universityCountry}</p>
            <p><strong>Category:</strong> {scholarship?.scholarshipCategory}</p>
            <p><strong>Deadline:</strong> {scholarship?.applicationDeadline}</p>
            <p><strong>Subject:</strong> {scholarship?.subjectCategory}</p>
            <p><strong>Stipend:</strong> {scholarship?.stipend || "Not available"}</p>
            <p><strong>Post Date:</strong> {scholarship?.scholarshipPostDate}</p>
            <p><strong>Service Charge:</strong> ${scholarship?.serviceCharge}</p>
            <p className="mb-4"><strong>Application Fee:</strong> ${scholarship?.applicationFees}</p>
            <Link
                to={`/payment/${scholarship?._id}`}
                className="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 text-center mt-auto"
            >
                Apply for Scholarship
            </Link>
        </div>

        {/* Review Slider */}
        {reviews.length > 0 && (
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-accent mb-6">User Reviews</h3>
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
                    {reviews.map((review) => (
                        <SwiperSlide key={review._id}>
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
