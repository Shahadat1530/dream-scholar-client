import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaUserShield } from "react-icons/fa";
import Lottie from 'lottie-react';
import loginLottie from '../../assets/login-lottie.json';
import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Login = () => {
    const { userLogin, setUser, handleGoogle } = useAuth();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        userLogin(email, password)
            .then((result) => {
                setUser(result.user);
                navigate("/");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleGoogleLogin = () => {
        handleGoogle()
            .then(result => {
                setUser(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'user'
                };

                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        navigate('/');
                    });
            })
            .catch(err => {
                setError(err.message);
            });
    };

    const handleAdminLogin = () => {
        setEmail('admin@gmail.com');
        setPassword('Adm!n6');
    };

    return (
        <div className='md:py-10'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='text-center'>
                <h3 className="text-3xl font-bold space-y-1">Welcome Back!</h3>
                <p className='font-thin'>Sign in to your account to continue your <br />scholarship journey</p>
            </div>
            <div className='flex flex-col-reverse md:flex-row justify-center items-center my-7 p-3 md:p-10 rounded-lg'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name='email'
                                placeholder="email"
                                className="input input-bordered"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name='password'
                                placeholder="password"
                                className="input input-bordered"
                                autoComplete='off'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>Don't have an account? <span className='text-red-500'><Link to='/register'>Register</Link></span></p>
                    </form>
                    <button onClick={handleGoogleLogin} className="btn bg-blue-200 m-4"><FaGoogle /> Login With Google</button>
                    <button onClick={handleAdminLogin} className="btn bg-gray-800 text-white hover:bg-gray-700 m-4"><FaUserShield /> Admin Login</button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <Lottie animationData={loginLottie} className="hidden md:block"></Lottie>
            </div>
        </div>
    );
};

export default Login;
