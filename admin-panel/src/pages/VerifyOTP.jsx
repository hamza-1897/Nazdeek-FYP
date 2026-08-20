import React, { useState } from 'react';
import { KeyRound, ArrowLeft, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../api/adminApi';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('Please enter the verification code');
      return;
    }
    if (otp.length < 4) {
      setError('Please enter a valid OTP code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await verifyOTP(email, otp);
      alert(res?.data?.message || 'OTP Verified Successfully!');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Invalid OTP code. Please try again.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf1] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative border border-gray-100">
        
        <button 
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0c4e43] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#0c4e43] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 17 22 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#0c4e43]">Verification Code</h2>
          <p className="text-xs text-gray-400 mt-1">
            We've sent a code to <span className="text-gray-600 font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-medium text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
              Enter OTP Code
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-sm font-bold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-[#0c4e43] focus:bg-white transition-all text-gray-700 placeholder:tracking-normal placeholder:font-normal disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0c4e43] hover:bg-[#093c34] text-white text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default VerifyOTP;