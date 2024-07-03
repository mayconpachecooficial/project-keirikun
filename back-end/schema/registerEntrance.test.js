import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Entrance from '../schema/registerEntrance';

describe('Entrance', () => {
  let database;
  let entranceModel;

  before(() => {
    database = new SequelizeMock();
    entranceModel = Entrance(database, SequelizeMock);
    entranceModel.$queueResult(entranceModel.build({
      id: 1,
      LESSON_NAME: 'Sample Lesson',
      LESSON_HOUR: '10:00 AM',
      MEMBER_ID: 12345,
      GYM_ID: 67890,
      LESSON_DAY: 1,
      LESSON_DATE: '2022-01-01',
    }));
  });

  it('should create a new entrance', async () => {
    const entrance = await entranceModel.create({
      LESSON_NAME: 'Sample Lesson',
      LESSON_HOUR: '10:00 AM',
      MEMBER_ID: 12345,
      GYM_ID: 67890,
      LESSON_DAY: 1,
      LESSON_DATE: '2022-01-01',
    });

    expect(entrance).to.be.an('object');
    expect(entrance.id).to.equal(1);
    expect(entrance.LESSON_NAME).to.equal('Sample Lesson');
    expect(entrance.LESSON_HOUR).to.equal('10:00 AM');
    expect(entrance.MEMBER_ID).to.equal(12345);
    expect(entrance.GYM_ID).to.equal(67890);
    expect(entrance.LESSON_DAY).to.equal(1);
    expect(entrance.LESSON_DATE).to.equal('2022-01-01');
  });
});