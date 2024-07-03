import { expect } from 'chai';
import { smtpConfig } from '../config/smtp';

describe('smtpConfig', () => {
  it('should have the correct host', () => {
    expect(smtpConfig.host).to.equal('smtp.gmail.com');
  });

  it('should have the correct port', () => {
    expect(smtpConfig.port).to.equal(465);
  });

  it('should have the correct authentication credentials', () => {
    expect(smtpConfig.auth.user).to.equal('yktechnology22@gmail.com');
    expect(smtpConfig.auth.pass).to.equal('atwnzuctwzepcabb');
  });
});