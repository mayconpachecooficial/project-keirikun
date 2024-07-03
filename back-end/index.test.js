import chai from 'chai';
import { port } from '../index';

const expect = chai.expect;

describe('Port', () => {
  it('should be a number', () => {
    expect(port).to.be.a('number');
  });

  it('should be either the value from process.env.PORT or 3000', () => {
    expect(port).to.satisfy((value) => value === process.env.PORT || value === 3000);
  });
});