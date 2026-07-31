import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); 
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a new password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setError('');
    setIsSuccess(true);
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
          
          {!isSuccess ? (
            <>
              <button 
                type="button"
                onClick={() => window.history.back()}
                className="absolute top-8 left-8 flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#0c4e43] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#0c4e43] mb-1">Reset Password</h2>
                  <p className="text-xs text-gray-400">Choose a strong, secure password for security.</p>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 font-medium">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Enter New Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c4e43] focus:bg-white transition-all text-gray-700"
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
                  className="w-full bg-[#0c4e43] hover:bg-[#093a32] text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-[#e6f4f1] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#0c4e43]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">Password Reset!</h2>
                <p className="text-xs text-gray-400 mt-1">Your password has been successfully updated.</p>
              </div>

              <button 
                onClick={() => window.location.href = '/login'} 
                className="w-full bg-[#0c4e43] hover:bg-[#093a32] text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md"
              >
                Go to Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;