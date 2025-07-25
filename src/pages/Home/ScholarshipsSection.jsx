import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ScholarCard from "../../components/ScholarCard";

const ScholarshipsSection = () => {
    const [scholarships, setScholarships] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/scholar/top')
            .then(response => {
                setScholarships(response.data);
            })
            .catch(err => {
                console.error("Error fetching top scholarships:", err);
            });
    }, []);

    return (
        <section className="max-w-screen-xl mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
                        Top Scholarships
                    </h2>
                    <p class="text-xl text-slate-600">Discover the most popular scholarship opportunities</p>
                </div>
                <div className="text-center mt-8">
                    <Link
                        to="/scholarships"
                        className="inline-block bg-white px-6 py-2 font-semibold hover:bg-slate-50 transition-all duration-300 border rounded-xl"
                    >
                        View All
                    </Link>
                </div>
            </div>

            {scholarships.length === 0 ? (
                <p className="text-red-600 text-lg font-semibold text-center">No Scholarships Available</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scholarships.map((scholarship) => (
                            <ScholarCard key={scholarship._id} scholarship={scholarship} />
                        ))}
                    </div>


                </>
            )}
        </section>
    );
};

export default ScholarshipsSection;
