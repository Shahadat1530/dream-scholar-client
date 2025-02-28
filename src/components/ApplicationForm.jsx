import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../pages/hooks/useAxiosPublic";
import useAxiosSecure from "../pages/hooks/useAxiosSecure";
import useAuth from "../pages/hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ApplicationForm = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const scholarship = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => setData(res.data))
    }, []);

    const currentUser = data.find(userData => userData.email === user?.email);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.applicantPhoto[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const appliedScholar = {
                phoneNumber: data.phoneNumber,
                applicantPhoto: res.data.data.display_url,
                address: data.address,
                gender: data.gender,
                degree: data.degree,
                sscResult: parseFloat(data.sscResult),
                hscResult: parseFloat(data.hscResult),
                studyGap: data.studyGap || "No Study Gap",
                university: scholarship.universityName,
                category: scholarship.scholarshipCategory,
                subject: scholarship.subjectCategory,
                userName: user?.displayName,
                userEmail: user?.email,
                userId: currentUser._id,
                scholarShipId: scholarship._id,
                scholarshipName: scholarship.scholarshipName,
                applicationFees: scholarship.applicationFees,
                serviceCharge: scholarship.serviceCharge,
                applicationStatus: 'pending',
                currentDate: new Date().toISOString().split('T')[0],
            };

            const scholarRes = await axiosSecure.post('/scholarApplied', appliedScholar)
            if (scholarRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Scholarship Applied Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/scholarships');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 p-6 border rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Apply for Scholarship</h3>

            <input {...register("phoneNumber", { required: "Phone number is required" })} type="text" placeholder="Phone Number" className="border p-2 w-full mb-2" />
            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

            <input {...register("applicantPhoto", { required: "Photo is required" })} type="file" className="border p-2 w-full mb-2" />
            {errors.applicantPhoto && <span className="text-red-500">{errors.applicantPhoto.message}</span>}

            <input {...register("address", { required: "Address is required" })} type="text" placeholder="Address (Village, District, Country)" className="border p-2 w-full mb-2" />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}

            <select {...register("gender", { required: "Gender selection is required" })} className="border p-2 w-full mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}

            <select {...register("degree", { required: "Degree selection is required" })} className="border p-2 w-full mb-2">
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
            </select>
            {errors.degree && <span className="text-red-500">{errors.degree.message}</span>}

            <input {...register("sscResult", { required: "SSC result is required" })} type="text" placeholder="SSC Result in number" className="border p-2 w-full mb-2" />
            {errors.sscResult && <span className="text-red-500">{errors.sscResult.message}</span>}

            <input {...register("hscResult", { required: "HSC result is required" })} type="text" placeholder="HSC Result in number" className="border p-2 w-full mb-2" />
            {errors.hscResult && <span className="text-red-500">{errors.hscResult.message}</span>}

            <select {...register("studyGap")} className="border p-2 w-full mb-2">
                <option value="No Study Gap">No Study Gap</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
            </select>

            <input type="text" value={scholarship.universityName} readOnly className="border p-2 w-full mb-2 bg-gray-100" />
            <input type="text" value={scholarship.scholarshipCategory} readOnly className="border p-2 w-full mb-2 bg-gray-100" />
            <input type="text" value={scholarship.subjectCategory} readOnly className="border p-2 w-full mb-2 bg-gray-100" />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
