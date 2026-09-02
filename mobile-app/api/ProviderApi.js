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

export const getProviderDashboardStats = async (providerId)=>{
  try {
    const response = await api.post('/provider/dashboard',{providerId});
    console.log("get dashboard  API :", response.data);
        return response.data;
  } catch (error) {
    console.error("Error  fetching dashboard:", error);
        throw error;
  }
}


export const updateProvider = async (formData) => {
  try {
    const response = await api.post('/provider/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateProvider API:", error);
    throw error;
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

export const editService = async (serviceId,formData)=>{
   try {
        const response = await api.put(`/provider/edit-service/${serviceId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
        console.log("edit Service API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error editing service:", error);
        throw error;
    }
}


export const deleteService = async (serviceId,formData)=>{
   try {
        const response = await api.delete(`/provider/delete-service/${serviceId}`)
        console.log("edit Service API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error editing service:", error);
        throw error;
    }
}

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

//booking apis
export const getBookingsByProvider = async (providerId) => {
    try {
        const response = await api.get(`/provider/bookings/${providerId}`);
        console.log("Get Bookings By Provider API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching bookings by provider:", error);
        throw error;
    }
};

export const updateBookingStatus = async (bookingId, status) => {
    try {
        const response = await api.put(`/provider/update-booking-status/${bookingId}`, { status });
        console.log("Update Booking Status API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error updating booking status:", error);
        throw error;
    }
};

export const getPaymentDetails = async () =>{
     try {
        const response = await api.get('/provider/payment');
        console.log("get payment detail  API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error get payment detail :", error);
        throw error;
    }
}

export const uploadPayment = async (formData) => {
  try {
    const response = await api.post('/provider/submit-payment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("submit payment detail API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submit payment detail :", error);
    throw error;
  }
};

export const providerReviews = async (providerId)=>{
  try {
    const response = await api.get(`/provider/reviews/${providerId}`)
    console.log("fetching reviews  API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error  fetching reviews  :", error);
    throw error;
  }
}

export const getPremiumPlans = async ()=>{
  try {
    const response = await api.get('/provider/getPremiumPlans');
    console.log("fetching plans  API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error  fetching plans  :", error);
    throw error;
  }
}