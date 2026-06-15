import api from './axiosInstance';

export const createService = async (serviceData) => {
    try {
        const response = await api.post('/create-service', serviceData);
        console.log("Create Service API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};