import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAlert } from '../components/AlertContext';
import Spinner from '../components/Spinner';
import api from '../utils/api';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await api.post('/register/', { name, email, password });

      if (response.status === 201) {
        showAlert(response.data.message, 'success');
        setTimeout(() => {
          navigate('/verify-otp', { state: { email: email } });
        }, 2000);
      } else {
        showAlert(response.data.error || 'An error occurred.', 'error');
      }
    } catch (error) {
      showAlert(error.response?.data?.error || 'An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/google/', { access_token: credentialResponse.credential });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/dashboard');
    } catch (error) {
      showAlert(error.response?.data?.error || 'An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gray-50"
    >


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
            Start extracting insights from long financial reports—without the manual grind.
          </h1>
          <div className="flex items-center justify-start space-x-2">
            <img
              alt="User Icon"
              loading="lazy"
              width="188"
              height="80"
              decoding="async"
              data-nimg="1"
              className="w-[47px] h-[20px] object-fit"
              style={{ color: 'transparent' }}
              src="/images/usersIcon.png"
            />
            <span className="text-sm text-primaryText font-inter font-semibold">500+ users</span>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center max-h-full">
          <div className="text-card-foreground bg-white shadow-xl border-0 rounded-[20px] w-full max-w-[400px] mx-auto">
            <div className="p-4 sm:p-6 md:p-7 px-4 sm:px-8 md:px-12 space-y-6">
              <h2 className="text-xl font-semibold font-playfair text-primaryText text-center">Create your account</h2>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    showAlert('Google login failed. Please try again.', 'error');
                  }}
                />
              </div>
              <div class="flex items-center justify-center">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 text-gray-500 font-semibold">or</span>
                <div class="flex-grow border-t border-gray-300"></div>
              </div>
              <p className="text-primaryText font-semibold font-inter text-sm text-center">Sign up with your email address</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    className="flex w-full border bg-background py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-gray-200 rounded-full px-4 focus:border-primary focus:ring-primary text-base"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
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
                <div className="relative">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="flex w-full border bg-background py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-gray-200 rounded-full px-4 focus:border-primary focus:ring-primary text-base pr-12"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primaryText"
                      tabIndex={-1}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off w-5 h-5"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                      ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye w-5 h-5"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      )}
                    </button>
                  </div>
                </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full !py-5 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold text-base" disabled={loading}>
                {loading && <Spinner />}
                Sign up
              </button>
              </form>
              <div className="text-center">
                <p className="text-primaryText font-semibold text-sm">
                  Already have an account ?
                  <Link to="/login/" className="text-primary font-semibold hover:text-blue-600 ml-1">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}