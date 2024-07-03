import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Plans from '../schema/plans';

describe('Plans', () => {
  let database;
  let plansModel;

  before(() => {
    database = new SequelizeMock();
    plansModel = Plans(database, SequelizeMock);
    plansModel.$queueResult(plansModel.build({
      ID: 1,
      GYM_ID: 12345,
      PLANS_NAME: 'Basic Plan',
      PLAN_VALOR: '10.99',
      PLAN_KUBUN: 'Kubun',
      PLAN_DISCRITION1: 'Description 1',
      PLAN_DISCRITION2: 'Description 2',
      PLAN_DISCRITION3: 'Description 3',
      PLAN_DISCRITION4: 'Description 4',
      PLAN_DISCRITION5: 'Description 5',
      CONTROL_NAME: 'Control Name',
      AGE: 'Age',
    }));
  });

  it('should create a new plan', async () => {
    const plan = await plansModel.create({
      GYM_ID: 12345,
      PLANS_NAME: 'Basic Plan',
      PLAN_VALOR: '10.99',
      PLAN_KUBUN: 'Kubun',
      PLAN_DISCRITION1: 'Description 1',
      PLAN_DISCRITION2: 'Description 2',
      PLAN_DISCRITION3: 'Description 3',
      PLAN_DISCRITION4: 'Description 4',
      PLAN_DISCRITION5: 'Description 5',
      CONTROL_NAME: 'Control Name',
      AGE: 'Age',
    });

    expect(plan).to.be.an('object');
    expect(plan.ID).to.equal(1);
    expect(plan.GYM_ID).to.equal(12345);
    expect(plan.PLANS_NAME).to.equal('Basic Plan');
    expect(plan.PLAN_VALOR).to.equal('10.99');
    expect(plan.PLAN_KUBUN).to.equal('Kubun');
    expect(plan.PLAN_DISCRITION1).to.equal('Description 1');
    expect(plan.PLAN_DISCRITION2).to.equal('Description 2');
    expect(plan.PLAN_DISCRITION3).to.equal('Description 3');
    expect(plan.PLAN_DISCRITION4).to.equal('Description 4');
    expect(plan.PLAN_DISCRITION5).to.equal('Description 5');
    expect(plan.CONTROL_NAME).to.equal('Control Name');
    expect(plan.AGE).to.equal('Age');
  });
});