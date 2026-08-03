import api from './axiosInstance';


export const registerProviderApi = async (formData) => {
  try {
    const response = await api.post('/provider/registerProvider', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};





export const createService = async (formData) => {
    try {
        const response = await api.post('/provider/create-service', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
        console.log("Create Service API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};

export const getProviderServices = async (providerId) => {
    try {
        const response = await api.get(`/provider/services/${providerId}`);
        console.log("Get Provider Services API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching provider services:", error);
        throw error;
    }
};

export const getAllCategories = async ()=>{
    try{
    const response = await api.get('/provider/getAllCategory');
    console.log('get category Api response', response.data);
    return response.data;
}  catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
}