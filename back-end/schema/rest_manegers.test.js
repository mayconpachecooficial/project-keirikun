import chai from 'chai';
import sequelize from '../db';
import RestManagers from './rest_managers';

const expect = chai.expect;

describe('RestManagers Model', () => {
  before(async () => {
    // Sync the database before running the tests
    await sequelize.sync();
  });

  afterEach(async () => {
    // Delete all records after each test
    await RestManagers.destroy({ where: {} });
  });

  after(async () => {
    // Close the database connection after all tests
    await sequelize.close();
  });

  it('should create a new rest manager', async () => {
    const restManager = await RestManagers.create({
      restId: 1,
      workStatus: 1,
      pickupTime: 10,
      cash: 'Cash',
      bank: 'Bank',
      uber: 'Uber',
      square: 'Square',
      cash2: 'Cash2',
      caixa: 'Caixa'
    });

    expect(restManager).to.be.an('object');
    expect(restManager.id).to.be.a('number');
    expect(restManager.restId).to.equal(1);
    expect(restManager.workStatus).to.equal(1);
    expect(restManager.pickupTime).to.equal(10);
    expect(restManager.cash).to.equal('Cash');
    expect(restManager.bank).to.equal('Bank');
    expect(restManager.uber).to.equal('Uber');
    expect(restManager.square).to.equal('Square');
    expect(restManager.cash2).to.equal('Cash2');
    expect(restManager.caixa).to.equal('Caixa');
  });

  it('should not create a rest manager with empty fields', async () => {
    try {
      await RestManagers.create({
        restId: null,
        workStatus: null,
        pickupTime: null,
        cash: '',
        bank: '',
        uber: '',
        square: '',
        cash2: '',
        caixa: ''
      });
      // The above line should throw an error, so the code should not reach this point
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('notNull Violation: rest_manager.restId cannot be null');
    }
  });
});