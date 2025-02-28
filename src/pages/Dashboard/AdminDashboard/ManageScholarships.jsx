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
                        <th className="border px-4 py-2">Cancel</th>
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
                                <Link to={`/scholarships/details/${scholarship._id}`}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >Details</Link>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(scholarship)}>Edit</button>
                            </td>
                            <td className='px-2'>
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(scholarship._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Scholarship</h2>
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject Category</label>
                                <select {...register('subjectCategory', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="" disabled>Select Subject</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                                {errors.subjectCategory && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Scholarship Category</label>
                                <select {...register('scholarshipCategory', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="" disabled>Select Scholarship Type</option>
                                    <option value="Full fund">Full fund</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Self-fund">Self-fund</option>
                                </select>
                                {errors.scholarshipCategory && <span className="text-red-500">This field is required</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Application Fees</label>
                                <input type="number" {...register('applicationFees', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                {errors.applicationFees && <span className="text-red-500">Required</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Service Charge</label>
                                <input type="number" {...register('serviceCharge', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                {errors.serviceCharge && <span className="text-red-500">Required</span>}
                            </div>

                            <div className="mt-4 flex justify-between">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageScholarships;
