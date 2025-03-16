import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import bgImg from '../../assets/bg-img.jpg';
import { FaGoogleScholar } from "react-icons/fa6";

const Banner = () => {
    return (
        <div>
            {/* bg-image with text */}
            <div
                className="relative text-center text-white py-16 px-4 min-h-[85vh] bg-fixed flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content - Centered */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <p className="flex gap-2 items-center text-lg md:text-xl">
                        <FaGoogleScholar className="text-3xl" /> Knowledge meets innovation
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2">
                        Inspiring Minds <br /> Shaping Futures
                    </h2>
                </div>
            </div>

            {/* Slider */}
            <div className="w-full my-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    className="w-full h-[400px]"
                >
                    <SwiperSlide>
                        <div className="h-full flex items-center justify-center bg-blue-500 text-white text-2xl font-bold">
                            Explore Top Scholarships Worldwide!
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="h-full flex items-center justify-center bg-green-500 text-white text-2xl font-bold">
                            Apply for Scholarships with Ease
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="h-full flex items-center justify-center bg-purple-500 text-white text-2xl font-bold">
                            Your Future Starts Here 🚀
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
