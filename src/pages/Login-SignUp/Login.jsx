import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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

    const handleModeratorLogin = () => {
        setEmail('mod@gmail.com');
        setPassword('Moder@tor');
    };

    return (
        <div className='py-10'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='text-center space-y-1'>
                <h3 className="text-3xl font-bold">Welcome Back!</h3>
                <p className='font-thin'>Sign in to your account to continue your <br /> <span className='text-blue-600 font-bold'>scholarship</span> journey</p>
            </div>
            <div className='flex flex-col-reverse md:flex-row justify-center items-center  p-3 md:p-10 rounded-lg'>
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
                            {/* <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-600 text-white hover:bg-blue-700">Login</button>
                        </div>
                        <p>Don't have an account? <span className='text-red-500'><Link to='/register'>Register</Link></span></p>
                    </form>
                    <button onClick={handleGoogleLogin} className="btn bg-white m-4 hover:bg-blue-50"><FcGoogle className='text-xl'/> Login With Google</button>
                    <hr />
                    <p className='text-center py-2'>Check The <span className='text-red-600'>Moderator</span> dashboard. <br />
                    By Moderator Login!!</p>
                    <button onClick={handleModeratorLogin} className="btn bg-gray-800 text-white hover:bg-gray-700 m-4"><FaUserShield /> Moderator Login</button>
                    {error && <p className="text-red-500 p-4">{error}</p>}
                </div>
                <Lottie animationData={loginLottie} className="hidden md:block md:w-[700px]"></Lottie>
            </div>
        </div>
    );
};

export default Login;
