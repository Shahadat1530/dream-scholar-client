import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholar = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = { image: data.universityImage[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const addScholar = {
                scholarshipName: data.scholarshipName,
                universityName: data.universityName,
                universityImage: res.data.data.display_url,
                universityCountry: data.universityCountry,
                universityCity: data.universityCity,
                universityRank: parseInt(data.universityRank),
                subjectCategory: data.subjectCategory,
                scholarshipCategory: data.scholarshipCategory,
                tuitionFees: parseInt(data.tuitionFees),
                applicationFees: parseInt(data.applicationFees),
                serviceCharge: parseInt(data.serviceCharge),
                scholarshipPostDate: data.scholarshipPostDate,
                applicationDeadline: data.applicationDeadline,
                postedEmail: user?.email

            };

            const scholarRes = await axiosSecure.post('/scholar', addScholar)
            if (scholarRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Scholarship added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-200 shadow-md rounded-lg">
            <Helmet>
                <title>Add Scholar</title>
            </Helmet>
            <h2 className="text-2xl text-primary text-center font-bold mb-4">Add Scholarship</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Scholarship Name</label>
                    <input
                        type='text'
                        {...register('scholarshipName', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.scholarshipName && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">University Name</label>
                    <input
                        type='text'
                        {...register('universityName', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.universityName && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">University Image/Logo</label>
                    <input
                        type="file"
                        {...register('universityImage', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.universityImage && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">University Country</label>
                    <input
                        type='text'
                        {...register('universityCountry', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.universityCountry && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">University City</label>
                    <input
                        type='text'
                        {...register('universityCity', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.universityCity && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">University World Rank</label>
                    <input
                        type="number"
                        {...register('universityRank', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.universityRank && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Category</label>
                    <select
                        {...register('subjectCategory', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="" disabled>Select Subject</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                    {errors.subjectCategory && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Scholarship Category</label>
                    <select
                        {...register('scholarshipCategory', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="" disabled>Select Scholarship Type</option>
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                    </select>
                    {errors.scholarshipCategory && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tuition Fees (optional)</label>
                    <input
                        type="number"
                        {...register('tuitionFees')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Application Fees</label>
                    <input
                        type="number"
                        {...register('applicationFees', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.applicationFees && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Service Charge</label>
                    <input
                        type="number"
                        {...register('serviceCharge', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.serviceCharge && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                    <input
                        type="date"
                        {...register('applicationDeadline', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.applicationDeadline && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Scholarship Post Date</label>
                    <input
                        type="date"
                        {...register('scholarshipPostDate', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.scholarshipPostDate && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Posted User Email</label>
                    <input
                        type="email"
                        disabled
                        defaultValue={user?.email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>

                <button type="submit" className="bg-accent hover:bg-secondary text-white px-4 py-2 rounded-md">Add Scholarship</button>
            </form>
        </div>
    );
};

export default AddScholar;