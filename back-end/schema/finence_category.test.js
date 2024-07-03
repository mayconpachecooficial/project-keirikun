import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Finence_categorys from '../schema/finence_category';

describe('Finence_categorys', () => {
  let database;
  let finenceCategorysModel;

  before(() => {
    database = new SequelizeMock();
    finenceCategorysModel = Finence_categorys(database, SequelizeMock);
    finenceCategorysModel.$queueResult(finenceCategorysModel.build({
      id: 1,
      GYM_ID: 123.45,
      CATEGORY: 'Category Name',
      KUBUN: 1,
      COLOR: 'Red',
    }));
  });

  it('should create a new finence category', async () => {
    const finenceCategory = await finenceCategorysModel.create({
      GYM_ID: 123.45,
      CATEGORY: 'Category Name',
      KUBUN: 1,
      COLOR: 'Red',
    });

    expect(financeCategory).to.be.an('object');
    expect(financeCategory.id).to.equal(1);
    expect(financeCategory.GYM_ID).to.equal(123.45);
    expect(financeCategory.CATEGORY).to.equal('Category Name');
    expect(financeCategory.KUBUN).to.equal(1);
    expect(financeCategory.COLOR).to.equal('Red');
  });
});