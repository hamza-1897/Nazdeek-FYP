import api from './axiosInstance';


export const getAllMessages = async (chatId) => {
    try {
        const response = await api.get(`/chat/messages/${chatId}`);
        console.log("Get All Messages API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};


export const accessChat = async (apiPayload) => {
    try {
        const response = await api.post('/chat/access', apiPayload);
        console.log("Access Chat API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error accessing chat:", error);
        throw error;
    }
};

export const fetchChats = async (id, role) => {
    try {
        const response = await api.get(`/chat/user-chats/${id}/${role}`);
        console.log("Fetch Chats API response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching chats:", error);
        throw error;
    }
};