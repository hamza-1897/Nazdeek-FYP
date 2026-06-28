import api from './axiosInstance';

export const createService = async (formData) => {
    try {
        const response = await api.post('/provider/create-service', formData);
        console.log("Create Service API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};