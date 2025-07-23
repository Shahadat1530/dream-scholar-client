import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../pages/hooks/useAxiosSecure';

const EditApplicationForm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        axiosSecure.get(`/scholarApplied/${id}`)
            .then(res => reset(res.data))  
            .catch(() => Swal.fire('Error', 'Could not load data', 'error'));
    }, [axiosSecure, id, reset]);

    const onSubmit = async (data) => {
        const { _id, ...safeData } = data; 

        try {
            const res = await axiosSecure.put(`/scholarApplied/${id}`, safeData);
            if (res.data.result.matchedCount > 0) {
                Swal.fire('Success', 'Application updated.', 'success');
                navigate('/userDashboard/myApplication');
            }
        } catch {
            Swal.fire('Error', 'Update failed.', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 p-6 border rounded-lg shadow-md max-w-lg mx-auto bg-white">
            <h3 className="text-2xl font-semibold mb-4 text-center text-primary">
                Edit Application
            </h3>

            <input
                {...register('phoneNumber', { required: 'Phone number is required' })}
                placeholder="Phone Number"
                className="border p-2 w-full rounded-md mb-2"
            />
            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

            <input
                {...register('address', { required: 'Address is required' })}
                placeholder="Address"
                className="border p-2 w-full rounded-md mb-2"
            />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}

            <select {...register('gender', { required: true })} className="border p-2 w-full rounded-md mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <button
                type="submit"
                className="bg-secondary text-white p-2 rounded-md w-full font-semibold hover:bg-accent transition duration-300"
            >
                Save Changes
            </button>
        </form>
    );
};

export default EditApplicationForm;
