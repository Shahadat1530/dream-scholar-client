import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/scholar')
            .then(res => setScholarships(res.data))
    }, []);

    const filteredScholarships = scholarships.filter(scholarship =>
        scholarship?.scholarshipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship?.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship?.subjectCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">

            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Search by Scholarship, University, or Degree..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 w-full rounded-md"
                />
                <button className="bg-blue-500 text-white p-2 ml-2 rounded-md">
                    Search
                </button>
            </div>


            <div className="grid md:grid-cols-3 gap-4">
                {filteredScholarships.length > 0 ? (
                    filteredScholarships.map(scholarship => (
                        <div key={scholarship.id} className="border p-4 rounded-md shadow-md">
                            <img src={scholarship?.universityImage} alt={scholarship?.universityName} className="w-full h-40 object-cover rounded-md" />
                            <h3 className="text-lg font-semibold mt-2">{scholarship.scholarshipName}</h3>
                            <p className="text-sm text-gray-600">{scholarship.universityName}</p>
                            <p className="text-sm text-gray-600">{scholarship.subjectCategory}</p>
                            <button
                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
                            >
                                Details
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-3">
                        <p className="text-red-500 text-lg font-semibold">No Scholarships Available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarships;
