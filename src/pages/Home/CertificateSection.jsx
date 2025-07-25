import React from "react";
import certificateImg from "../../assets/certificate.jpg";

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
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Achieve Your Dreams with Scholarships
                    </h2>
                    <p className="mt-4 text-gray-700">
                        <span className="text-blue-600 font-semibold">DreamScholar</span> helps you find and apply for scholarships that match your
                        academic goals. Secure your future with the right funding opportunities.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;
