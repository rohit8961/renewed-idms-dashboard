// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
// import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import logo from '../assets/Khelwibhaag.png';
import { useNavigate } from 'react-router-dom';
import axiosWithoutAuth from '../config/axios';
// import api from '../../apiServices/apiMethods';
// import { login } from '../../utils/endpoints';

export default function Login() {
    const navigate = useNavigate()
    const [passwordView, setPasswordView] = useState(false);

    // State for email and password
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Form Submit Handler
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data } = await axiosWithoutAuth.post("login", { email: email, password: pass });
            console.log(data, "data")
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/")

            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className=" h-screen flex items-center justify-center bg-gradient-to-b from-[#052f6b] to-blue-700">
            <div className="absolute top-0 left-0 w-full p-4 bg-[#0c1d3a] text-white flex justify-around items-center">
                <h1 className="text-2xl font-semibold">ID Card Management System Dashboard</h1>
                <img
                    src={logo}
                    alt="Logo"
                    className="h-16"
                />
            </div>

            <div className="bg-[#0c1d3a] p-8 rounded-lg shadow-lg w-96 text-white">
                <h2 className="text-2xl font-semibold text-center">Sign In</h2>
                <p className="text-sm text-gray-300 text-center mb-4">
                    Enter your email address and password to access your account.
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Email address / ईमेल</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1 p-2 w-full rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium">Password / पासवर्ड</label>
                    <div className="relative">
                        <input
                            type={passwordView ? "text" : "password"}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 p-2 w-full rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                            {passwordView ? (
                                <AiFillEye
                                    className="text-2xl text-gray-600 cursor-pointer"
                                    onClick={() => setPasswordView(false)}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    className="text-2xl text-gray-600 cursor-pointer"
                                    onClick={() => setPasswordView(true)}
                                />
                            )}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleLogin}>
                    <button type="submit" className="w-full bg-[#46c0c2] hover:bg-blue-600 text-white font-semibold py-2 rounded">
                        <i className="ri-login-circle-fill me-1"></i>
                        Sign In
                    </button>
                </form>
            </div>
        </div >
    );
}
