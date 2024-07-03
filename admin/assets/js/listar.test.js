import { expect } from 'chai';
import sinon from 'sinon';
import { fetchDataAndPopulateTable } from './listar';

describe('fetchDataAndPopulateTable', () => {
  let fetchStub;
  let SwalShowLoadingStub;
  let SwalCloseStub;
  let addSelectionEventListenersStub;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch');
    SwalShowLoadingStub = sinon.stub(window.Swal, 'showLoading');
    SwalCloseStub = sinon.stub(window.Swal, 'close');
    addSelectionEventListenersStub = sinon.stub(window, 'addSelectionEventListeners');
  });

  afterEach(() => {
    fetchStub.restore();
    SwalShowLoadingStub.restore();
    SwalCloseStub.restore();
    addSelectionEventListenersStub.restore();
  });

  it('should fetch data and populate the table', async () => {
    const response = {
      json: sinon.stub().resolves({
        message: [
          { id: 1, user: 'John', cpf: '123456789', telefone: '1234567890', email: 'john@example.com', password_user: 'password', status: 'active' },
          { id: 2, user: 'Jane', cpf: '987654321', telefone: '0987654321', email: 'jane@example.com', password_user: 'password', status: 'inactive' }
        ]
      })
    };
    fetchStub.resolves(response);

    const tbody = document.createElement('tbody');
    document.querySelector = sinon.stub().returns(tbody);

    await fetchDataAndPopulateTable();

    expect(fetchStub.calledOnceWith(`${url}/list/user`)).to.be.true;
    expect(SwalShowLoadingStub.calledOnce).to.be.true;
    expect(tbody.innerHTML).to.equal(`
      <tr>
        <td>1</td>
        <td>John</td>
        <td>123456789</td>
        <td>1234567890</td>
        <td>john@example.com</td>
        <td>password</td>
        <td>active</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane</td>
        <td>987654321</td>
        <td>0987654321</td>
        <td>jane@example.com</td>
        <td>password</td>
        <td>inactive</td>
      </tr>
    `);
    expect(SwalCloseStub.calledOnce).to.be.true;
    expect(addSelectionEventListenersStub.calledOnce).to.be.true;
  });
});