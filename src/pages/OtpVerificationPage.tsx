import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useEffect, useState } from 'react';
const OtpVerificationPage: React.FC<OtpVerificationPageProps> = ({ email, onVerify }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(180); // 3 minutes in seconds
    const navigate = useNavigate(); // Hook for navigation
    const LOGIN_URL = import.meta.env.LOGIN_API;
    // Countdown timer logic
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(countdown);
    }, []);
    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://holymix-login-backend.onrender.com/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'OTP verification failed');
            }

            // Notify parent component about successful verification
            onVerify(true);
        } catch (error: any) {
            // Show error alert if verification fails
            alert(error.message);
        } finally {
            // Stop loading spinner
            setLoading(false);
        }
    };


    useEffect(() => {
        if (timer === 0) {
            alert('Time expired! Please retry.');
        }
    }, [timer]);

    const handleRetry = () => {
        setOtp(''); // Clear the OTP input
        setTimer(30); // Reset the timer
        navigate('/'); // Navigate to the account creation page
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#111827]">
            <div className="w-full max-w-md px-6">
                <div className="bg-[#1f2937]/40 backdrop-blur-md p-8 rounded-2xl border border-red-500/10 shadow-2xl shadow-red-500/5">
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">
                        OTP Verification
                    </h2>
                    <p className="text-gray-300 mb-4 text-center">
                        Enter the OTP sent to <strong>{email}</strong>
                    </p>
                    <p className="text-gray-400 text-center mb-8">
                        Time remaining: <strong>{formatTime(timer)}</strong>
                    </p>
                    <form onSubmit={handleOtpSubmit} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || timer === 0}
                            className={`w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 ${loading || timer === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>

                    {timer === 0 && (
                        <button
                            onClick={handleRetry}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            Retry
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationPage;
