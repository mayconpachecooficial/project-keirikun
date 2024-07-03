import { expect } from 'chai';
import SequelizeMock from 'sequelize-mock';
import Expenses from '../schema/expenses';

describe('Expenses', () => {
  let database;
  let expensesModel;

  before(() => {
    database = new SequelizeMock();
    expensesModel = Expenses(database, SequelizeMock);
    expensesModel.$queueResult(expensesModel.build({
      id: 1,
      category: 123.45,
      expense_id: 678.90,
      GYM_ID: 'GYM123',
      NAME: 'Expense Name',
      KAKAKU: '150.00',
      COLOR: 'Red',
      KUBUN: 1,
      STATUS: 2,
      Date: '2022-01-01',
      note: 'Expense note',
    }));
  });

  it('should create a new expense', async () => {
    const expense = await expensesModel.create({
      category: 123.45,
      expense_id: 678.90,
      GYM_ID: 'GYM123',
      NAME: 'Expense Name',
      KAKAKU: '150.00',
      COLOR: 'Red',
      KUBUN: 1,
      STATUS: 2,
      Date: '2022-01-01',
      note: 'Expense note',
    });

    expect(expense).to.be.an('object');
    expect(expense.id).to.equal(1);
    expect(expense.category).to.equal(123.45);
    expect(expense.expense_id).to.equal(678.90);
    expect(expense.GYM_ID).to.equal('GYM123');
    expect(expense.NAME).to.equal('Expense Name');
    expect(expense.KAKAKU).to.equal('150.00');
    expect(expense.COLOR).to.equal('Red');
    expect(expense.KUBUN).to.equal(1);
    expect(expense.STATUS).to.equal(2);
    expect(expense.Date).to.equal('2022-01-01');
    expect(expense.note).to.equal('Expense note');
  });
});