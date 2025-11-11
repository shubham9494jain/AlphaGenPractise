import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAlert } from '../components/AlertContext';
import Spinner from '../components/Spinner';

export default function CreateNewPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const token = location.state?.token;
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!email || !token) {
      navigate('/forgot-password');
    }
  }, [email, token, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showAlert('Passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/password-reset-confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert(data.message, 'success');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showAlert(data.error || 'An error occurred.', 'error');
      }
    } catch (error) {
      showAlert('An error occurred. Please try again.', 'error');
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
            Create a New Password
          </h1>
          <p className="text-primaryText/80 font-inter text-center lg:text-start max-w-md">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center max-h-full">
          <div className="text-card-foreground bg-white shadow-xl border-0 rounded-[20px] w-full max-w-[400px] mx-auto">
            <div className="p-4 sm:p-6 md:p-7 px-4 sm:px-8 md:px-12 space-y-6">
              <h2 className="text-xl font-semibold font-playfair text-primaryText text-center">Create New Password</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="flex w-full border bg-background py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-gray-200 rounded-full px-4 focus:border-primary focus:ring-primary text-base pr-12"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primaryText"
                    tabIndex={-1}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
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
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="flex w-full border bg-background py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 border-gray-200 rounded-full px-4 focus:border-primary focus:ring-primary text-base pr-12"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primaryText"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
              <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full !py-5 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold text-base" disabled={loading}>
                {loading && <Spinner />}
                Reset Password
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
