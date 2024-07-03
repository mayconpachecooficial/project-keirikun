import { expect } from 'chai';
import sinon from 'sinon';
import { enviarFormulario } from './create';

describe('enviarFormulario', () => {
  let fetchStub;
  let swalShowLoadingStub;
  let swalFireStub;
  let documentQuerySelectorStub;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch');
    swalShowLoadingStub = sinon.stub(window.Swal, 'showLoading');
    swalFireStub = sinon.stub(window.Swal, 'fire');
    documentQuerySelectorStub = sinon.stub(document, 'querySelector');
  });

  afterEach(() => {
    fetchStub.restore();
    swalShowLoadingStub.restore();
    swalFireStub.restore();
    documentQuerySelectorStub.restore();
  });

  it('should send a POST request with the correct data', () => {
    const name = 'John Doe';
    const cpf = '123456789';
    const telefone = '1234567890';
    const email = 'john.doe@example.com';
    const password = 'password';

    documentQuerySelectorStub.withArgs('#name').returns({ value: name });
    documentQuerySelectorStub.withArgs('#cpf').returns({ value: cpf });
    documentQuerySelectorStub.withArgs('#telefone').returns({ value: telefone });
    documentQuerySelectorStub.withArgs('#email').returns({ value: email });
    documentQuerySelectorStub.withArgs('#pwd').returns({ value: password });

    const expectedData = {
      name,
      cpf,
      telefone,
      email,
      password,
      status: 'pendente'
    };

    const expectedConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expectedData)
    };

    const expectedUrl = `${global.urlApi}/create/user`;

    enviarFormulario(new Event('submit'));

    expect(fetchStub.calledOnceWithExactly(expectedUrl, expectedConfig)).to.be.true;
  });

  it('should show loading when submitting the form', () => {
    enviarFormulario(new Event('submit'));

    expect(swalShowLoadingStub.calledOnce).to.be.true;
  });

  it('should display success message and clear form fields when response is successful', async () => {
    const successResponse = { success: true };

    fetchStub.resolves({
      json: sinon.stub().resolves(successResponse)
    });

    await enviarFormulario(new Event('submit'));

    expect(swalFireStub.calledOnceWithExactly({
      title: lang.alertcreate,
      icon: 'success'
    })).to.be.true;

    expect(documentQuerySelectorStub.callCount).to.equal(5);
    expect(documentQuerySelectorStub.getCall(0).args[0]).to.equal('#name');
    expect(documentQuerySelectorStub.getCall(1).args[0]).to.equal('#cpf');
    expect(documentQuerySelectorStub.getCall(2).args[0]).to.equal('#telefone');
    expect(documentQuerySelectorStub.getCall(3).args[0]).to.equal('#email');
    expect(documentQuerySelectorStub.getCall(4).args[0]).to.equal('#pwd');
    expect(documentQuerySelectorStub.getCall(0).returns({ value: '' }));
    expect(documentQuerySelectorStub.getCall(1).returns({ value: '' }));
    expect(documentQuerySelectorStub.getCall(2).returns({ value: '' }));
    expect(documentQuerySelectorStub.getCall(3).returns({ value: '' }));
    expect(documentQuerySelectorStub.getCall(4).returns({ value: '' }));
  });
});