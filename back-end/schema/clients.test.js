import chai from 'chai';
import { describe, it } from 'mocha';
import Clients from './clients';

const expect = chai.expect;

describe('Clients Model', () => {
  it('should create a new Clients instance', () => {
    const client = Clients.build({
      gymName: 'Gym 1',
      representative: 'John Doe',
      uniqueCode: 12345,
      password: 'password123',
      address: '123 Main St',
      tel: '123-456-7890',
      email: 'john@example.com',
      saveDay: 'Monday',
      status: 'Active',
      language: 'English',
    });

    expect(client).to.be.an.instanceOf(Clients);
    expect(client.gymName).to.equal('Gym 1');
    expect(client.representative).to.equal('John Doe');
    expect(client.uniqueCode).to.equal(12345);
    expect(client.password).to.equal('password123');
    expect(client.address).to.equal('123 Main St');
    expect(client.tel).to.equal('123-456-7890');
    expect(client.email).to.equal('john@example.com');
    expect(client.saveDay).to.equal('Monday');
    expect(client.status).to.equal('Active');
    expect(client.language).to.equal('English');
  });

  // Add more tests for other scenarios...
});