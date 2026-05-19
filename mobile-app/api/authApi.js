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

export const signup = async (name, email, password) => {
    try {
        const response = await api.post('/user-auth/signup', { name, email, password });
        console.log("Signup API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.log("Signup API error:", error.response ? error.response.data : error);
        throw error.response ? error.response.data : error;
    }
};