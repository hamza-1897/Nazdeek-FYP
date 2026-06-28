import API from './axiosInstance';


export const adminLogin = async (email, password) => {
    try {
        const response = await API.post('/admin-auth/login', { email, password });
        console.log("Admin Login API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error during admin login:", error);
        throw error;
    }
};