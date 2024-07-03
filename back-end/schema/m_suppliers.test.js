import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Suppliers from '../schema/m_suppliers';

describe('Suppliers', () => {
  let database;
  let suppliersModel;

  before(() => {
    database = new SequelizeMock();
    suppliersModel = Suppliers(database, SequelizeMock);
    suppliersModel.$queueResult(suppliersModel.build({
      id: 1,
      name_pt: 'Supplier Name PT',
      name_jp: 'Supplier Name JP',
      adress: 'Supplier Address',
      tel: 'Supplier Tel',
      representative: 'Supplier Representative',
    }));
  });

  it('should create a new supplier', async () => {
    const supplier = await suppliersModel.create({
      name_pt: 'Supplier Name PT',
      name_jp: 'Supplier Name JP',
      adress: 'Supplier Address',
      tel: 'Supplier Tel',
      representative: 'Supplier Representative',
    });

    expect(supplier).to.be.an('object');
    expect(supplier.id).to.equal(1);
    expect(supplier.name_pt).to.equal('Supplier Name PT');
    expect(supplier.name_jp).to.equal('Supplier Name JP');
    expect(supplier.adress).to.equal('Supplier Address');
    expect(supplier.tel).to.equal('Supplier Tel');
    expect(supplier.representative).to.equal('Supplier Representative');
  });
});