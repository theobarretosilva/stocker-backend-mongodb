const nodemailer = require('nodemailer');

export async function sendEmail(receiverAddress) {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'barretotheo25@gmail.com',
            clientId: '436439008291-gijmhrpum9gsi7bkiqumkt7ua2c7kt36.apps.googleusercontent.com',
            clientSecret: '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',
            accessToken: 'ya29.a0AWY7CklFNURd-AhszZ3kVyhaRoE12YRxdvEHFKrNIl3UklfYrcP-q-wMcQje1GAbdhK8aJRow1qLTrZc7P4tCQlueYT3owsWf4w7StVkUhabgh5aeA9aSbs761XFwWtmqi-uVFlAjnHLwwl0CApforfQl0HAmq8aCgYKAWcSARESFQG1tDrp3e860kIqpkq7gzToRrzpBQ0166'
        }
    });

    const code = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    const mailText = `We have received a request to reset your password for your Stocker account. To ensure the security of your account, we have generated a unique verification code for you.\nPlease use the following verification code to reset your password:\nVerification Code: [${code}]\nIf you did not initiate this password reset request, please ignore this email. Rest assured that your account is secure, and no changes will be made.\nBest regards\nStocker Support Team`;

    const mailOptions = {
        from: 'barretotheo25@gmail.com',
        to: receiverAddress,
        subject: 'Stocker Password Reset Request',
        text: mailText,
    };

    try {
        await transport.sendMail(mailOptions);
        console.log(`Email sent successfully \n Code: ${code}`)
    } catch (error) {
        console.error('Error sending email:', error);
    }
    

    return code;
}