import chai from 'chai';
import sequelize from '../db';
import RestClients from './rest_clients';

const expect = chai.expect;

describe('RestClients Model', () => {
  before(async () => {
    // Sync the database before running the tests
    await sequelize.sync();
  });

  afterEach(async () => {
    // Delete all records after each test
    await RestClients.destroy({ where: {} });
  });

  after(async () => {
    // Close the database connection after all tests
    await sequelize.close();
  });

  it('should create a new rest client', async () => {
    const restClient = await RestClients.create({
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Main St',
      post: '12345',
      password: 'password123'
    });

    expect(restClient).to.be.an('object');
    expect(restClient.id).to.be.a('number');
    expect(restClient.name).to.equal('John Doe');
    expect(restClient.phone).to.equal('1234567890');
    expect(restClient.address).to.equal('123 Main St');
    expect(restClient.post).to.equal('12345');
    expect(restClient.password).to.equal('password123');
  });

  it('should not create a rest client with empty fields', async () => {
    try {
      await RestClients.create({
        name: '',
        phone: '',
        address: '',
        post: '',
        password: ''
      });
      // The above line should throw an error, so the code should not reach this point
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Validation error: Esse campo não pode estar vazio.');
    }
  });
});