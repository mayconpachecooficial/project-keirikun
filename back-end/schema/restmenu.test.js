import chai from 'chai';
import sequelize from '../db';
import RestMenus from './restmenu';

const expect = chai.expect;

describe('RestMenus Model', () => {
  before(async () => {
    // Sync the database before running the tests
    await sequelize.sync();
  });

  afterEach(async () => {
    // Delete all records after each test
    await RestMenus.destroy({ where: {} });
  });

  after(async () => {
    // Close the database connection after all tests
    await sequelize.close();
  });

  it('should create a new rest menu', async () => {
    const restMenu = await RestMenus.create({
      menu_id: 1,
      menu_child_id: 1,
      menu_name_0: 'Menu 1',
      menu_name_1: 'Menu 1 EN',
      menu_name_2: 'Menu 1 JP',
      menu_value: 'Value 1',
      rest_id: 1,
      control_name: 'Control 1',
      status: 1,
      bbq_kubun: 1,
      display_number: 1,
      zairyo: 'Zairyo 1',
      zairyoqt: 'Zairyoqt 1',
      zairyotp: 'Zairyotp 1',
      option1: 1,
      option2: 1,
      option3: 1,
      option4: 1,
      detail_pt: 'Detail PT 1',
      detail_en: 'Detail EN 1',
      detail_jp: 'Detail JP 1',
      use_id: 'Use ID 1',
      use_qt: 'Use QT 1',
      option5: 1
    });

    expect(restMenu).to.be.an('object');
    expect(restMenu.id).to.be.a('number');
    expect(restMenu.menu_id).to.equal(1);
    expect(restMenu.menu_child_id).to.equal(1);
    expect(restMenu.menu_name_0).to.equal('Menu 1');
    expect(restMenu.menu_name_1).to.equal('Menu 1 EN');
    expect(restMenu.menu_name_2).to.equal('Menu 1 JP');
    expect(restMenu.menu_value).to.equal('Value 1');
    expect(restMenu.rest_id).to.equal(1);
    expect(restMenu.control_name).to.equal('Control 1');
    expect(restMenu.status).to.equal(1);
    expect(restMenu.bbq_kubun).to.equal(1);
    expect(restMenu.display_number).to.equal(1);
    expect(restMenu.zairyo).to.equal('Zairyo 1');
    expect(restMenu.zairyoqt).to.equal('Zairyoqt 1');
    expect(restMenu.zairyotp).to.equal('Zairyotp 1');
    expect(restMenu.option1).to.equal(1);
    expect(restMenu.option2).to.equal(1);
    expect(restMenu.option3).to.equal(1);
    expect(restMenu.option4).to.equal(1);
    expect(restMenu.detail_pt).to.equal('Detail PT 1');
    expect(restMenu.detail_en).to.equal('Detail EN 1');
    expect(restMenu.detail_jp).to.equal('Detail JP 1');
    expect(restMenu.use_id).to.equal('Use ID 1');
    expect(restMenu.use_qt).to.equal('Use QT 1');
    expect(restMenu.option5).to.equal(1);
  });

  it('should not create a rest menu with empty fields', async () => {
    try {
      await RestMenus.create({
        menu_id: null,
        menu_child_id: null,
        menu_name_0: '',
        menu_name_1: '',
        menu_name_2: '',
        menu_value: '',
        rest_id: null,
        control_name: '',
        status: null,
        bbq_kubun: null,
        display_number: null,
        zairyo: '',
        zairyoqt: '',
        zairyotp: '',
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        detail_pt: '',
        detail_en: '',
        detail_jp: '',
        use_id: '',
        use_qt: '',
        option5: null
      });
      // The above line should throw an error, so the code should not reach this point
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('notNull Violation: restmenu.menu_id cannot be null');
    }
  });
});