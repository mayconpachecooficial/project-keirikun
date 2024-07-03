import { expect } from 'chai';
import sinon from 'sinon';
import SequelizeMock from 'sequelize-mock';
import Dakokus from '../schema/dakoku';

describe('Dakokus', () => {
  let database;
  let dakokusModel;

  before(() => {
    database = new SequelizeMock();
    dakokusModel = Dakokus(database, SequelizeMock);
    dakokusModel.$queueResult(dakokusModel.build({
      id: 1,
      worker_id: 1,
      st: 'Start Time',
      fn: 'Finish Time',
      workday: 'Workday',
    }));
  });

  it('should create a new dakoku', async () => {
    const dakoku = await dakokusModel.create({
      worker_id: 1,
      st: 'Start Time',
      fn: 'Finish Time',
      workday: 'Workday',
    });

    expect(dakoku).to.be.an('object');
    expect(dakoku.id).to.equal(1);
    expect(dakoku.worker_id).to.equal(1);
    expect(dakoku.st).to.equal('Start Time');
    expect(dakoku.fn).to.equal('Finish Time');
    expect(dakoku.workday).to.equal('Workday');
  });
});