import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAlert } from '../components/AlertContext';
import Spinner from '../components/Spinner';
import api from '../utils/api';

function VerifyOTPPage() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(600);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const inputRefs = useRef([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!email) {
      navigate('/sign-up');
    }
    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerifyLoading(true);
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
        showAlert('Please enter a valid 6-digit OTP.', 'error');
        setVerifyLoading(false);
        return;
    }
    try {
      const response = await api.post('/verify-otp/', { email, otp: otpValue });
      showAlert(response.data.message, 'success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      showAlert(error.response?.data?.error || 'An error occurred.', 'error');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
        const response = await api.post('/resend-otp/', { email });
        showAlert(response.data.message, 'success');
        setTimer(600);
        setIsResendDisabled(true);
    } catch (error) {
        showAlert(error.response?.data?.error || 'An error occurred.', 'error');
    } finally {
      setResendLoading(false);
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text');
    if (isNaN(data) || data.length !== 6) {
      return;
    }
    const newOtp = data.split('');
    setOtp(newOtp);
    inputRefs.current[5].focus();
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
              <h2 className="text-xl font-semibold font-playfair text-primaryText text-center">OTP Verification</h2>
              <p className="text-center text-gray-500">A 6-digit OTP has been sent to {email}</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
                    {otp.map((data, index) => {
                        return (
                            <input
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={handleKeyDown}
                                onFocus={e => e.target.select()}
                                ref={el => inputRefs.current[index] = el}
                            />
                        );
                    })}
                </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full !py-5 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold text-base" disabled={verifyLoading}>
                {verifyLoading && <Spinner />}
                Verify
              </button>
              </form>
                <div className="text-center">
                    <p className="text-primaryText font-semibold text-sm">
                        Didn't receive the OTP? 
                        <button onClick={handleResendOtp} disabled={isResendDisabled || resendLoading} className={`text-primary font-semibold hover:text-blue-600 ml-1 ${isResendDisabled || resendLoading ? 'cursor-not-allowed' : ''}`}>
                            {resendLoading && <Spinner />}
                            Resend OTP
                        </button>
                        {isResendDisabled && <span> in {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}</span>}
                    </p>
                </div>
              <div className="text-center">
                <p className="text-primaryText font-semibold text-sm">
                  Want to create a new account? 
                  <Link to="/sign-up" className="text-primary font-semibold hover:text-blue-600 ml-1">Create account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTPPage;
