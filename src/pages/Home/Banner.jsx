import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import bgImg from '../../assets/bg-img.jpg';
import slide1Img from '../../assets/slide1.png'
import slide2Img from '../../assets/slide2.jpg';
import slide3Img from '../../assets/slide3.jpg';
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
            <div className="w-full my-5">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    className="w-full h-[600px]"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="h-full flex items-center bg-primary shadow-md rounded-lg text-white overflow-hidden">
                            <img src={slide1Img} alt="Scholarship 1" className="w-1/2 h-full object-cover" />
                            <div className="w-1/2 p-6 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold">Explore Top Scholarships Worldwide!</h3>
                                <p className="mt-2">Find and apply for the best scholarships that match your academic interests.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div className="h-full flex items-center bg-secondary text-white shadow-md rounded-lg overflow-hidden">
                            <img src={slide2Img} alt="Scholarship 2" className="w-1/2 h-full object-cover" />
                            <div className="w-1/2 p-6 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold">Apply for Scholarships with Ease</h3>
                                <p className="mt-2">Streamlined application process to help you secure funding for your education.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide>
                        <div className="h-full flex items-center bg-accent text-white shadow-md rounded-lg overflow-hidden">
                            <img src={slide3Img} alt="Scholarship 3" className="w-1/2 h-full object-cover" />
                            <div className="w-1/2 p-6 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold">Your Future Starts Here 🚀</h3>
                                <p className="mt-2">Take the first step towards a bright future with DreamScholar.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
