import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Payment from '../schema/payment';

describe('Payment', () => {
  let database;
  let paymentModel;

  before(() => {
    database = new SequelizeMock();
    paymentModel = Payment(database, SequelizeMock);
    paymentModel.$queueResult(paymentModel.build({
      id: 1,
      nm_member_id: 12345,
      nm_member: 'John Doe',
      year: '2022',
      month: 'January',
      division: 1,
      obs: 'Some observation',
      plan: 'Basic',
      plan_value: '10.99',
      gym_id: 'Gym ID',
    }));
  });

  it('should create a new payment', async () => {
    const payment = await paymentModel.create({
      nm_member_id: 12345,
      nm_member: 'John Doe',
      year: '2022',
      month: 'January',
      division: 1,
      obs: 'Some observation',
      plan: 'Basic',
      plan_value: '10.99',
      gym_id: 'Gym ID',
    });

    expect(payment).to.be.an('object');
    expect(payment.id).to.equal(1);
    expect(payment.nm_member_id).to.equal(12345);
    expect(payment.nm_member).to.equal('John Doe');
    expect(payment.year).to.equal('2022');
    expect(payment.month).to.equal('January');
    expect(payment.division).to.equal(1);
    expect(payment.obs).to.equal('Some observation');
    expect(payment.plan).to.equal('Basic');
    expect(payment.plan_value).to.equal('10.99');
    expect(payment.gym_id).to.equal('Gym ID');
  });
});