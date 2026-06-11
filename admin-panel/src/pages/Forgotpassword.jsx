import React from 'react';
import nazdeekLogo from "../assets/Nazdeek.logo.jpeg";
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div>
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans">
        
        <div className="bg-white flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl min-h-125">
          
          <div className="flex-1 bg-[#0D4D47] flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-white p-8 rounded-full mb-6 shadow-lg">
              <img 
                src={nazdeekLogo} 
                alt="Nazdeek Logo"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h1 className="text-white text-5xl font-black tracking-tighter mb-2">
              Nazdeek
            </h1>
          </div>

          <div className="flex-1 p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-4xl font-bold text-[#0D4D47]">Forgot Password?</h2>
              
              <form className="space-y-8">
                <div>
                  <input 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-[#0D4D47] outline-none transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#0D4D47] text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:bg-[#0a3a35] transition-colors"
                >
                  Send Reset Link
                </button>

                <div className="text-center mt-6">
                  <Link to="/login" className="text-[#0D4D47] text-sm font-bold hover:underline">
                    Back to Login
                  </Link>
                </div>
              </form>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;
