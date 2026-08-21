const SibApiV3Sdk = require('@getbrevo/brevo');
const config = require('../config/envConfig');

const sendEmail = async (options) => {
    const emailUser = config.Email_User || config.EMAIL_USER || process.env.EMAIL_USER ;
    const brevoKey = process.env.BREVO_API ;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = brevoKey;

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = options.subject;
    sendSmtpEmail.htmlContent = `<p>${options.message}</p>`;
    sendSmtpEmail.sender = { "name": "Nazdeek App", "email": emailUser };
    sendSmtpEmail.to = [{ "email": options.email }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('API Email Sent Successfully:', data);
        return data;
    } catch (error) {
        console.error('Brevo API Error:', error.response ? error.response.body : error.message);
        throw error;
    }
};

module.exports = sendEmail;