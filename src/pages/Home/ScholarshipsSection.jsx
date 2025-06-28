import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ScholarshipsSection = () => {
    const [scholarships, setScholarships] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/scholar/top')
            .then(response => {
                console.log(response.data);
                setScholarships(response.data);
            })
            .catch(err => {
                console.error("Error fetching top scholarships:", err);
            });
    }, []);

    return (
        <section className="max-w-screen-xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Top Scholarships
            </h2>

            {scholarships.length === 0 ? (
                <div className="text-center py-10 text-black">
                    No scholarships available
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scholarships.map((scholarship) => (
                            <div
                                key={scholarship._id}
                                className="relative group shadow-lg rounded-lg overflow-hidden bg-primary text-white transition-all duration-300 border-b-4 border-accent"
                            >
                                <img
                                    src={scholarship.universityImage}
                                    alt={scholarship.universityName}
                                    className="w-full h-52 object-cover rounded-lg transition-all duration-300 group-hover:brightness-50"
                                />
                                <div className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col p-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                                    <h3 className="text-xl font-bold">{scholarship.scholarshipName}</h3>
                                    <p className="text-sm">{scholarship.universityName} ({scholarship.universityCountry})</p>
                                    <p className="text-sm">Rank: <span className="font-semibold">{scholarship.universityRank}</span></p>
                                    <p className="text-sm">Subject: <span className="font-semibold">{scholarship.subjectCategory}</span></p>
                                    <p className="text-sm">Category: <span className="font-semibold">{scholarship.scholarshipCategory}</span></p>
                                    <p className="font-semibold">Application Fees: ${scholarship.applicationFees}</p>
                                    <p className="font-semibold">Tuition Fees: ${scholarship.tuitionFees}</p>
                                    <Link
                                        to={`/scholarships/details/${scholarship._id}`}
                                        className="mt-4 bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* See All Button */}
                    <div className="text-center mt-8">
                        <Link
                            to="/scholarships"
                            className="inline-block bg-accent text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-300"
                        >
                            See All Scholarships
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
};

export default ScholarshipsSection;
