import { expect } from 'chai';
import sinon from 'sinon';
import { updateInformation } from './home';

describe('updateInformation', () => {
  let querySelectorStub;

  beforeEach(() => {
    querySelectorStub = sinon.stub(document, 'querySelector');
  });

  afterEach(() => {
    querySelectorStub.restore();
  });

  it('should update the DOM with the correct information', () => {
    const res = {
      success: true,
      message: [
        { status: 'ativo' },
        { status: 'inativo' },
        { status: 'pendente' },
      ],
    };

    updateInformation(res);

    expect(querySelectorStub.calledWith('#geral h1')).to.be.true;
    expect(querySelectorStub.calledWith('#ativo h1')).to.be.true;
    expect(querySelectorStub.calledWith('#inativo h1')).to.be.true;

    expect(querySelectorStub.firstCall.returnValue.innerText).to.equal('3');
    expect(querySelectorStub.secondCall.returnValue.innerText).to.equal('1');
    expect(querySelectorStub.thirdCall.returnValue.innerText).to.equal('2');
  });

  it('should not update the DOM if the response is not successful', () => {
    const res = {
      success: false,
      message: [],
    };

    updateInformation(res);

    expect(querySelectorStub.called).to.be.false;
  });
});