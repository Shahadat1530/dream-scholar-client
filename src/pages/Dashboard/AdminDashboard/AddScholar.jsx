import React from 'react';
import { useForm } from 'react-hook-form';

const AddScholar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-200 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Scholarship Name</label>
                    <input
                        {...register('scholarshipName', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.scholarshipName && <span className="text-red-500">This field is required</span>}
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
                        {...register('universityCountry', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.universityCountry && <span className="text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">University City</label>
                    <input
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
                        {...register('postedUserEmail', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.postedUserEmail && <span className="text-red-500">This field is required</span>}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Scholarship</button>
            </form>
        </div>
    );
};

export default AddScholar;