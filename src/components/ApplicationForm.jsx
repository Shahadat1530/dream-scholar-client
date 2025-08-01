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
    const [usersData, setUsersData] = useState([]);
    const scholarship = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosSecure.get('/users');
                setUsersData(res.data);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message
                });
            }
        };
        fetchUsers();
    }, [axiosSecure]);

    const currentUser = usersData.find(userData => userData.email === user?.email);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!data.applicantPhoto[0]) {
            Swal.fire("Error", "Please upload a photo.", "error");
            return;
        }

        // Prepare the image for upload
        const formData = new FormData();
        formData.append("image", data.applicantPhoto[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const appliedScholar = {
                    phoneNumber: data?.phoneNumber,
                    applicantPhoto: res.data?.data?.display_url,
                    address: data?.address,
                    gender: data?.gender,
                    degree: data?.degree,
                    sscResult: parseFloat(data?.sscResult),
                    hscResult: parseFloat(data?.hscResult),
                    studyGap: data?.studyGap || "No Study Gap",
                    university: scholarship?.universityName,
                    category: scholarship?.scholarshipCategory,
                    subject: scholarship?.subjectCategory,
                    userName: user?.displayName,
                    userEmail: user?.email,
                    userId: currentUser?._id || "N/A",
                    scholarShipId: scholarship?._id,
                    scholarshipName: scholarship?.scholarshipName,
                    applicationFees: scholarship?.applicationFees,
                    serviceCharge: scholarship?.serviceCharge,
                    applicationStatus: 'pending',
                    currentDate: new Date().toISOString().split('T')[0],
                };

                const scholarRes = await axiosSecure.post('/scholarApplied', appliedScholar);
                if (scholarRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Scholarship Applied Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/userDashboard/myApplication');
                }
            }
        } catch (error) {
            Swal.fire("Error: Something went wrong!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 p-6 border rounded-lg shadow-md max-w-lg mx-auto bg-white">
            <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">Apply for Scholarship</h3>

            {/* Phone Number */}
            <input {...register("phoneNumber", { required: "Phone number is required" })} type="text"
                placeholder="Phone Number" className="border p-2 w-full rounded-md mb-2" />
            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

            {/* Upload Photo */}
            <input {...register("applicantPhoto", { required: "Photo is required" })} type="file"
                className="border p-2 w-full rounded-md mb-2" />
            {errors.applicantPhoto && <span className="text-red-500">{errors.applicantPhoto.message}</span>}

            {/* Address */}
            <input {...register("address", { required: "Address is required" })} type="text"
                placeholder="Address (Village, District, Country)" className="border p-2 w-full rounded-md mb-2" />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}

            {/* Gender Selection */}
            <select {...register("gender", { required: "Gender selection is required" })} className="border p-2 w-full rounded-md mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}

            {/* Degree Selection */}
            <select {...register("degree", { required: "Degree selection is required" })} className="border p-2 w-full rounded-md mb-2">
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
            </select>
            {errors.degree && <span className="text-red-500">{errors.degree.message}</span>}

            {/* SSC Result */}
            <input {...register("sscResult", { required: "SSC result is required", pattern: /^[0-9.]+$/ })} type="text"
                placeholder="SSC Result (Numeric)" className="border p-2 w-full rounded-md mb-2" />
            {errors.sscResult && <span className="text-red-500">SSC result must be a number.</span>}

            {/* HSC Result */}
            <input {...register("hscResult", { required: "HSC result is required", pattern: /^[0-9.]+$/ })} type="text"
                placeholder="HSC Result (Numeric)" className="border p-2 w-full rounded-md mb-2" />
            {errors.hscResult && <span className="text-red-500">HSC result must be a number.</span>}

            {/* Study Gap */}
            <select {...register("studyGap")} className="border p-2 w-full rounded-md mb-2">
                <option value="No Study Gap">No Study Gap</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
            </select>

            {/* Read-Only Fields */}
            <input type="text" value={scholarship?.universityName} readOnly className="border p-2 w-full rounded-md mb-2 bg-gray-100" />
            <input type="text" value={scholarship?.scholarshipCategory} readOnly className="border p-2 w-full rounded-md mb-2 bg-gray-100" />
            <input type="text" value={scholarship?.subjectCategory} readOnly className="border p-2 w-full rounded-md mb-2 bg-gray-100" />

            {/* Submit Button */}
            <button type="submit" className="bg-green-600 text-white p-2 rounded-md w-full font-semibold hover:bg-green-700 transition duration-300">
                Submit Application
            </button>
        </form>
    );
};

export default ApplicationForm;
