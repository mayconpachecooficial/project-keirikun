import { expect } from 'chai';
import sinon from 'sinon';
import { swalldeatalShow } from './loginadminRest';

describe('swalldeatalShow', () => {
  let swalOpenStub;

  beforeEach(() => {
    swalOpenStub = sinon.stub(window, 'swalOpen');
  });

  afterEach(() => {
    swalOpenStub.restore();
  });

  it('should open a Swal modal with the correct HTML content', () => {
    const data = 'sample data';

    swalldeatalShow(data);

    expect(swalOpenStub.calledOnce).to.be.true;
    expect(swalOpenStub.firstCall.args[0]).to.equal(data);
  });
});