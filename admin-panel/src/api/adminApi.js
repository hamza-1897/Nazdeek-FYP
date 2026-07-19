import API from './axiosInstance';


export const getAllUsers = async () => {
    try {
        const response = await API.get('/admin/getallusers');
        console.log("Get All Users API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

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


export const getAllProviders = async () => {
    try {
        const response = await API.get('/admin/getAllProviders');
        console.log("Get All Providers API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching all providers:", error);
        throw error;
    }
};

export const getAllReports = async () => {
    try {
        const response = await API.get('/admin/getAllReports');
        console.log("Get All Reports API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching all reports:", error);
        throw error;
    }
};