import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CgDetailsMore } from "react-icons/cg";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";

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
                                    ><CgDetailsMore /></Link>
                                    <button className="bg-accent hover:bg-secondary text-white px-2 py-1 rounded" onClick={() => handleEdit(scholarship)}><MdEditDocument /></button>
                                </td>
                                <td className="border px-2 md:px-4 py-2">
                                    <button className="bg-red-500 hover:bg-primary text-white px-2 py-1 rounded w-full md:w-auto" onClick={() => handleDelete(scholarship._id)}><MdDeleteForever /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded shadow-lg w-full max-w-lg max-h-screen overflow-y-auto p-6 m-4">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Scholarship</h2>
                        <form onSubmit={handleSubmit(handleSaveEdit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Scholarship Name</label>
                                <input {...register('scholarshipName', { required: true })} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">University Name</label>
                                <input {...register('universityName', { required: true })} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">University Country</label>
                                <input {...register('universityCountry')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">University City</label>
                                <input {...register('universityCity')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">University Rank</label>
                                <input type="number" {...register('universityRank')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Subject Category</label>
                                <input {...register('subjectCategory')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Scholarship Category</label>
                                <input {...register('scholarshipCategory')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Tuition Fees</label>
                                <input type="number" {...register('tuitionFees')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Application Fees</label>
                                <input type="number" {...register('applicationFees')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Service Charge</label>
                                <input type="number" {...register('serviceCharge')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Application Deadline</label>
                                <input type="date" {...register('applicationDeadline')} className="input input-bordered w-full" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Scholarship Post Date</label>
                                <input type="date" {...register('scholarshipPostDate')} className="input input-bordered w-full" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium">Posted Email</label>
                                <input readOnly type="email" {...register('postedEmail')} className="input input-bordered w-full" />
                            </div>

                            <div className="md:col-span-2 flex flex-col md:flex-row justify-end items-center gap-4 pt-2">
                                <button type="submit" className="bg-accent text-white px-4 py-2 rounded-md w-full md:w-auto">Update</button>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-outline text-accent px-4 py-2 rounded-md w-full md:w-auto">Cancel</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageScholarships;
