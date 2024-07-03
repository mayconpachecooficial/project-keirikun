import chai from 'chai';
import sequelize from '../db';
import Restadmins from './restadmins';

const expect = chai.expect;

describe('Restadmins Model', () => {
  before(async () => {
    // Sync the database before running the tests
    await sequelize.sync();
  });

  afterEach(async () => {
    // Delete all records after each test
    await Restadmins.destroy({ where: {} });
  });

  after(async () => {
    // Close the database connection after all tests
    await sequelize.close();
  });

  it('should create a new rest admin', async () => {
    const restAdmin = await Restadmins.create({
      rest_id: 'example_rest_id',
      worker_name: 'John Doe',
      adress: '123 Main St',
      password: 'password123',
      status: 'active',
      language: 1
    });

    expect(restAdmin).to.be.an('object');
    expect(restAdmin.id).to.be.a('number');
    expect(restAdmin.rest_id).to.equal('example_rest_id');
    expect(restAdmin.worker_name).to.equal('John Doe');
    expect(restAdmin.adress).to.equal('123 Main St');
    expect(restAdmin.password).to.equal('password123');
    expect(restAdmin.status).to.equal('active');
    expect(restAdmin.language).to.equal(1);
  });

  it('should not create a rest admin with empty fields', async () => {
    try {
      await Restadmins.create({
        rest_id: '',
        worker_name: '',
        adress: '',
        password: '',
        status: '',
        language: null
      });
      // The above line should throw an error, so the code should not reach this point
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Validation error: Esse campo não pode está vazio..');
    }
  });
});