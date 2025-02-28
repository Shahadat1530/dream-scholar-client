import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();
    const [editingScholarship, setEditingScholarship] = useState(null);

    const { data: scholarships = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholar');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center text-blue-500">Loading reviews...</p>;
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/scholar/${id}`)
                        .then(() => {
                            refetch();
                            Swal.fire('Deleted!', 'The scholarship has been deleted.', 'success');
                        })
                }
            });
    };

    const handleEdit = (scholarship) => {
        setEditingScholarship(scholarship);
        Swal.fire({
            title: "Edit Scholarship",
            html: `<input id="scholarshipName" class="swal2-input" value="${scholarship.scholarshipName}" />`,
            showCancelButton: true,
            confirmButtonText: "Save",
            preConfirm: () => {
                const updatedScholarship = {
                    scholarshipName: document.getElementById("scholarshipName").value,
                };
                return axiosSecure.patch(`/scholar/${scholarship._id}`, updatedScholarship)
                    .then(() => {
                        setScholarships(scholarships.map(s => s._id === scholarship._id ? { ...s, ...updatedScholarship } : s));
                        Swal.fire('Updated!', 'Scholarship has been updated.', 'success');
                    });
            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-200 shadow-md rounded-lg">
            <Helmet>
                <title>Manage Scholarships</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
            <table className="min-w-full bg-white border border-gray-300 mt-6">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Scholarship Name</th>
                        <th className="border px-4 py-2">University</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Degree</th>
                        <th className="border px-4 py-2">Application Fees</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {scholarships.map(scholarship => (
                        <tr key={scholarship._id}>
                            <td className="border px-4 py-2">{scholarship.scholarshipName}</td>
                            <td className="border px-4 py-2">{scholarship.universityName}</td>
                            <td className="border px-4 py-2">{scholarship.subjectCategory}</td>
                            <td className="border px-4 py-2">{scholarship.scholarshipCategory}</td>
                            <td className="border px-4 py-2">${scholarship.applicationFees}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(scholarship)}>Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(scholarship._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageScholarships;
