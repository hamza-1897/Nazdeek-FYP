import API from './axiosInstance';



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


//user APIs
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

export const updateUserStatus = async (userId)=>{
    const response = await API.put(`/admin/updateStatus`, { userId });
  return response.data;
}




// provider APIs
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

export const updateStatus = async (providerId, verificationStatus) => {
   const response = await API.put(`/admin/updateProvider/${providerId}/status`, { verificationStatus });
  return response.data;
}; 



// report APIs
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



// payment and fee configuration APIs
export const updatePricingAndFees = async (feeConfig) => {
  const response = await API.put(`/admin/updateFeeConfig`, { feeConfig });
  return response.data;
};

export const updatePaymentAccounts = async (paymentAccounts) => {
  const response = await API.put(`/admin/updatePaymentAccounts`, { paymentAccounts });
  return response.data;
};

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

// category APIs
export const getAllCategories = async () => {
    try {
        const response = await API.get('/admin/getAllCategories');
        console.log("Get All Categories API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching all categories:", error);
        throw error;
    }   
};

export const addCategory = async (formData) => {
    try {
        const response = await API.post('/admin/addCategory', formData);
        console.log("Add Category API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

export const editCategory = async (categoryId, formData) => {
    try {
        const response = await API.put(`/admin/editCategory/${categoryId}`, formData);
        console.log("Edit Category API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error editing category:", error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await API.delete(`/admin/deleteCategory/${categoryId}`);
        console.log("Delete Category API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
