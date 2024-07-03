import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Historyorders from '../schema/historyorder';

describe('Historyorders', () => {
  let database;
  let historyordersModel;

  before(() => {
    database = new SequelizeMock();
    historyordersModel = Historyorders(database, SequelizeMock);
    historyordersModel.$queueResult(historyordersModel.build({
      id: 1,
      rest_id: 1,
      menu_id: 'menu1',
      menu_child_id: 'child1',
      menu_value: 'Menu Value',
      quantity_menu: '1',
      order_id: 'order1',
      status: 1,
      paykubun: 1,
      obs: 'Test observation',
      pickUp_day: 'Monday',
      pickUp_way: 1,
      client_name: 'John Doe',
      pay_status: 1,
      prepare_status: 1,
      cutlery: 1,
      opt1: 'Option 1',
      opt2: 'Option 2',
      opt3: 'Option 3',
      opt4: 'Option 4',
      opt5: 'Option 5',
      total_amount: 100,
    }));
  });

  it('should create a new historyorder', async () => {
    const historyorder = await historyordersModel.create({
      rest_id: 1,
      menu_id: 'menu1',
      menu_child_id: 'child1',
      menu_value: 'Menu Value',
      quantity_menu: '1',
      order_id: 'order1',
      status: 1,
      paykubun: 1,
      obs: 'Test observation',
      pickUp_day: 'Monday',
      pickUp_way: 1,
      client_name: 'John Doe',
      pay_status: 1,
      prepare_status: 1,
      cutlery: 1,
      opt1: 'Option 1',
      opt2: 'Option 2',
      opt3: 'Option 3',
      opt4: 'Option 4',
      opt5: 'Option 5',
      total_amount: 100,
    });

    expect(historyorder).to.be.an('object');
    expect(historyorder.id).to.equal(1);
    expect(historyorder.rest_id).to.equal(1);
    expect(historyorder.menu_id).to.equal('menu1');
    expect(historyorder.menu_child_id).to.equal('child1');
    expect(historyorder.menu_value).to.equal('Menu Value');
    expect(historyorder.quantity_menu).to.equal('1');
    expect(historyorder.order_id).to.equal('order1');
    expect(historyorder.status).to.equal(1);
    expect(historyorder.paykubun).to.equal(1);
    expect(historyorder.obs).to.equal('Test observation');
    expect(historyorder.pickUp_day).to.equal('Monday');
    expect(historyorder.pickUp_way).to.equal(1);
    expect(historyorder.client_name).to.equal('John Doe');
    expect(historyorder.pay_status).to.equal(1);
    expect(historyorder.prepare_status).to.equal(1);
    expect(historyorder.cutlery).to.equal(1);
    expect(historyorder.opt1).to.equal('Option 1');
    expect(historyorder.opt2).to.equal('Option 2');
    expect(historyorder.opt3).to.equal('Option 3');
    expect(historyorder.opt4).to.equal('Option 4');
    expect(historyorder.opt5).to.equal('Option 5');
    expect(historyorder.total_amount).to.equal(100);
  });
});