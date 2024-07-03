import { expect } from 'chai';
import sinon from 'sinon';
import Swal from 'sweetalert2';
import { update, updateRefresh } from './update';

describe('update', () => {
  let localStorageGetItemStub;
  let documentQuerySelectorStub;
  let fetchStub;
  let SwalShowLoadingStub;
  let SwalFireStub;
  let localStorageSetItemStub;
  let updateRefreshStub;
  let setTimeoutStub;

  beforeEach(() => {
    localStorageGetItemStub = sinon.stub(localStorage, 'getItem');
    documentQuerySelectorStub = sinon.stub(document, 'querySelector');
    fetchStub = sinon.stub(window, 'fetch');
    SwalShowLoadingStub = sinon.stub(Swal, 'showLoading');
    SwalFireStub = sinon.stub(Swal, 'fire');
    localStorageSetItemStub = sinon.stub(localStorage, 'setItem');
    updateRefreshStub = sinon.stub(window, 'updateRefresh');
    setTimeoutStub = sinon.stub(window, 'setTimeout');
  });

  afterEach(() => {
    localStorageGetItemStub.restore();
    documentQuerySelectorStub.restore();
    fetchStub.restore();
    SwalShowLoadingStub.restore();
    SwalFireStub.restore();
    localStorageSetItemStub.restore();
    updateRefreshStub.restore();
    setTimeoutStub.restore();
  });

  it('should make a PUT request to update the user', () => {
    const id = 'sampleId';
    const name = { value: 'John Doe' };
    const cpf = { value: '123456789' };
    const telefone = { value: '987654321' };
    const email = { value: 'john.doe@example.com' };
    const password = { value: 'password123' };
    const url = `${global.urlApi}/update/user/${id}`;

    localStorageGetItemStub.withArgs('idselected').returns(id);
    documentQuerySelectorStub.withArgs('#name').returns(name);
    documentQuerySelectorStub.withArgs('#cpf').returns(cpf);
    documentQuerySelectorStub.withArgs('#telefone').returns(telefone);
    documentQuerySelectorStub.withArgs('#email').returns(email);
    documentQuerySelectorStub.withArgs('#pwd').returns(password);

    update();

    expect(SwalShowLoadingStub.calledOnce).to.be.true;
    expect(fetchStub.calledOnceWith(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        name: name.value,
        cpf: cpf.value,
        telefone: telefone.value,
        email: email.value,
        password: password.value,
      }),
    })).to.be.true;
  });

  it('should show a success message and call updateRefresh when the update is successful', () => {
    const id = 'sampleId';
    const url = `${global.urlApi}/update/user/${id}`;
    const response = { success: true };

    localStorageGetItemStub.withArgs('idselected').returns(id);
    fetchStub.withArgs(url).resolves({ json: () => Promise.resolve(response) });

    return update().then(() => {
      expect(SwalFireStub.calledOnceWith({
        title: 'Atualizado com sucesso',
        icon: 'success',
      })).to.be.true;
      expect(localStorageSetItemStub.calledOnceWith('idselected', false)).to.be.true;
      expect(updateRefreshStub.calledOnce).to.be.true;
    });
  });
});

describe('updateRefresh', () => {
  let localStorageGetItemStub;
  let documentQuerySelectorStub;
  let fetchStub;
  let SwalCloseStub;

  beforeEach(() => {
    localStorageGetItemStub = sinon.stub(localStorage, 'getItem');
    documentQuerySelectorStub = sinon.stub(document, 'querySelector');
    fetchStub = sinon.stub(window, 'fetch');
    SwalCloseStub = sinon.stub(Swal, 'close');
  });

  afterEach(() => {
    localStorageGetItemStub.restore();
    documentQuerySelectorStub.restore();
    fetchStub.restore();
    SwalCloseStub.restore();
  });

  it('should fetch the user data and update the form fields', () => {
    const id = 'sampleId';
    const name = { value: '' };
    const cpf = { value: '' };
    const telefone = { value: '' };
    const email = { value: '' };
    const password = { value: '' };
    const url = `${global.urlApi}/update/user/${id}`;
    const response = {
      message: [{
        user: 'John Doe',
        cpf: '123456789',
        telefone: '987654321',
        email: 'john.doe@example.com',
        password_user: 'password123',
      }],
    };

    localStorageGetItemStub.withArgs('idselected').returns(id);
    documentQuerySelectorStub.withArgs('#name').returns(name);
    documentQuerySelectorStub.withArgs('#cpf').returns(cpf);
    documentQuerySelectorStub.withArgs('#telefone').returns(telefone);
    documentQuerySelectorStub.withArgs('#email').returns(email);
    documentQuerySelectorStub.withArgs('#pwd').returns(password);
    fetchStub.withArgs(url).resolves({ json: () => Promise.resolve(response) });

    return updateRefresh().then(() => {
      expect(name.value).to.equal(response.message[0].user);
      expect(cpf.value).to.equal(response.message[0].cpf);
      expect(telefone.value).to.equal(response.message[0].telefone);
      expect(email.value).to.equal(response.message[0].email);
      expect(password.value).to.equal(response.message[0].password_user);
      expect(SwalCloseStub.calledOnce).to.be.true;
    });
  });
});