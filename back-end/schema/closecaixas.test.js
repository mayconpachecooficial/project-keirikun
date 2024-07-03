import chai from 'chai';
import { describe, it } from 'mocha';
import CloseCaixas from './closecaixas';

const expect = chai.expect;

describe('CloseCaixas Model', () => {
  it('should create a new CloseCaixas instance', () => {
    const closeCaixa = CloseCaixas.build({
      rest_id: 1,
      p_day: 'Monday',
      create_id: 1,
      finel_id: 1,
      start: 100,
      uber: 50,
      squere: 30,
      demae: 20,
      final: 200,
      obs: 'Some observation',
    });

    expect(closeCaixa).to.be.an.instanceOf(CloseCaixas);
    expect(closeCaixa.rest_id).to.equal(1);
    expect(closeCaixa.p_day).to.equal('Monday');
    expect(closeCaixa.create_id).to.equal(1);
    expect(closeCaixa.finel_id).to.equal(1);
    expect(closeCaixa.start).to.equal(100);
    expect(closeCaixa.uber).to.equal(50);
    expect(closeCaixa.squere).to.equal(30);
    expect(closeCaixa.demae).to.equal(20);
    expect(closeCaixa.final).to.equal(200);
    expect(closeCaixa.obs).to.equal('Some observation');
  });

  // Add more tests for other scenarios...
});