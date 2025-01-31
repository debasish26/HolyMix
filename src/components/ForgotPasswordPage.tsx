import React, { useState } from 'react';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://holymix-login-backend.onrender.com/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStep(2);
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to send reset email');
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://holymix-login-backend.onrender.com/verify-reset-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                setStep(3);
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to verify OTP');
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('https://holymix-login-backend.onrender.com/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            if (response.ok) {
                navigate('/accounts');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to reset password');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#111827]">
            <div className="w-full max-w-md px-6">
                <div className="bg-[#1f2937]/40 backdrop-blur-md p-8 rounded-2xl border border-red-500/10 shadow-2xl">
                    <button
                        onClick={() => navigate('/accounts')}
                        className="flex items-center text-gray-400 hover:text-white mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <form onSubmit={handleSubmitEmail} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                    required
                                />
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl"
                            >
                                Send Reset Code
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                    required
                                />
                                <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                    required
                                />
                                <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                    required
                                />
                                <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
