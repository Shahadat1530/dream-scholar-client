import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import Lottie from 'lottie-react';
import loginLottie from '../../assets/login-lottie.json'
import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Login = () => {
    const { userLogin, setUser, handleGoogle } = useAuth();
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate("/");
            })
            .catch((err) => {
                setError(err.message)
            });
    }

    const handleGoogleLogin = () => {
        handleGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
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
        <div className='max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center my-7 bg-orange-50 p-3 md:p-10 rounded-lg'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
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
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <p>Don't have an account?<span className='text-red-500'><Link to='/register'>Register</Link></span></p>
                </form>
                <button onClick={handleGoogleLogin} className="btn bg-blue-200 m-4"><FaGoogle /> Login With Google</button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <Lottie animationData={loginLottie}></Lottie>
        </div>
    );
};

export default Login;