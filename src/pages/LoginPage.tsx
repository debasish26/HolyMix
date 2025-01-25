import React, { useState } from 'react';
import { User, Lock, Mail, Play } from 'lucide-react';
import OtpVerificationPage from './OtpVerificationPage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
interface LoginPageProps {
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  onSubmit?: (formData: { firstName: string; lastName: string; email: string; password: string }) => void;
  showBackgroundImage?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({
  title = 'AnimeStream',
  subtitle = 'Your Anime Journey Starts Here!',
  logo,
  onSubmit,
  showBackgroundImage = true,
}) => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const endpoint = isLogin ? '/login' : '/register';

      try {
        const response = await fetch(`https://holymix-login-backend.onrender.com${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }

        if (!isLogin) {
          console.log(data.message || 'Registration successful! Check your email for OTP');
          setIsOtpSent(true); // Trigger OTP page
        } else {
          localStorage.setItem('token', data.token); // Save the token
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error.message);
        console.log(error.message);
      }
    };

    if (isOtpSent) {
      return (
        <OtpVerificationPage
          email={formData.email}
          onVerify={(success) => {
            if (success) {
              console.log('Account verification complete. You can now log in.');
              setIsOtpSent(false);
              setIsLogin(true);
            }
          }}
        />
      );
    }
    const toggleView = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#111827]">
      {/* Background Image */}
      {showBackgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1565967511849-76a60a516170")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/95 via-[#111827]/90 to-black/90" />
        </div>
      )}

      {/* Content */}
      <div className="w-full max-w-md px-6 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {logo || <Play className="w-10 h-10 text-red-500 fill-red-500" />}
          <span className="text-white text-3xl font-bold tracking-tight">
            {title}
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-[#1f2937]/40 backdrop-blur-md p-8 rounded-2xl border border-red-500/10 shadow-2xl shadow-red-500/5">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            {isLogin ? 'Welcome Back, Senpai!' : 'Join Our Anime Community'}
          </h2>
          <p className="text-gray-300 mb-8 text-center">
            {isLogin ? 'Continue your anime journey' : subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
                </div>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#111827]/80 text-white px-4 py-3 rounded-xl pl-10 border border-red-500/10 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-red-500" />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {isLogin ? "New to AnimeStream? " : "Already have an account? "}
              <button
                onClick={toggleView}
                className="text-red-500 hover:text-red-400 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
