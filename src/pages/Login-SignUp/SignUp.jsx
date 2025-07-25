import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Lottie from 'lottie-react';
import registerLottie from '../../assets/register-lottie.json';
import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createNewUser, updateUserProfile, setUser, handleGoogle } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const handleSignUp = e => {
        e.preventDefault();

        setError('');

        const form = new FormData(e.target);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        if (password.length < 6) {
            setError('Password should be at least 6');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one special character!');
            return;
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            role: 'user'
                        };

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "SignUp Success!",
                                        showClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeInUp
                                            animate__faster
                                          `
                                        },
                                        hideClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeOutDown
                                            animate__faster
                                          `
                                        }
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(err => {
                        setError(err.message)
                    })
            })

    }

    const handleGoogleSignUp = () => {
        handleGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'user'
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate('/')
                    })
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className='py-10'>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className='text-center space-y-1'>
                <h3 className="text-3xl font-bold">Create your account</h3>
                <p className='font-thin'>Join thousands of students finding their <br /> dream scholarships</p>
            </div>
            <div className='max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-center items-center my-7 p-3 md:p-10 rounded-lg'>
                <div className='w-96'>
                    <Lottie animationData={registerLottie} className="hidden md:block"></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text" name='photo' placeholder="photoURL link" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" autoComplete='off' required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-600 text-white hover:bg-blue-700">Register</button>
                        </div>
                        <p>Already have an account? <span className='text-red-500'><Link to='/login'>Login</Link></span></p>
                    </form>
                    <button onClick={handleGoogleSignUp} className="btn bg-white m-4 hover:bg-blue-50"><FcGoogle className='text-xl'/> SignUp with Google</button>
                    {error && <p className="text-red-500 p-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default SignUp;