import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
    return (
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
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="h-full flex items-center justify-center bg-blue-500 text-white text-2xl font-bold">
                        Explore Top Scholarships Worldwide!
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="h-full flex items-center justify-center bg-green-500 text-white text-2xl font-bold">
                        Apply for Scholarships with Ease
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="h-full flex items-center justify-center bg-purple-500 text-white text-2xl font-bold">
                        Your Future Starts Here 🚀
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
