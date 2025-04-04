import React from "react";
import certificateImg from "../../assets/certificate.jpg";
import { Link } from "react-router-dom";

const CertificateSection = () => {
    return (
        <section className="w-full py-16 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                {/* Left - Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src={certificateImg}
                        alt="Graduate Holding Certificate"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right - Text */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Achieve Your Dreams with Scholarships
                    </h2>
                    <p className="mt-4 text-gray-700">
                        DreamScholar helps you find and apply for scholarships that match your
                        academic goals. Secure your future with the right funding opportunities.
                    </p>
                    <Link to='/scholarships'>
                        <button className="mt-6 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-secondary transition-all">
                            Explore Scholarships
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;
