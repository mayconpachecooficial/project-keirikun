import chai from 'chai';
import sequelize from './db';

const expect = chai.expect;

describe('Sequelize Tests', () => {
  it('should be an instance of Sequelize', () => {
    expect(sequelize).to.be.an.instanceOf(sequelize);
  });

  it('should have the correct database configuration', () => {
    expect(sequelize.config.database).to.equal('defaultdb');
    expect(sequelize.config.username).to.equal('doadmin');
    expect(sequelize.config.password).to.equal('AVNS_HzTD1mdcLG5r73POOIr');
    expect(sequelize.config.dialect).to.equal('mysql');
    expect(sequelize.config.host).to.equal('db-mysql-nyc1-46829-do-user-12541529-0.b.db.ondigitalocean.com');
    expect(sequelize.config.port).to.equal(25060);
  });
});describe('Sequelize Tests', () => {
  // ...

  it('should have the correct database configuration', () => {
    // ...
  });

  it('should have the correct Sequelize version', () => {
    expect(sequelize.constructor.name).to.equal('Sequelize');
    expect(sequelize.constructor.version).to.equal(Sequelize.version);
  });
});