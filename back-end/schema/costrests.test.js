import { expect } from 'chai';
import sinon from 'sinon';
import SequelizeMock from 'sequelize-mock';
import Costrests from '../schema/costrests';
import mSuppliers from '../schema/m_suppliers';
import costCategory from '../schema/costCategory';

describe('Costrests', () => {
  let database;
  let costrestsModel;

  before(() => {
    database = new SequelizeMock();
    costrestsModel = Costrests(database, SequelizeMock);
    costrestsModel.$queueResult(costrestsModel.build({
      id: 1,
      rest_id: 1,
      worker_id: 1,
      cost_id: 1,
      amount: 100.0,
      payday: new Date(),
      memo: 'Test memo',
      paykubun: 1,
      status: 1,
      seq: 1,
      suppliers_id: 1,
      checked_kubun: 1,
      category: 1,
    }));
  });

  it('should create a new costrest', async () => {
    const costrest = await costrestsModel.create({
      rest_id: 1,
      worker_id: 1,
      cost_id: 1,
      amount: 100.0,
      payday: new Date(),
      memo: 'Test memo',
      paykubun: 1,
      status: 1,
      seq: 1,
      suppliers_id: 1,
      checked_kubun: 1,
      category: 1,
    });

    expect(costrest).to.be.an('object');
    expect(costrest.id).to.equal(1);
    expect(costrest.rest_id).to.equal(1);
    expect(costrest.worker_id).to.equal(1);
    expect(costrest.cost_id).to.equal(1);
    expect(costrest.amount).to.equal(100.0);
    expect(costrest.payday).to.be.a('date');
    expect(costrest.memo).to.equal('Test memo');
    expect(costrest.paykubun).to.equal(1);
    expect(costrest.status).to.equal(1);
    expect(costrest.seq).to.equal(1);
    expect(costrest.suppliers_id).to.equal(1);
    expect(costrest.checked_kubun).to.equal(1);
    expect(costrest.category).to.equal(1);
  });

  it('should associate with mSuppliers', async () => {
    const supplier = await mSuppliers.create({
      id: 1,
      name: 'Supplier 1',
    });

    const costrest = await costrestsModel.findByPk(1);
    await costrest.setSupplier(supplier);

    const associatedSupplier = await costrest.getSupplier();

    expect(associatedSupplier).to.be.an('object');
    expect(associatedSupplier.id).to.equal(1);
    expect(associatedSupplier.name).to.equal('Supplier 1');
  });

  it('should associate with costCategory', async () => {
    const category = await costCategory.create({
      control_id: 1,
      name: 'Category 1',
    });

    const costrest = await costrestsModel.findByPk(1);
    await costrest.setKamokus(category);

    const associatedCategory = await costrest.getKamokus();

    expect(associatedCategory).to.be.an('object');
    expect(associatedCategory.control_id).to.equal(1);
    expect(associatedCategory.name).to.equal('Category 1');
  });
});