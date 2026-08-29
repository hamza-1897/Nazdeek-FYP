const axios = require('axios');
const config = require('../config/envConfig');

const sendEmail = async (options) => {
    const brevoApiKey = process.env.BREVO_API || config.BREVO_API;

    if (!brevoApiKey) {
        throw new Error("BREVO_API key is missing in environment variables!");
    }

    const payload = {
        sender: {
            name: "Nazdeek App",
            email: "nazdeek.application@gmail.com" 
        },
        to: [{ email: options.email }],
        subject: options.subject,
        htmlContent: `<p>${options.message}</p>`
    };

    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
            headers: {
                'accept': 'application/json',
                'api-key': brevoApiKey,
                'content-type': 'application/json'
            }
        });
        console.log(' Brevo Email Sent Successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error(' Brevo API Error:', error.response ? JSON.stringify(error.response.data) : error.message);
        throw error;
    }
};

module.exports = sendEmail;