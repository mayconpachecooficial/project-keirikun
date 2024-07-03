import chai from 'chai';
import { Ie } from './swal';

const expect = chai.expect;

describe('Ie Tests', () => {
  it('should return the correct element for input type "text"', () => {
    const input = document.createElement('input');
    input.type = 'text';
    const result = Ie(input);
    expect(result).to.equal(input);
  });

  it('should return the correct element for input type "email"', () => {
    const input = document.createElement('input');
    input.type = 'email';
    const result = Ie(input);
    expect(result).to.equal(input);
  });

  // Add more tests for other input types...
});