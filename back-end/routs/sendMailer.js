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

export default async function sendMailer(path, name, lang, lang2, email2, gymname) {
    const fromEmail = `"${gymname}" <signatureprojectjp@gmail.com>`;
    const toEmails = ['paurozhiyuan@gmail.com', email2];
    const attachments = [{ path }];

    const emailContent = {
        Portugues: {
            subject: 'Seja bem vindo!',
            text: `Olá ${name} tudo bem? Segue em anexo sua ficha de inscrição`
        },
        Inglês: {
            subject: 'be welcome!',
            text: `Hello ${name} all right? Attached is your registration form.`
        },
        日本語: {
            subject: '歓迎します!',
            text: `${name} 様, 今回入会していただきありがとうございます。申請書をご確認ください。`
        }
    };

    const managerEmailContent = {
        PT: {
            subject: 'Novo cadastro!',
            text: `Prezado cliente\n\nSegue em anexo a ficha de inscrição do novo aluno ${name}.\n\nAgradecemos pela parceria e pela preferência.\n\nYK technology`
        },
        EN: {
            subject: 'New customer!',
            text: `Dear customer\n\nAttached is the registration form for the new member ${name}.\n\nWe thank you for your partnership and preference.\n\nYK technology`
        },
        日本語: {
            subject: '入会者の連絡!',
            text: `${name}様\n\n今回入会されました、"nome do aluno"の入会申込書を送付します。\n\n今後ともYK technologyとの付き合いをどうぞよろしくお願いいたします。\n\nシステム不具合やご意見などありましたら、サポートへご連絡いただきまようよろしくお願いいたします。`
        }
    };

    const sendEmail = async (to, subject, text) => {
        await transporter.sendMail({
            from: fromEmail,
            to,
            subject,
            text,
            attachments
        });
    };

    switch (lang) {
        case 'Portugues':
        case 'Inglês':
        case '日本語':
            await sendEmail(toEmails, emailContent[lang].subject, emailContent[lang].text);
            break;
        default:
            console.log("error...");
    }

    switch (lang2) {
        case 'PT':
        case 'EN':
        case '日本語':
            await sendEmail(toEmails, managerEmailContent[lang2].subject, managerEmailContent[lang2].text);
            break;
        default:
            console.log("error...not found");
    }
};
