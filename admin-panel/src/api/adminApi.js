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

export const resolveReport = async (id) => {
    try {
        const response = await API.put(`/admin/resolveReport/${id}`);
        console.log("Resolve Report API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error resolving report:", error);
        throw error;
    }
};

export const deleteReport = async (id) => {
    try {
        const response = await API.delete(`/admin/deleteReport/${id}`);
        console.log("Delete Report API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting report:", error);
        throw error;
    }
};

export const getProviderDetails = async (id) => {
    try {
        const response = await API.get(`/admin/getProviderDetails/${id}`);
        console.log("Get Provider Details API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching provider details:", error);
        throw error;
    }
};