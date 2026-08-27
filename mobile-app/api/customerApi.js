import api from './axiosInstance';


export const updateProfile = async (customerId, data) => {
  try {
    const response = await api.post(`/customer/update-profile/${customerId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getAllServices = async () => {
    try {
        const response = await api.get('/customer/services');
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
        const response = await api.get(`/customer/services/${serviceId}`);
        console.log("Get Service by ID API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching service:", error);
        throw error;
    }
};

export const createBooking = async (apiPayload) => {
    try {
        const response = await api.post('/customer/book-service', apiPayload);
        console.log("Create Booking API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const getBookingsByUserId = async (userId) => {
    try {
        const response = await api.get(`/customer/my-bookings/${userId}`);
        console.log("Get Bookings by User ID API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

export const cancelBooking = async (bookingId)=>{
    try {
         const response = await api.put(`/customer/cancel-booking/${bookingId}`);
        console.log("cancel booking API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error canceling bookings:", error);
        throw error;
    }
}

export const rebookService = async (bookingId, payload) => {
  const response = await API.patch(`/customer/rebook/${bookingId}`, payload);
  return response.data;
};

export const getProviderById = async (providerId)=>{
    try {
        const response  = await api.get(`/customer/provider/${providerId}`)
         console.log("Get provider by ID API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching provider:", error);
        throw error;
    }
}

export const createReview = async (apiPayload)=>{

    try {
        const response = await api.post('/customer/create-review',apiPayload)
         console.log("create review:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating  review:", error);
        throw error;
    }
}

export const createReport = async (apiPayload)=>{

    try {
        const response = await api.post('/customer/create-report',apiPayload)
         console.log("create Report:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating  Report:", error);
        throw error;
    }
}
