import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScholarCard from "../../components/ScholarCard";

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/scholar')
            .then(res => setScholarships(res.data));
    }, []);

    const filteredScholarships = scholarships.filter(scholarship =>
        scholarship?.scholarshipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship?.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship?.subjectCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 min-h-[85vh] max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
            <Helmet>
                <title>Scholarships</title>
            </Helmet>
            <div className="mb-7">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">All Scholarships</h1>
                <p className="text-xl text-slate-600">Discover scholarship opportunities from top universities worldwide!!!</p>
            </div>
            {/* Search Bar */}
            <div className="mb-4 flex">
                <div className="mb-4 relative w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search by Scholarship, University, or Degree..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border pl-10 pr-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Scholarship Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.length > 0 ? (
                    filteredScholarships.map(scholarship => (
                        <ScholarCard key={scholarship?._id} scholarship={scholarship} />
                    ))
                ) : (
                    <div className="text-center col-span-3">
                        <p className="text-red-600 text-lg font-semibold">No Scholarships Available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarships;
