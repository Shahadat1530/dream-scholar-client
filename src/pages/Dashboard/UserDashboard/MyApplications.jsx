import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/scholarApplied?email=${user?.email}`)
                .then((res) => {
                    setApplications(res.data);
                    setLoading(false);
                })
        }
    }, [user?.email]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-center text-lg mt-4 text-blue-500 animate-pulse">
                    Loading applications...
                </p>
            </div>
        </div>
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">📄 My Applications</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-2 px-4">University Name</th>
                            <th className="py-2 px-4">Address</th>
                            <th className="py-2 px-4">Feedback</th>
                            <th className="py-2 px-4">Subject</th>
                            <th className="py-2 px-4">Degree</th>
                            {/* <th className="py-2 px-4">Fees</th>
                            <th className="py-2 px-4">Service Charge</th> */}
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id} className="border-b">
                                <td className="py-2 px-4">{app.university}</td>
                                <td className="py-2 px-4">{app.address}</td>
                                <td className="py-2 px-4">{app.feedback || "No feedback"}</td>
                                <td className="py-2 px-4">{app.subject}</td>
                                <td className="py-2 px-4">{app.degree}</td>
                                {/* <td className="py-2 px-4">${app.application_fees}</td>
                                <td className="py-2 px-4">${app.service_charge}</td> */}
                                <td
                                    className={`py-2 px-4 font-bold ${app.applicationStatus === "pending"
                                        ? "text-yellow-500"
                                        : app.status === "Completed"
                                            ? "text-green-500"
                                            : app.status === "Rejected"
                                                ? "text-red-500"
                                                : "text-blue-500"
                                        }`}
                                >
                                    {app.applicationStatus}
                                </td>
                                <td className="py-2 px-4 space-x-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Details</button>
                                    {app.applicationStatus === "Pending" && (
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                    )}
                                    <button className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
