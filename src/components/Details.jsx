import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const data = useLoaderData()
    return (
        <div>
            <h2 className="text-3xl">Details</h2>
        </div>
    );
};

export default Details;