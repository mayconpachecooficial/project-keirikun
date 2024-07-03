import nodemailer from 'nodemailer';
import SMTP_CONFIG from './config/smtp';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: SMTP_CONFIG.auth.user,
        pass: SMTP_CONFIG.auth.pass
    },
    tls: {
        rejectUnauthorized: false,
    }
});

export default async function mailerGrau(name) {
    const mailOptions = {
        from: '"YK technology" <signatureprojectjp@gmail.com>',
        to: ['paurozhiyuan@gmail.com', 'leandrokussano@gmail.com'],
        subject: `Aviso sobre a graduação do aluno ${name}`,
        text: `Prezado cliente,

        O aluno ${name} participou da aula número 39!.

        Verifique pelo sistema os detalhes.

        Agradecemos pela parceria e pela preferência.

        YK technology`,
    };

    await transporter.sendMail(mailOptions);
}
