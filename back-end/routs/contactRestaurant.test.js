import { expect } from 'chai';
import { smtpConfig } from '../config/smtp';
import restaurant from '../routs/contactRestaurant';

describe('contactRestaurant', () => {
  it('should send an email successfully', async () => {
    const name = 'John Doe';
    const tel = '1234567890';
    const email = 'johndoe@example.com';
    const mens = 'Hello, this is a test message';

    // Call the function and await the result
    const result = await restaurant(name, tel, email, mens);

    // Assert that the email was sent successfully
    expect(result).to.equal('Email sent successfully');
  });

  it('should handle errors when sending email', async () => {
    const name = 'John Doe';
    const tel = '1234567890';
    const email = 'johndoe@example.com';
    const mens = 'Hello, this is a test message';

    // Mock the sendMail function to throw an error
    transporter.sendMail = () => {
      throw new Error('Failed to send email');
    };

    // Call the function and await the result
    try {
      await restaurant(name, tel, email, mens);
    } catch (error) {
      // Assert that the error was handled correctly
      expect(error.message).to.equal('Error sending email: Failed to send email');
    }
  });
});