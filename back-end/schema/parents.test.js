import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Parents from '../schema/parents';

describe('Parents', () => {
  let database;
  let parentsModel;

  before(() => {
    database = new SequelizeMock();
    parentsModel = Parents(database, SequelizeMock);
    parentsModel.$queueResult(parentsModel.build({
      id: 1,
      family_name: 'John Doe',
      birthday: '1990-01-01',
      birthday_age: '31',
      gender: 'Male',
      gymid: 'Gym ID',
      nm_member_id: 12345,
    }));
  });

  it('should create a new parent', async () => {
    const parent = await parentsModel.create({
      family_name: 'John Doe',
      birthday: '1990-01-01',
      birthday_age: '31',
      gender: 'Male',
      gymid: 'Gym ID',
      nm_member_id: 12345,
    });

    expect(parent).to.be.an('object');
    expect(parent.id).to.equal(1);
    expect(parent.family_name).to.equal('John Doe');
    expect(parent.birthday).to.equal('1990-01-01');
    expect(parent.birthday_age).to.equal('31');
    expect(parent.gender).to.equal('Male');
    expect(parent.gymid).to.equal('Gym ID');
    expect(parent.nm_member_id).to.equal(12345);
  });
});