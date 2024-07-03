import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Members from '../schema/members';

describe('Members', () => {
  let database;
  let membersModel;

  before(() => {
    database = new SequelizeMock();
    membersModel = Members(database, SequelizeMock);
    membersModel.$queueResult(membersModel.build({
      id: 1,
      nm_member: 'John Doe',
      birthday_year: 1990,
      birthday_month: 1,
      birthday_day: 1,
      birthday_age: 31,
      genero: 'Male',
      adress_input: '123 Main St',
      phone01: 1234567890,
      phone02: 9876543210,
      phone03: 5555555555,
      email: 'john.doe@example.com',
      lang01: 'English',
      plans: 'Basic',
      status: 'Active',
      signature: 'Lorem ipsum dolor sit amet',
      pass: 1234,
      gym: 'Gym Name',
      gymid: 'Gym ID',
      active_date: '2022-01-01',
      inactive_date: '2022-12-31',
    }));
  });

  it('should create a new member', async () => {
    const member = await membersModel.create({
      nm_member: 'John Doe',
      birthday_year: 1990,
      birthday_month: 1,
      birthday_day: 1,
      birthday_age: 31,
      genero: 'Male',
      adress_input: '123 Main St',
      phone01: 1234567890,
      phone02: 9876543210,
      phone03: 5555555555,
      email: 'john.doe@example.com',
      lang01: 'English',
      plans: 'Basic',
      status: 'Active',
      signature: 'Lorem ipsum dolor sit amet',
      pass: 1234,
      gym: 'Gym Name',
      gymid: 'Gym ID',
      active_date: '2022-01-01',
      inactive_date: '2022-12-31',
    });

    expect(member).to.be.an('object');
    expect(member.id).to.equal(1);
    expect(member.nm_member).to.equal('John Doe');
    expect(member.birthday_year).to.equal(1990);
    expect(member.birthday_month).to.equal(1);
    expect(member.birthday_day).to.equal(1);
    expect(member.birthday_age).to.equal(31);
    expect(member.genero).to.equal('Male');
    expect(member.adress_input).to.equal('123 Main St');
    expect(member.phone01).to.equal(1234567890);
    expect(member.phone02).to.equal(9876543210);
    expect(member.phone03).to.equal(5555555555);
    expect(member.email).to.equal('john.doe@example.com');
    expect(member.lang01).to.equal('English');
    expect(member.plans).to.equal('Basic');
    expect(member.status).to.equal('Active');
    expect(member.signature).to.equal('Lorem ipsum dolor sit amet');
    expect(member.pass).to.equal(1234);
    expect(member.gym).to.equal('Gym Name');
    expect(member.gymid).to.equal('Gym ID');
    expect(member.active_date).to.equal('2022-01-01');
    expect(member.inactive_date).to.equal('2022-12-31');
  });
});