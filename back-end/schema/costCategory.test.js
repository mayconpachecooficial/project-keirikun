import chai from 'chai';
import { describe, it } from 'mocha';
import Costcategory from './costCategory';

const expect = chai.expect;

describe('Costcategory Model', () => {
  it('should create a new Costcategory instance', () => {
    const costCategory = Costcategory.build({
      control_id: 1,
      name_jp: 'Japanese Name',
      name_pt: 'Portuguese Name',
      icon_id: 1,
      tax: 10,
      tax_kubun: 1,
    });

    expect(costCategory).to.be.an.instanceOf(Costcategory);
    expect(costCategory.control_id).to.equal(1);
    expect(costCategory.name_jp).to.equal('Japanese Name');
    expect(costCategory.name_pt).to.equal('Portuguese Name');
    expect(costCategory.icon_id).to.equal(1);
    expect(costCategory.tax).to.equal(10);
    expect(costCategory.tax_kubun).to.equal(1);
  });

  // Add more tests for other scenarios...
});