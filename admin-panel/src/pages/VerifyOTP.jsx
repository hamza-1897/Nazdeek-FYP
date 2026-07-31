import React, { useState } from 'react';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the verification code');
      return;
    }
    if (otp.length < 4) {
      setError('Please enter a valid OTP');
      return;
    }
    setError('');
    console.log('Verifying OTP:', otp);
    navigate('/reset-password');ss
  };

  return (
    <div className="min-h-screen bg-[#eaedf1] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        
        <div className="md:w-1/2 bg-[#0c4e43] flex flex-col items-center justify-center p-8 text-white text-center relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
            <svg className="w-16 h-16 text-[#0c4e43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Nazdeek</h1>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-white">
          
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="absolute top-8 left-8 flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#0c4e43] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#0c4e43] mb-1">Verification Code</h2>
              <p className="text-xs text-gray-400">
                We've sent a code to <span className="text-gray-600 font-medium">{email}</span>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Enter OTP</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#0c4e43] focus:bg-white transition-all text-gray-700 placeholder:tracking-normal placeholder:font-normal"
                />
              </div>
            </div>

            <button
  type="button"
  onClick={() => navigate('/reset-password')}
  className="w-full bg-[#0c4e43] text-white py-3 rounded-xl font-semibold hover:bg-[#093c34] transition"
>
  Verify OTP
</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;