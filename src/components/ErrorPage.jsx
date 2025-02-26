import React from 'react';
import error from '../assets/error.jpg'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const ErrorPage = () => {
    return (
        <div className='max-w-screen-2xl mx-auto m-10 space-y-5'>
            <Helmet>
                <title>Error!</title>
            </Helmet>
            <div className='text-center'>
                <Link to='/' className="btn bg-blue-400 font-bold text-xl text-white">Home</Link>
            </div>
            <img src={error} alt="" />
        </div>
    );
};

export default ErrorPage;