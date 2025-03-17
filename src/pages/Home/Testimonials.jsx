import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        review: "This platform has truly transformed my career. Highly recommended!",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: 2,
        name: "Jane Smith",
        review: "A fantastic experience! The application process was efficient.",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: 3,
        name: "Emily Johnson",
        review: "I secured my dream scholarship thanks to this amazing service!",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        id: 4,
        name: "Michael Brown",
        review: "I love the support and guidance provided. The team is fantastic!",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        id: 5,
        name: "Sarah Wilson",
        review: "Smooth process and very user-friendly! Would highly recommend.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        id: 6,
        name: "David Martinez",
        review: "Absolutely love the services provided. 5 stars!",
        image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        id: 7,
        name: "Sophia Lee",
        review: "A great experience overall. Found my ideal scholarship hassle-free!",
        image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        id: 8,
        name: "Daniel Carter",
        review: "The entire process was so easy and straightforward. Thank you!",
        image: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
        id: 9,
        name: "Olivia White",
        review: "Highly recommend to anyone looking for educational opportunities!",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
        id: 10,
        name: "Liam Anderson",
        review: "Great platform with excellent support. 10/10 experience!",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
    },
];

const Testimonials = () => {
    return (
        <div className="py-10">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-[#b91c1c]">What Our Users Say</h2>
                <p className="text-gray-600">Hear from students who found success with us</p>
            </div>
            <div className="max-w-4xl mx-auto px-4">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    className="pb-10"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id} className="p-4">
                            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-3"
                                />
                                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                                <p className="text-gray-600 mt-2">"{testimonial.review}"</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
