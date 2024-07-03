import { expect } from 'chai';
import credentials from '../routs/credentials';

describe('credentials', () => {
  it('should have production credentials', () => {
    expect(credentials.production).to.exist;
    expect(credentials.production.accessToken).to.be.a('string');
    expect(credentials.production.locationId).to.be.a('string');
  });

  it('should have sandbox credentials', () => {
    expect(credentials.sandbox).to.exist;
    expect(credentials.sandbox.squareApplicationId).to.be.a('string');
    expect(credentials.sandbox.accessToken).to.be.a('string');
    expect(credentials.sandbox.locationId).to.be.a('string');
  });
});