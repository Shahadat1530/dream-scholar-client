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
        <div className="container mx-auto p-4 min-h-screen max-w-screen-xl">
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
                            className="relative shadow-lg rounded-lg overflow-hidden p-4 flex flex-col hover:shadow-xl transition-all duration-300 bg-primary text-white"
                        >
                            <img 
                                src={scholarship?.universityImage} 
                                alt={scholarship?.universityName} 
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="text-lg font-semibold mt-2">{scholarship.scholarshipName}</h3>
                            <p className="text-sm">{scholarship.universityName}</p>
                            <p className="text-sm mb-2">{scholarship.subjectCategory}</p>
                            
                            {/* Details Button */}
                            <Link to={`details/${scholarship._id}`}
                                className="mt-2 bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 block text-center"
                            >
                                Details
                            </Link>
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
