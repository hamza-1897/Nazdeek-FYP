import React from 'react'
import nazdeekLogo from "../assets/Nazdeek.logo.jpeg";
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div>
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans">
      
      <div className="bg-white flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl min-h-150">
        
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
            <h2 className="text-4xl font-bold text-[#0D4D47] ">Admin Panel</h2>
            <p className="text-gray-500 mb-10 text-xl">Welcome Back!</p>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Email</label>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-[#0D4D47] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Password</label>
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-[#0D4D47] outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-600 cursor-pointer">
                  
                  
                </label>
                <Link to="/forgot-password" className="text-[#0D4D47] text-sm font-bold hover:underline">Forgot Password?</Link>
              </div>

               <Link to="/admin/dashboard"> <button 
                type="submit"
                to=""
                className="w-full bg-[#0D4D47] text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:bg-[#0a3a35] transition-colors"
              >
              
                Log In
                
              </button>
              </Link>
            </form>
            
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Login
