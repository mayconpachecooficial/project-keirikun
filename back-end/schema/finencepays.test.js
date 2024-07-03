import chai from 'chai';
import { describe, it } from 'mocha';
import Finencepays from './finencepays';

const expect = chai.expect;

describe('Finencepays Model', () => {
  it('should be an instance of Finencepays', () => {
    const finencepay = new Finencepays();
    expect(finencepay).to.be.an.instanceOf(Finencepays);
  });

  it('should have the correct properties', () => {
    const finencepay = new Finencepays();
    expect(finencepay).to.have.property('id');
    expect(finencepay).to.have.property('GYM_ID');
    expect(finencepay).to.have.property('CATEGORY');
    expect(finencepay).to.have.property('NAME');
    expect(finencepay).to.have.property('VALUE');
    expect(finencepay).to.have.property('COLOR');
    expect(finencepay).to.have.property('KUBUN');
    expect(finencepay).to.have.property('Date');
  });

  it('should have the correct property types', () => {
    const finencepay = new Finencepays();
    expect(finencepay.id).to.be.a('number');
    expect(finencepay.GYM_ID).to.be.a('number');
    expect(finencepay.CATEGORY).to.be.a('string');
    expect(finencepay.NAME).to.be.a('string');
    expect(finencepay.VALUE).to.be.a('string');
    expect(finencepay.COLOR).to.be.a('string');
    expect(finencepay.KUBUN).to.be.a('number');
    expect(finencepay.Date).to.be.a('string');
  });

  it('should have allowNull set correctly', () => {
    const finencepay = new Finencepays();
    expect(finencepay.id).to.not.be.null;
    expect(finencepay.GYM_ID).to.not.be.null;
    expect(finencepay.CATEGORY).to.not.be.null;
    expect(finencepay.NAME).to.not.be.null;
    expect(finencepay.VALUE).to.be.null;
    expect(finencepay.COLOR).to.not.be.null;
    expect(finencepay.KUBUN).to.not.be.null;
    expect(finencepay.Date).to.be.null;
  });
});