import chai from 'chai';
import sinon from 'sinon';
import { cols } from './index2';

const expect = chai.expect;

describe('cols', () => {
  let line4;
  let line5;
  let line3;
  let data;

  beforeEach(() => {
    line4 = document.querySelectorAll('h4');
    line5 = document.querySelectorAll('h1');
    line3 = document.querySelectorAll('.master-image');
    data = [
      {
        START_TIME: '09:00',
        FINISH_TIME: '10:00',
        DESCRITION_1: 'Description 1',
        DESCRITION_2: 'Description 2',
        COLOR: 'blue',
        IMAGE: 'image1',
      },
      {
        START_TIME: '10:00',
        FINISH_TIME: '11:00',
        DESCRITION_1: 'Description 3',
        DESCRITION_2: 'Description 4',
        COLOR: 'green',
        IMAGE: 'image2',
      },
      // Add more data objects as needed
    ];
  });

  it('should update the correct elements with the data', () => {
    const hours = [0, 7, 14, 21, 28, 35];
    const descs = [0, 1, 14, 15, 28, 29, 42, 43, 56, 57, 70, 71];
    const index = [0, 1, 2, 3, 4, 5];

    cols(data, hours, descs, index);

    expect(line4[0].innerHTML).to.equal('09:00~10:00');
    expect(line4[7].innerHTML).to.equal('09:00~10:00');
    expect(line4[14].innerHTML).to.equal('09:00~10:00');
    expect(line4[21].innerHTML).to.equal('09:00~10:00');
    expect(line4[28].innerHTML).to.equal('09:00~10:00');
    expect(line4[35].innerHTML).to.equal('09:00~10:00');

    expect(line5[0].innerHTML).to.equal('Description 1');
    expect(line5[1].innerHTML).to.equal('Description 2');
    expect(line5[14].innerHTML).to.equal('Description 1');
    expect(line5[15].innerHTML).to.equal('Description 2');
    expect(line5[28].innerHTML).to.equal('Description 1');
    expect(line5[29].innerHTML).to.equal('Description 2');
    expect(line5[42].innerHTML).to.equal('Description 1');
    expect(line5[43].innerHTML).to.equal('Description 2');
    expect(line5[56].innerHTML).to.equal('Description 1');
    expect(line5[57].innerHTML).to.equal('Description 2');
    expect(line5[70].innerHTML).to.equal('Description 1');
    expect(line5[71].innerHTML).to.equal('Description 2');

    expect(line3[0].src).to.equal('../image/image1.png');
    expect(line3[7].src).to.equal('../image/image1.png');
    expect(line3[14].src).to.equal('../image/image1.png');
    expect(line3[21].src).to.equal('../image/image1.png');
    expect(line3[28].src).to.equal('../image/image1.png');
    expect(line3[35].src).to.equal('../image/image1.png');
  });

  // Add more test cases as needed
});describe('swallopen1', () => {
  let swalFireStub;
  let updateStub;
  let getDadosStub;
  let fetchStub;

  beforeEach(() => {
    swalFireStub = sinon.stub(Swal, 'fire');
    updateStub = sinon.stub(window, 'update');
    getDadosStub = sinon.stub(window, 'getDados');
    fetchStub = sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    swalFireStub.restore();
    updateStub.restore();
    getDadosStub.restore();
    fetchStub.restore();
  });

  it('should call Swal.fire with the correct options', () => {
    swallopen1();

    sinon.assert.calledOnce(swalFireStub);
    sinon.assert.calledWith(swalFireStub, {
      html: sinon.match.string,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      width: 900,
    });
  });

  it('should call update with the correct object when Swal.fire resolves', () => {
    const objSwal = {
      day: 'Monday',
      line: '1',
      start: '09:00',
      end: '10:00',
      desc1: 'Description 1',
      desc2: 'Description 2',
      cor: 'blue',
      img: 'monday1',
    };

    swallopen1();

    sinon.assert.calledOnce(swalFireStub);

    const resolveCallback = swalFireStub.args[0][1];
    resolveCallback();

    sinon.assert.calledOnce(updateStub);
    sinon.assert.calledWith(updateStub, objSwal);
  });

  it('should call getDados when Swal.fire resolves', () => {
    swallopen1();

    sinon.assert.calledOnce(swalFireStub);

    const resolveCallback = swalFireStub.args[0][1];
    resolveCallback();

    sinon.assert.calledOnce(getDadosStub);
  });

  it('should make a PUT request to the server when update is called', () => {
    const obj = {
      day: 'Monday',
      line: '1',
      start: '09:00',
      end: '10:00',
      desc1: 'Description 1',
      desc2: 'Description 2',
      cor: 'blue',
      img: 'monday1',
    };

    update(obj);

    sinon.assert.calledOnce(fetchStub);
    sinon.assert.calledWith(fetchStub, 'http://localhost:3000/calender', {
      method: 'PUT',
      body: JSON.stringify({
        GYM: 1,
        DAY: obj.day,
        START: obj.start,
        FINISH: obj.end,
        LINE: obj.line,
        DESC1: obj.desc1,
        DESC2: obj.desc2,
        IMAGE: obj.img,
        COLOR: obj.cor,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  });

  it('should call getDados when the PUT request resolves', async () => {
    fetchStub.resolves({ json: () => Promise.resolve() });

    const obj = {
      day: 'Monday',
      line: '1',
      start: '09:00',
      end: '10:00',
      desc1: 'Description 1',
      desc2: 'Description 2',
      cor: 'blue',
      img: 'monday1',
    };

    await update(obj);

    sinon.assert.calledOnce(getDadosStub);
  });

  it('should make a GET request to the server when getDados is called', () => {
    getDados();

    sinon.assert.calledOnce(fetchStub);
    sinon.assert.calledWith(fetchStub, 'http://localhost:3000/calenderteste');
  });

  it('should call cols with the response data when the GET request resolves', async () => {
    const responseData = [
      {
        START_TIME: '09:00',
        FINISH_TIME: '10:00',
        DESCRITION_1: 'Description 1',
        DESCRITION_2: 'Description 2',
        COLOR: 'blue',
        IMAGE: 'image1',
      },
      {
        START_TIME: '10:00',
        FINISH_TIME: '11:00',
        DESCRITION_1: 'Description 3',
        DESCRITION_2: 'Description 4',
        COLOR: 'green',
        IMAGE: 'image2',
      },
    ];

    fetchStub.resolves({ json: () => Promise.resolve(responseData) });

    await getDados();

    sinon.assert.calledOnce(colsStub);
    sinon.assert.calledWith(colsStub, responseData);
  });
});