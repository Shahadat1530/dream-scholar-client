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
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Latest Scholarships
            </h2>

            {scholarships.length === 0 ? (
                <div className="text-center py-10 text-white">No scholarships available</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((scholarship) => (
                        <div key={scholarship._id} 
                             className="relative group shadow-lg rounded-lg overflow-hidden bg-primary text-white transition-all duration-300 border-b-4 border-accent">

                            {/* Image - Default View */}
                            <img 
                                src={scholarship.universityImage} 
                                alt={scholarship.universityName} 
                                className="w-full h-52 object-cover rounded-lg transition-all duration-300 group-hover:brightness-50"
                            />

                            {/* Scholarship Details - Shown on Hover */}
                            <div className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col p-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                                <h3 className="text-xl font-bold">{scholarship.scholarshipName}</h3>
                                <p className="text-sm">{scholarship.universityName} ({scholarship.universityCountry})</p>
                                <p className="text-sm">Rank: <span className="font-semibold">{scholarship.universityRank}</span></p>
                                <p className="text-sm">Subject: <span className="font-semibold">{scholarship.subjectCategory}</span></p>
                                <p className="text-sm">Category: <span className="font-semibold">{scholarship.scholarshipCategory}</span></p>
                                <p className="font-semibold">Tuition Fees: ${scholarship.tuitionFees}</p>

                                {/* View Details Button */}
                                <Link to={`/scholarships/details/${scholarship._id}`}
                                    className="mt-4 bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-300">
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
