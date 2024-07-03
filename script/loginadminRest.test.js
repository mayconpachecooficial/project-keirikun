import { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';

// Import the function to be tested
import { loginRequest } from './loginadminRest';

describe('loginRequest', () => {
  let axiosPostStub;
  let sessionStorageSetItemStub;
  let windowLocationStub;
  let swalOpenStub;

  beforeEach(() => {
    axiosPostStub = sinon.stub(axios, 'post');
    sessionStorageSetItemStub = sinon.stub(sessionStorage, 'setItem');
    windowLocationStub = sinon.stub(window, 'location', ['value']);
    swalOpenStub = sinon.stub(window, 'swalOpen');
  });

  afterEach(() => {
    axiosPostStub.restore();
    sessionStorageSetItemStub.restore();
    windowLocationStub.restore();
    swalOpenStub.restore();
  });

  it('should set session storage and redirect to index.html on successful login', async () => {
    const response = {
      status: 200,
      data: {
        success: true,
        obj: [
          {
            user: 'John Doe',
            id: 123
          }
        ]
      }
    };

    axiosPostStub.resolves(response);

    await loginRequest('john', 'password');

    expect(axiosPostStub.calledOnce).to.be.true;
    expect(axiosPostStub.firstCall.args[0]).to.equal(`${accessMainServer}/authRestmember`);
    expect(axiosPostStub.firstCall.args[1]).to.deep.equal({
      numbers: 'john',
      password: 'password'
    });

    expect(sessionStorageSetItemStub.calledTwice).to.be.true;
    expect(sessionStorageSetItemStub.firstCall.args[0]).to.equal('name');
    expect(sessionStorageSetItemStub.firstCall.args[1]).to.equal('John Doe');
    expect(sessionStorageSetItemStub.secondCall.args[0]).to.equal('id');
    expect(sessionStorageSetItemStub.secondCall.args[1]).to.equal(123);

    expect(windowLocationStub.value).to.equal('../index.html');
    expect(swalOpenStub.notCalled).to.be.true;
  });

  it('should display error message and clear password field on failed login', async () => {
    const response = {
      status: 200,
      data: {
        success: false
      }
    };

    axiosPostStub.resolves(response);

    await loginRequest('john', 'password');

    expect(axiosPostStub.calledOnce).to.be.true;
    expect(axiosPostStub.firstCall.args[0]).to.equal(`${accessMainServer}/authRestmember`);
    expect(axiosPostStub.firstCall.args[1]).to.deep.equal({
      numbers: 'john',
      password: 'password'
    });

    expect(sessionStorageSetItemStub.notCalled).to.be.true;

    expect(windowLocationStub.notCalled).to.be.true;

    expect(swalOpenStub.calledOnce).to.be.true;
    expect(swalOpenStub.firstCall.args[0]).to.equal('Check username and password');
    expect(document.getElementById('pass').value).to.equal('');
  });

  it('should display error message and clear password field on login request failure', async () => {
    axiosPostStub.rejects();

    await loginRequest('john', 'password');

    expect(axiosPostStub.calledOnce).to.be.true;
    expect(axiosPostStub.firstCall.args[0]).to.equal(`${accessMainServer}/authRestmember`);
    expect(axiosPostStub.firstCall.args[1]).to.deep.equal({
      numbers: 'john',
      password: 'password'
    });

    expect(sessionStorageSetItemStub.notCalled).to.be.true;

    expect(windowLocationStub.notCalled).to.be.true;

    expect(swalOpenStub.calledOnce).to.be.true;
    expect(swalOpenStub.firstCall.args[0]).to.equal('Check username and password');
    expect(document.getElementById('pass').value).to.equal('');
  });
});