import api from './axiosInstance';

export const getAllServices = async () => {
    try {
        const response = await api.get('/user/services');
        console.log("Get All Services API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

export const getServiceById = async (serviceId) => {
    try {
        const response = await api.get(`/user/services/${serviceId}`);
        console.log("Get Service by ID API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching service:", error);
        throw error;
    }
};