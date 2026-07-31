import API from './axiosInstance';

//dashboard stats
export const getdashboard = async () => {
    try {
        const response = await API.get('/admin/dashbaord-stats');
        return response.data;
         }
    catch (error) {
        console.error("Error fetching  dashboard:", error);
        throw error;
    }
}; 

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

//update provider 
export const updateStatus = async (providerId, verificationStatus) => {
   const response = await API.put(`/admin/updateProvider/${providerId}/status`, { verificationStatus });
  return response.data;
}; 

// system settings APIs
export const getSystemSettings = async () => {
    try {
        const response = await API.get('/admin/getSystemSettings');
        console.log("Get System Settings API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching system settings:", error);
        throw error;
    }
};

export const updateContactDetails = async (contactDetails) => {
  const response = await API.put(`/admin/updateContactDetails`, { contactDetails });
  return response.data;
};

//  Pricing & Subscription Update
export const updatePricingAndFees = async (feeConfig) => {
  const response = await API.put(`/admin/updateFeeConfig`, { feeConfig });
  return response.data;
};

// Payment Accounts Update
export const updatePaymentAccounts = async (paymentAccounts) => {
  const response = await API.put(`/admin/updatePaymentAccounts`, { paymentAccounts });
  return response.data;
};

// update user status 
export const updateUserStatus = async (userId)=>{
    const response = await API.put(`/admin/updateStatus`, { userId });
  return response.data;
}
// get all pending payments
export const getPendingPayemnts = async () =>{
    try{
    const response= await API.get('/admin/pending-payments');
     console.log("Get pending payments API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching  pending payments:", error);
        throw error;
    } 
}

//  update pending payments status
export const updatePayments = async (providerId, status) =>{
    try{
    const response= await API.put(`/admin/providers/${providerId}/update-payment`,{status});
     console.log("Get pending payments API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error updating payments  :", error);
        throw error;
    } 
}
