import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ScholarshipsSection = () => {
    const [scholarships, setScholarships] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/scholar')
            .then(response => {
                const sortedData = response.data
                    .sort((a, b) => new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate) && a.universityRank - b.universityRank)
                    .slice(0, 6);

                setScholarships(sortedData);
            });
    }, []);

    return (
        <section className="max-w-screen-xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#b91c1c]">
                Latest Scholarships
            </h2>

            {scholarships.length === 0 ? (
                <div className="text-center py-10">No scholarships available</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((scholarship) => (
                        <div
                            key={scholarship._id}
                            className="relative shadow-lg rounded-lg overflow-hidden p-4 flex flex-col"
                            style={{
                                background: "linear-gradient(to top, #b91c1c, #bffcfc)",
                            }}
                        >
                            {/* Image with spacing */}
                            <div className="bg-white p-2 rounded-lg">
                                <img
                                    src={scholarship.universityImage}
                                    alt={scholarship.universityName}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>

                            {/* Scholarship details */}
                            <div className="p-4 text-white flex-grow">
                                <h3
                                    className="text-xl font-bold bg-gradient-to-r from-black to-[#773aca] bg-clip-text text-transparent"
                                >
                                    {scholarship.scholarshipName}
                                </h3>
                                <p className="text-sm">{scholarship.universityName} ({scholarship.universityCountry})</p>
                                <p className="text-sm">Rank: <span className="font-semibold">{scholarship.universityRank}</span></p>
                                <p className="text-sm">Subject: <span className="font-semibold">{scholarship.subjectCategory}</span></p>
                                <p className="text-sm">Category: <span className="font-semibold">{scholarship.scholarshipCategory}</span></p>
                                <p className="font-semibold ">Tuition Fees: ${scholarship.tuitionFees}</p>
                            </div>

                            {/* Button at bottom */}
                            <div className="mt-auto">
                                <Link
                                    to={`/scholarships/details/${scholarship._id}`}
                                    className="block text-center bg-white text-[#b91c1c] py-2 rounded-md font-semibold hover:bg-gray-200"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ScholarshipsSection;
