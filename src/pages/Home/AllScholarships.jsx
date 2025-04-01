import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
        <div className="container mx-auto p-4 min-h-[85vh] max-w-screen-xl">
            <Helmet>
                <title>Scholarships</title>
            </Helmet>

            {/* Search Bar */}
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Search by Scholarship, University, or Degree..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 w-full rounded-md"
                />
                <button className="bg-secondary text-white p-2 ml-2 rounded-md hover:bg-opacity-80">
                    Search
                </button>
            </div>

            {/* Scholarship Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.length > 0 ? (
                    filteredScholarships.map(scholarship => (
                        <div key={scholarship._id}
                            className="relative group shadow-lg rounded-lg overflow-hidden transition-all duration-300 text-white hover:scale-105 border-b-4 border-accent"
                        >
                            {/* Image (Default View) */}
                            <img 
                                src={scholarship?.universityImage} 
                                alt={scholarship?.universityName} 
                                className="w-full h-52 object-cover rounded-lg transition-all duration-300 group-hover:brightness-50"
                            />

                            {/* Scholarship Details (Shown on Hover) */}
                            <div className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col p-4 justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                                <h3 className="text-xl font-bold">{scholarship.scholarshipName}</h3>
                                <p className="text-sm">{scholarship.universityName} ({scholarship.universityCountry})</p>
                                <p className="text-sm">Subject: <span className="font-semibold">{scholarship.subjectCategory}</span></p>
                                <p className="text-sm">Category: <span className="font-semibold">{scholarship.scholarshipCategory}</span></p>
                                <p className="font-semibold">Tuition Fees: ${scholarship.tuitionFees}</p>

                                {/* View Details Button */}
                                <Link to={`details/${scholarship._id}`}
                                    className="mt-4 bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-3">
                        <p className="text-accent text-lg font-semibold">No Scholarships Available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarships;
