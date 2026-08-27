import api from './axiosInstance';

export const userLogin = async (email, password) => {
    try {
        const response = await api.post('/user-auth/login', { email, password });
        console.log("Login API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Login API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};

export const userSignup = async (name, email) => {
    try {
        const response = await api.post('/user-auth/register', { name , email });
        console.log("Signup API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Signup API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};


export const verifySignupOTP = async (email, otp, password,  phone, role) => {
    try {
       const response = await api.post('/user-auth/verify-otp', {
    email,
    otp,
    password,
    phone,
    role
  });
        console.log("Verify Signup OTP API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Verify Signup OTP API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};


export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/user-auth/forgot-password', { email });
        console.log("Forgot Password API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Forgot Password API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};

export const verifyForgotOTP = async (email, otp) => {
    try {
        const response = await api.post('/user-auth/verify-forgot-otp', { email, otp });
        console.log("Verify Forgot OTP API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Verify Forgot OTP API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await api.post('/user-auth/reset-password', { email, password: newPassword });
        console.log("Reset Password API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Reset Password API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};

export const getMe = async ()=>{
    try{
        const response  = await api.get('/customer/getMe');
         console.log("get ME API response:", response.data);
        return response.data;
    } catch (error) {
        console.log(" get Me API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
}