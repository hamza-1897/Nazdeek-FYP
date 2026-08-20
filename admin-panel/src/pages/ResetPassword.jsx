import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../api/adminApi';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Please enter a new password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await resetPassword(email, password);
      alert(res?.data?.message || 'Password reset successfully!');
      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to reset password. Please try again.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf1] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative border border-gray-100">
        
        {!isSuccess ? (
          <>
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
              <h2 className="text-2xl font-bold text-[#0c4e43]">Reset Password</h2>
              <p className="text-xs text-gray-400 mt-1">Choose a strong, secure password for your account</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-medium text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c4e43] focus:bg-white transition-all text-gray-700 disabled:opacity-50"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPass(!showPass)} 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-[#e6f4f1] rounded-full flex items-center justify-center mx-auto text-[#0c4e43] shadow-sm">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">Password Reset!</h2>
              <p className="text-xs text-gray-400 mt-1">Your password has been successfully updated.</p>
            </div>

            <button 
              onClick={() => navigate('/login')} 
              className="w-full bg-[#0c4e43] hover:bg-[#093c34] text-white text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] mt-2"
            >
              Go to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResetPasswordScreen;