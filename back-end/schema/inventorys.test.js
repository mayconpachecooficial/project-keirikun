import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Inventory from '../schema/inventorys';

describe('Inventory', () => {
  let database;
  let inventoryModel;

  before(() => {
    database = new SequelizeMock();
    inventoryModel = Inventory(database, SequelizeMock);
    inventoryModel.$queueResult(inventoryModel.build({
      id: 1,
      restaurantId: 1,
      name: 'Inventory Item',
      quantity: 10,
      cust: 1,
      updatedAt: '2022-01-01',
      category: 'Category',
      mercado: 'Mercado',
      kijun: 1,
      tani: 'Unit',
      supplierId: 1,
    }));
  });

  it('should create a new inventory item', async () => {
    const inventoryItem = await inventoryModel.create({
      restaurantId: 1,
      name: 'Inventory Item',
      quantity: 10,
      cust: 1,
      updatedAt: '2022-01-01',
      category: 'Category',
      mercado: 'Mercado',
      kijun: 1,
      tani: 'Unit',
      supplierId: 1,
    });

    expect(inventoryItem).to.be.an('object');
    expect(inventoryItem.id).to.equal(1);
    expect(inventoryItem.restaurantId).to.equal(1);
    expect(inventoryItem.name).to.equal('Inventory Item');
    expect(inventoryItem.quantity).to.equal(10);
    expect(inventoryItem.cust).to.equal(1);
    expect(inventoryItem.updatedAt).to.equal('2022-01-01');
    expect(inventoryItem.category).to.equal('Category');
    expect(inventoryItem.mercado).to.equal('Mercado');
    expect(inventoryItem.kijun).to.equal(1);
    expect(inventoryItem.tani).to.equal('Unit');
    expect(inventoryItem.supplierId).to.equal(1);
  });
});