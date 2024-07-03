import nodemailer from 'nodemailer';
import SMTP_CONFIG from './config/smtp';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_CONFIG.auth.user,
        pass: SMTP_CONFIG.auth.pass
    }
});

export default async function restaurant(name, tel, email, mens) {
    const mailOptions = {
        from: '"YK technology" <signatureprojectjp@gmail.com>',
        to: ['paurozhiyuan@gmail.com', 'rootsgrillhekinan@gmail.com'],
        subject: 'Aviso sobre contato pelo website',
        text: `Prezado cliente,

        ${name} entrou em contato através do web site.

        Nome: ${name}
        Telefone: ${tel}
        E-mail: ${email}
        Menssagem: ${mens}

        YK technology`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
