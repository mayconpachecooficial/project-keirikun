import { expect } from 'chai';
import sinon from 'sinon';
import nodemailer from 'nodemailer';
import sendMailer from '../routs/sendMailer';

describe('sendMailer', () => {
  let transporterStub;
  let sendMailStub;

  beforeEach(() => {
    sendMailStub = sinon.stub().resolves();
    transporterStub = sinon.stub().returns({ sendMail: sendMailStub });
    sinon.stub(nodemailer, 'createTransport').returns(transporterStub);
  });

  afterEach(() => {
    nodemailer.createTransport.restore();
  });

  it('should send an email with the correct options for Portuguese language', async () => {
    const path = '/path/to/file.pdf';
    const name = 'John Doe';
    const lang = 'Portugues';
    const lang2 = 'PT';
    const email2 = 'test@example.com';
    const gymname = 'Gym Name';

    await sendMailer(path, name, lang, lang2, email2, gymname);

    expect(transporterStub).to.have.been.calledOnce;
    expect(sendMailStub).to.have.been.calledOnceWithExactly({
      from: '"Gym Name" <signatureprojectjp@gmail.com>',
      to: ['paurozhiyuan@gmail.com', 'test@example.com'],
      subject: 'Seja bem vindo!',
      text: 'Olá John Doe tudo bem? Segue em anexo sua ficha de inscrição',
      attachments: [{ path: '/path/to/file.pdf' }],
    });
  });

  it('should send an email with the correct options for English language', async () => {
    // Test case for English language
  });

  it('should send an email with the correct options for Japanese language', async () => {
    // Test case for Japanese language
  });

  it('should handle errors when sending email', async () => {
    // Test case for handling errors
  });
});