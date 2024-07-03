import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import MembersCount from '../schema/member_count';

describe('MembersCount', () => {
  let database;
  let membersCountModel;

  before(() => {
    database = new SequelizeMock();
    membersCountModel = MembersCount(database, SequelizeMock);
    membersCountModel.$queueResult(membersCountModel.build({
      id: 1,
      GYM_ID: 123,
      YEAR: '2022',
      MOUNTH: 'January',
      COUNT: '100',
    }));
  });

  it('should create a new members count', async () => {
    const membersCount = await membersCountModel.create({
      GYM_ID: 123,
      YEAR: '2022',
      MOUNTH: 'January',
      COUNT: '100',
    });

    expect(membersCount).to.be.an('object');
    expect(membersCount.id).to.equal(1);
    expect(membersCount.GYM_ID).to.equal(123);
    expect(membersCount.YEAR).to.equal('2022');
    expect(membersCount.MOUNTH).to.equal('January');
    expect(membersCount.COUNT).to.equal('100');
  });
});