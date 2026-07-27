import React, { useState } from 'react';
import nazdeekLogo from "../assets/Nazdeek.logo.jpeg";
import { Link, useNavigate } from 'react-router-dom'; 
import { adminLogin } from '../api/adminApi';
import { useAdmin } from '../context/AuthContext'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    try {
      setLoading(true);
      const data = await adminLogin(email, password);
      const { accessToken, name , email: adminEmail, _id } = data;
      
      loginAdmin(accessToken, { name, email: adminEmail, _id });
      navigate('/admin'); 

    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 font-sans">
      {/* Container width and padding reduced for compact desktop & mobile fit */}
      <div className="bg-white flex flex-col md:flex-row rounded-3xl shadow-xl overflow-hidden w-full max-w-3xl border border-gray-100">
        
        {/* Left Side: Logo & Brand */}
        <div className="flex-1 bg-[#0D4D47] flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white p-5 rounded-full mb-4 shadow-md">
            <img 
              src={nazdeekLogo} 
              alt="Nazdeek Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-white text-3xl font-black tracking-tight">
            Nazdeek
          </h1>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 flex flex-col justify-center bg-white">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-[#0D4D47]">Admin Panel</h2>
            <p className="text-gray-500 mb-6 text-sm">Welcome Back!</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs">Email</label>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-[#0D4D47] outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs">Password</label>
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 text-sm rounded-xl focus:border-[#0D4D47] outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-[#0D4D47] text-xs font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#0D4D47] cursor-pointer text-white font-bold py-3 rounded-xl text-sm shadow-md hover:bg-[#0a3a35] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;