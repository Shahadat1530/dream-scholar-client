import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: scholarships = [], isLoading, refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholar');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center text-blue-500">Loading scholarships...</p>;
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/scholar/${id}`).then(() => {
                    refetch();
                    Swal.fire('Deleted!', 'The scholarship has been deleted.', 'success');
                });
            }
        });
    };

    const handleEdit = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsEditModalOpen(true);
        reset(scholarship);
    };

    const handleSaveEdit = async (data) => {
        await axiosSecure.patch(`/scholar/${selectedScholarship._id}`, data);
        refetch();
        setIsEditModalOpen(false);
        Swal.fire('Updated!', 'Scholarship has been updated.', 'success');
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto bg-gray-200 shadow-md rounded-lg">
            <Helmet>
                <title>Manage Scholarships</title>
            </Helmet>
            <h2 className="text-2xl text-primary font-bold mb-4 text-center">Manage Scholarships</h2>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 mt-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Scholarship Name</th>
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">University</th>
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Category</th>
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Degree</th>
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Application Fees</th>
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Actions</th>
                            <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map(scholarship => (
                            <tr key={scholarship._id} className="text-sm md:text-base">
                                <td className="border px-2 md:px-4 py-2">{scholarship.scholarshipName}</td>
                                <td className="border px-2 md:px-4 py-2">{scholarship.universityName}</td>
                                <td className="border px-2 md:px-4 py-2">{scholarship.subjectCategory}</td>
                                <td className="border px-2 md:px-4 py-2">{scholarship.scholarshipCategory}</td>
                                <td className="border px-2 md:px-4 py-2">${scholarship.applicationFees}</td>
                                <td className="border px-2 md:px-4 py-2 flex flex-col md:flex-row gap-1">
                                    <Link to={`/scholarships/details/${scholarship._id}`}
                                        className="bg-secondary  hover:bg-accent text-white px-2 py-1 rounded text-center"
                                    >Details</Link>
                                    <button className="bg-accent hover:bg-secondary text-white px-2 py-1 rounded" onClick={() => handleEdit(scholarship)}>Edit</button>
                                </td>
                                <td className="border px-2 md:px-4 py-2">
                                    <button className="bg-red-500 hover:bg-primary text-white px-2 py-1 rounded w-full md:w-auto" onClick={() => handleDelete(scholarship._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm md:max-w-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Scholarship</h2>
                        <form onSubmit={handleSubmit(handleSaveEdit)}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Scholarship Name</label>
                                <input type="text" {...register('scholarshipName', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                {errors.scholarshipName && <span className="text-red-500">Required</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">University Name</label>
                                <input type="text" {...register('universityName', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                {errors.universityName && <span className="text-red-500">Required</span>}
                            </div>

                            <div className="mt-4 flex flex-col md:flex-row justify-between gap-2">
                                <button type="submit" className="bg-accent text-white px-4 py-2 rounded-md w-full md:w-auto">Update</button>
                                <button type="button" className="btn-outline text-accent hover:bg-primary px-4 py-2 rounded-md w-full md:w-auto" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageScholarships;
