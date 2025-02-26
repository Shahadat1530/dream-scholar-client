import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ApplicationForm = () => {
    const scholarship = useLoaderData();

    const handleSubmit = e => {
        e.preventDefault();
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="mt-8 p-6 border rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Apply for Scholarship</h3>
                <input type="text" placeholder="Phone Number" className="border p-2 w-full mb-2" required />
                <input type="text" placeholder="Address" className="border p-2 w-full mb-2" required />
                <select className="border p-2 w-full mb-2" required>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
                <select className="border p-2 w-full mb-2" required>
                    <option>Diploma</option>
                    <option>Bachelor</option>
                    <option>Masters</option>
                </select>
                <input type="text" placeholder="SSC Result" className="border p-2 w-full mb-2" required />
                <input type="text" placeholder="HSC Result" className="border p-2 w-full mb-2" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Submit Application</button>
            </form>
        </div>
    );
};

export default ApplicationForm;