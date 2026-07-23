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
