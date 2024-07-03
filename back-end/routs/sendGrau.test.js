import { expect } from 'chai';
import sinon from 'sinon';
import mailerGrau from '../routs/sendGrau';

describe('mailerGrau', () => {
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

  it('should send an email with the correct options', async () => {
    const name = 'John Doe';

    await mailerGrau(name);

    expect(transporterStub).to.have.been.calledOnce;
    expect(sendMailStub).to.have.been.calledOnceWithExactly({
      from: '"YK technology" <signatureprojectjp@gmail.com>',
      to: ['paurozhiyuan@gmail.com', 'leandrokussano@gmail.com'],
      subject: `Aviso sobre a graduação do aluno ${name}`,
      text: `Prezado cliente,

        O aluno ${name} participou da aula número 39!.

        Verifique pelo sistema os detalhes.

        Agradecemos pela parceria e pela preferência.

        YK technology`,
    });
  });

  it('should handle errors when sending email', async () => {
    const name = 'John Doe';
    const error = new Error('Failed to send email');
    sendMailStub.rejects(error);

    try {
      await mailerGrau(name);
      expect.fail('Expected an error to be thrown');
    } catch (err) {
      expect(err).to.equal(error);
    }
  });
});