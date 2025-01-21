import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
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

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).*$/;

        if (!passwordRegex.test(password)) {
            setError('at least one uppercase, and one lowercase character!');
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
                            email: email
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
                navigate('/');
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className='max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-center items-center my-7 bg-orange-50 p-3 md:p-10 rounded-lg'>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className='w-96'>
                <Lottie animationData={registerLottie}></Lottie>
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
                        <button className="btn btn-primary">Register</button>
                    </div>
                    <p>Already have an account?<span className='text-red-500'><Link to='/login'>Login</Link></span></p>
                </form>
                <button onClick={handleGoogleSignUp} className="btn bg-blue-200 m-4"><FaGoogle /> SignUp with Google</button>
                {error && <p className="text-red-500 p-3">{error}</p>}
            </div>
        </div>
    );
};

export default SignUp;