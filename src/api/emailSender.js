const nodemailer = require('nodemailer');

export async function sendEmail(receiverAddress) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'barretotheo25@gmail.com',
                clientId: '436439008291-gijmhrpum9gsi7bkiqumkt7ua2c7kt36.apps.googleusercontent.com',
                clientSecret: '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',
                accessToken: 'ya29.a0AWY7CklQEoJaRqmu258eJGLh2t9kXCNbnQVE_aH3bZ2zWHEEoiAuzmur-IS2QcrFJXd2qEW-no1yf6-Rrhq7_g8qeIvB-KlS2305hrpfrfLOixkoWf1wOYRTTtskhBKjGFqcy2iX3C7Hp3Vg2fpCkQOG_HxGdrwaCgYKAdoSARESFQG1tDrpM3oNAk6E1pFH25HwDth2NA0166'
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

        transport.sendMail(mailOptions);

        return code;


}