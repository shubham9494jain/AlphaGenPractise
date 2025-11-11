import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../components/AlertContext';
import Spinner from '../components/Spinner';
import api from '../utils/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/password-reset-request/', { email });
      showAlert(response.data.message, 'success');
      setTimeout(() => {
        navigate('/forgot-password-verify', { state: { email: email } });
      }, 2000);
    } catch (error) {
      showAlert(error.response?.data?.error || 'An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">


      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-center min-h-[calc(100vh-77px)] h-auto px-4 sm:px-6 gap-8 lg:gap-0 py-10 lg:py-0">
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start py-8 md:px-10 lg:px-24 space-y-6">
          <img
            alt="AlphaGenLogo"
            loading="lazy"
            width="180"
            height="70"
            decoding="async"
            data-nimg="1"
            className="h-auto object-contain"
            style={{ color: 'transparent' }}
            src="/loges/AlphaGenLogo.png"
          />
          <h1 className="text-2xl lg:text-3xl font-playfair font-semibold text-primaryText text-center lg:text-start leading-tight max-w-[484px]">
            Forgot Your Password?
          </h1>
          <p className="text-primaryText/80 font-inter text-center lg:text-start max-w-md">
            No worries! Enter your email address below and we'll send you a code to reset your password.
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center max-h-full">
          <div className="text-card-foreground bg-white shadow-xl border-0 rounded-[20px] w-full max-w-[400px] mx-auto">
            <div className="p-4 sm:p-6 md:p-7 px-4 sm:px-8 md:px-12 space-y-6">
              <h2 className="text-xl font-semibold font-playfair text-primaryText text-center">Reset Password</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    className="flex w-full border bg-background py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-gray-200 rounded-full px-4 focus:border-primary focus:ring-primary text-base"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full !py-5 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold text-base" disabled={loading}>
                {loading && <Spinner />}
                Send OTP
              </button>
              </form>
              <div className="text-center">
                <p className="text-primaryText font-semibold text-sm">
                  Remember your password? 
                  <Link to="/login" className="text-primary font-semibold hover:text-blue-600 ml-1">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
